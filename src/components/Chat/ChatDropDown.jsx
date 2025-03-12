import React, { useEffect, useState, useCallback } from "react";
import { getAllStudyGroups } from "../../services/StudyGroupService";
import Navigation from "../navigation/Navigation";
import { Link, useNavigate } from "react-router-dom";
import StudyGroupChat from "../studygroup/StudyGroupChat";
import JoinStudyGroup from "../studygroup/JoinStudyGroup";
import axios from "axios";
import { debounce } from "lodash";
import { FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";
import GradientBackground from "../background/GradientBackground";
import { timeAgo } from "../../config/helper";
import PersonalChatChat from "../PersonalChat/PersonalChatChat";

function ChatDropDown() {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [studyGroups, setStudyGroups] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState("");
    const [personalChats, setPersonalChats] = useState([]);
    const [filteredPersonalChats, setFilteredPersonalChats] = useState([]);
    const [member2Id, setMember2Id] = useState("");
    const [member2Name, setMember2Name] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [isMember, setIsMember] = useState(null);
    const [currentUserId, setCurrentUserId] = useState("");
    const [personalChatOpen, setPersonalChatOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const username = localStorage.getItem("username");
        if (!username) navigate("/login");
        setCurrentUserId(userId);
    }, [navigate]);

    const toggleDropdown = (dropdown) => {
        setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
        setSearchTerm("")
    };


    const fetchPersonalChat = async () => {
        const response = await axios.get(`http://localhost:8080/api/v1/personal_chat/all_personal_chats/${currentUserId}`)
        console.log(response.data);
        const sortedPersonalChat = response.data.sort((a, b) => {
            const latestA = a.messages?.length
                ? new Date(a.messages[a.messages.length - 1].timestamp).getTime()
                : 0;
            const latestB = b.messages?.length
                ? new Date(b.messages[b.messages.length - 1].timestamp).getTime()
                : 0;
            return latestB - latestA;
        });
        setFilteredPersonalChats(sortedPersonalChat);
        setPersonalChats(sortedPersonalChat);

    }

    const fetchStudyGroups = async () => {
        try {
            const response = await getAllStudyGroups();
            const sortedGroups = response.sort((a, b) => {
                const latestA = a.messages?.length
                    ? new Date(a.messages[a.messages.length - 1].timestamp).getTime()
                    : 0;
                const latestB = b.messages?.length
                    ? new Date(b.messages[b.messages.length - 1].timestamp).getTime()
                    : 0;
                return latestB - latestA;
            });
            setStudyGroups(sortedGroups);
            setFilteredGroups(sortedGroups);
        } catch (error) {
            console.error("Error fetching study groups:", error);
        }
    };

    useEffect(() => {
        if (openDropdown === "studyGroup") {
            fetchStudyGroups();
        }
        if (openDropdown === "personalChat") {
            fetchPersonalChat();
        }
    }, [openDropdown]);

    const handleGroupClick = async (studyGroupName) => {
        setSelectedGroup(studyGroupName);
        setIsMember(null);
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        try {
            const response = await axios.get(
                `http://localhost:8080/api/v1/study_group/${studyGroupName}/user/${userId}`
            );
            setIsMember(response.status === 200 && response.data ? true : false);
        } catch (error) {
            if (error.response?.status === 400) {
                setIsMember(false);
            } else {
                console.error("An unexpected error occurred:", error);
            }
        }
    };

    const handlePersonalChatClick = (username, id) => {
        setMember2Id(id);
        setMember2Name(username);
    };

    useEffect(() => {
        if (member2Id && member2Name) {
            setPersonalChatOpen(true);
        }
    }, [member2Id, member2Name]);

    const debouncedSearch = useCallback(
        debounce((query) => {
            const filteredChats = personalChats.filter((chat) =>
                chat.githubUserName.toLowerCase().includes(query.toLowerCase())
            );
            const filtered = studyGroups.filter((group) =>
                group.studyGroupName.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredGroups(filtered);
            setFilteredPersonalChats(filteredChats);
        }, 300),
        [studyGroups, personalChats]
    );

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        debouncedSearch(event.target.value);
    };

    return (
        <GradientBackground>
            <div className="flex flex-col h-screen text-white">
                <div className="fixed top-0 left-0 w-full z-50">
                    <Navigation />
                </div>

                <div className="flex flex-1 pt-20">
                    <div className="w-1/4 p-4 border-r bg-gray-900 border-gray-700 h-[calc(100vh-4rem)]">
                        {openDropdown && (
                            <div className="relative flex items-center gap-2 mb-4">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                {openDropdown === "studyGroup" && (
                                    <Link to={`/dashboard/study-group/create-study-group`}>
                                        <button className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-500 transition-all whitespace-nowrap">
                                            + Create
                                        </button>

                                    </Link>
                                )}
                            </div>
                        )}

                        <div className="space-y-3">
                            <div>
                                <button
                                    className="w-full text-left p-3 bg-gray-800 shadow-lg rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-700 transition-all"
                                    onClick={() => toggleDropdown("studyGroup")}
                                >
                                    Study Group Chat
                                    {openDropdown === "studyGroup" ? <FaChevronUp /> : <FaChevronDown />}
                                </button>
                                {openDropdown === "studyGroup" && (
                                    <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                                        {filteredGroups.length > 0 ? (
                                            filteredGroups.map((group) => (
                                                <div
                                                    key={group.id}
                                                    className="p-3 bg-gray-700 shadow-lg rounded-lg flex items-center cursor-pointer hover:bg-gray-600 transition-all"
                                                    onClick={() => handleGroupClick(group.studyGroupName)}
                                                >
                                                    <img
                                                        src={group.imageUrl || "https://t3.ftcdn.net/jpg/03/56/73/14/360_F_356731435_KWwMysbXYKSHjQAIkja9PlvJBzd0Y4Xi.jpg"}
                                                        alt="Group Icon"
                                                        className="w-12 h-12 rounded-full object-cover mr-3"
                                                    />
                                                    <div>
                                                        <h3 className="text-md font-bold text-gray-200">{group.studyGroupName}</h3>
                                                        <div className="text-sm text-gray-400">
                                                            {group.messages?.length > 0 ? (
                                                                <>
                                                                    <span className="font-semibold text-white">
                                                                        {group.messages[group.messages.length - 1]?.sender || "Unknown"}:
                                                                    </span>{" "}
                                                                    {group.messages[group.messages.length - 1]?.content || "No content"} •{" "}
                                                                    <span className="text-gray-500">
                                                                        {timeAgo(group.messages[group.messages.length - 1]?.timestamp)}
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                "No messages yet"
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-400">No study groups found.</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div>
                                <button
                                    className="w-full text-left p-3 bg-gray-800 shadow-lg rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-700 transition-all"
                                    onClick={() => toggleDropdown("personalChat")}
                                >
                                    Personal Chat
                                    {openDropdown === "personalChat" ? <FaChevronUp /> : <FaChevronDown />}
                                </button>
                                {openDropdown === "personalChat" && (
                                    <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                                        {filteredPersonalChats.length > 0 ? (
                                            filteredPersonalChats.map((personalChat) => (
                                                <div
                                                    key={personalChat.id}
                                                    className="p-3 bg-gray-700 shadow-lg rounded-lg flex items-center cursor-pointer hover:bg-gray-600 transition-all"
                                                    onClick={() => handlePersonalChatClick(personalChat.githubUserName, personalChat.id)}
                                                >
                                                    <img
                                                        src={`https://github.com/${personalChat.githubUserName}.png`}
                                                        alt={personalChat.githubUserName}
                                                        className="w-12 h-12 rounded-full object-cover mr-3"
                                                    />
                                                    <div>
                                                        <h3 className="text-md font-bold text-gray-200">{personalChat.githubUserName}</h3>
                                                        <div className="text-sm text-gray-400">
                                                            {personalChat.messages?.length > 0 ? (
                                                                <>
                                                                    <span className="font-semibold text-white">
                                                                        {personalChat.messages[personalChat.messages.length - 1]?.sender || "Unknown"}:
                                                                    </span>{" "}
                                                                    {personalChat.messages[personalChat.messages.length - 1]?.content || "No content"} •{" "}
                                                                    <span className="text-gray-500">
                                                                        {timeAgo(personalChat.messages[personalChat.messages.length - 1]?.timestamp)}
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                "No messages yet"
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-400">No Personal Chats found.</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div>
                                <button
                                    className="w-full text-left p-3 bg-gray-800 shadow-lg rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-700 transition-all"
                                    onClick={() => toggleDropdown("hackathonChat")}
                                >
                                    Hackathon Chat
                                    {openDropdown === "hackathonChat" ? <FaChevronUp /> : <FaChevronDown />}
                                </button>
                                {openDropdown === "hackathonChat" && (
                                    <div className="p-3 bg-gray-700 shadow-lg rounded-lg max-h-[60vh] overflow-y-auto">
                                        <p className="text-gray-400">Hackathon chat feature coming soon!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-3/4 flex flex-col h-[calc(100vh-4rem)] text-center overflow-hidden justify-center">
                        {openDropdown === null ? (
                            <p className="text-xl text-gray-500">Select any section to chat</p>
                        ) : openDropdown === "studyGroup" && isMember === null ? (
                            <p className="text-lg text-gray-500">Select a study group to continue</p>
                        ) : openDropdown === "personalChat" && personalChatOpen ? (
                            <PersonalChatChat memberId={member2Id} memberName={member2Name} />
                        ) : openDropdown === "personalChat" && !personalChatOpen ? (
                            <p className="text-lg text-gray-500">Select a Personal chat to continue</p>
                        ) : openDropdown === "hackathonChat" ? (
                            <p className="text-lg text-gray-500">Select a hackathon chat to continue</p>
                        ) : isMember ? (
                            <StudyGroupChat studyGroupName={selectedGroup} />
                        ) : (
                            <JoinStudyGroup studyGroupName={selectedGroup} />
                        )}
                    </div>

                </div>
            </div>
        </GradientBackground>
    );
}

export default ChatDropDown;
