import React, { useEffect, useState } from "react";
import { getAllStudyGroups } from "../../services/StudyGroupService";
import Navigation from "../navigation/Navigation";
import { Link, useNavigate } from "react-router-dom";
import StudyGroupChat from "./StudyGroupChat";

function StudyGroup() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [groupName, setGroupName] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllStudyGroups(); // Fetching data
                setData(response); // Storing data in state
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

    const handleClick = (studyGroupName) => {
        setGroupName(studyGroupName)
    }

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            {/* Navigation Bar - Fixed at Top */}
            <div className="fixed top-0 left-0 w-full z-50">
                <Navigation />
            </div>

            {/* Content Below Navigation */}
            <div className="flex flex-1 overflow-hidden pt-16">
                {/* Left Sidebar with Scrollable List */}
                <div className="w-1/4 p-4 border-r border-gray-700 bg-gray-800 overflow-y-auto h-full">
                    {/* Title & Create Button */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-100">Study Groups</h2>
                        <Link to={`/dashboard/study-group/create-study-group`}>
                            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-500 transition-all">
                                + Create
                            </button>
                        </Link>
                    </div>

                    {data.length > 0 ? (
                        <div>
                            {data.map((group) => (
                                <div
                                    key={group.id}
                                    className="mb-3 p-3 bg-gray-700 shadow-lg rounded-lg flex items-center transition-all hover:bg-gray-600"
                                    onClick={() => handleClick(group.studyGroupName)}
                                >
                                    {/* Group Image */}
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/21/21104.png"
                                        alt="Group Icon"
                                        className="w-12 h-12 rounded-full mr-3"
                                    />

                                    {/* Group Details */}
                                    <div>
                                        <h3 className="text-md font-bold text-gray-200">{group.studyGroupName}</h3>
                                        <p className="text-sm text-gray-400">
                                            {group.messages && group.messages.length > 0
                                                ? group.messages[group.messages.length - 1].content // Last message content
                                                : "No messages yet"}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">No study groups found.</p>
                    )}
                </div>

                {/* Right Section with Fixed Input Box */}
                <div className="w-3/4 flex flex-col h-full">
                    <StudyGroupChat studyGroupName={groupName} />
                </div>
            </div>
        </div>
    );
}

export default StudyGroup;
