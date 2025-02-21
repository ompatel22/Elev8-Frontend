import React, { useEffect, useState } from "react";
import { getAllStudyGroups } from "../../services/StudyGroupService";
import Navigation from "../navigation/Navigation";
import { Link, useNavigate } from "react-router-dom";
import StudyGroupChat from "./StudyGroupChat";
import JoinStudyGroup from "./JoinStudyGroup";
import axios from "axios";

function StudyGroup() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [groupName, setGroupName] = useState("");
    const [flag, setFlag] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllStudyGroups();
                setData(response);
            } catch (error) {
                console.error("Error fetching study groups:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const username = localStorage.getItem("username");
        if (!username) {
            navigate("/login");
        }
    }, [navigate]);

    const handleClick = async (studyGroupName) => {
        setGroupName(studyGroupName);
        setFlag(null);

        const username = localStorage.getItem("username");
        if (!username) {
            console.error("Username not found in localStorage.");
            return;
        }

        try {
            const response = await axios.get(
                `http://localhost:8080/api/v1/study_group/${studyGroupName}/user/${username}`
            );

            if (response.status === 200 && response.data) {
                setFlag(true);
            } else {
                setFlag(false);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.warn(`User ${username} not found in ${studyGroupName}. Prompting to join.`);
                setFlag(false);
            } else {
                console.error("An unexpected error occurred:", error);
            }
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            {/* Navigation Bar */}
            <div className="fixed top-0 left-0 w-full z-50">
                <Navigation />
            </div>

            {/* Main Content */}
            <div className="flex flex-1 pt-20">
                {/* Left Sidebar (Study Groups List) */}
                <div className="w-1/4 p-4 border-r border-gray-700 bg-gray-800 h-[calc(100vh-4rem)] overflow-y-auto">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-100">Study Groups</h2>
                        <Link to={`/dashboard/study-group/create-study-group`}>
                            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-500 transition-all">
                                + Create
                            </button>
                        </Link>
                    </div>

                    {/* Scrollable Study Groups List */}
                    <div className="space-y-3">
                        {data.length > 0 ? (
                            data.map((group) => (
                                <div
                                    key={group.id}
                                    className="p-3 bg-gray-700 shadow-lg rounded-lg flex items-center cursor-pointer hover:bg-gray-600 transition-all"
                                    onClick={() => handleClick(group.studyGroupName)}
                                >
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/21/21104.png"
                                        alt="Group Icon"
                                        className="w-12 h-12 rounded-full mr-3"
                                    />
                                    <div>
                                        <h3 className="text-md font-bold text-gray-200">{group.studyGroupName}</h3>
                                        <p className="text-sm text-gray-400">
                                            {group.messages?.length > 0
                                                ? group.messages[group.messages.length - 1].content
                                                : "No messages yet"}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400">No study groups found.</p>
                        )}
                    </div>
                </div>

                {/* Right Section (Chat or Join Study Group) */}
                <div className="w-3/4 flex flex-col h-[calc(100vh-4rem)] bg-gray-900 overflow-hidden">
                    {flag === null ? (
                        <div className="flex flex-col items-center justify-center h-full">
                            <p className="text-gray-500">Select a study group to continue</p>
                        </div>
                    ) : flag ? (
                        <div className="flex-1 h-full overflow-hidden">
                            <StudyGroupChat studyGroupName={groupName} />
                        </div>
                    ) : (
                        <JoinStudyGroup studyGroupName={groupName} />
                    )}
                </div>
            </div>

        </div>
    );
}

export default StudyGroup;
