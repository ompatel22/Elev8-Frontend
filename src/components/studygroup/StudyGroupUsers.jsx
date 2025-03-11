import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../navigation/Navigation";
import GradientBackground from "../background/GradientBackground";
import { FaEdit, FaTrash } from "react-icons/fa";

const StudyGroupUsers = () => {
    const { groupName } = useParams();
    const [studyGroupDetails, setStudyGroupDetails] = useState(null);
    const [studyGroupData, setStudyGroupData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUserId, setCurrentUserId] = useState("");
    const navigate = useNavigate();

    const defaultImage =
        "https://t3.ftcdn.net/jpg/03/56/73/14/360_F_356731435_KWwMysbXYKSHjQAIkja9PlvJBzd0Y4Xi.jpg";

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        setCurrentUserId(userId);
        const fetchStudyGroupDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/v1/study_group/detail/${groupName}`
                );
                setStudyGroupDetails(response.data);
            } catch (err) {
                console.error("Error fetching study group details:", err);
                setError("Failed to load study group details.");
            }
        };

        const fetchStudyGroupUsers = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `http://localhost:8080/api/v1/study_group/${groupName}/users`
                );
                setStudyGroupData(response.data || []);
            } catch (err) {
                setError("Failed to load members.");
            } finally {
                setLoading(false);
            }
        };

        fetchStudyGroupDetails();
        fetchStudyGroupUsers();
    }, [groupName]);

    const isAdmin = studyGroupData.length > 0 && studyGroupData[0].id === currentUserId;

    const handleRemoveMember = async (userId) => {
        try {
            await axios.delete(
                `http://localhost:8080/api/v1/study_group/${groupName}/remove/${userId}`
            );
            setStudyGroupData((prev) => prev.filter((user) => user.id !== userId));
        } catch (error) {
            console.error("Error removing member:", error);
        }
    };

    const handleDeleteGroup = async () => {
        if (window.confirm("Are you sure you want to delete this study group?")) {
            try {
                await axios.delete(`http://localhost:8080/api/v1/study_group/${groupName}/delete/${currentUserId}`);
                navigate("/dashboard/chat");
            } catch (error) {
                console.error("Error deleting group:", error);
            }
        }
    };

    const handlePersonalChat = async (member2Id) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/personal_chat/create_or_get_personal_chat/${currentUserId}/${member2Id}`)
            console.log(response);

        } catch (error) {
            console.log("Unable to Create or Fetch the Personal Chat.");
        }
    }
    return (
        <GradientBackground>
            <div className="min-h-screen">
                <Navigation />

                <div className="container mx-auto p-6 pt-28 w-full max-w-5xl">

                    <div className="flex items-center space-x-6">
                        <img
                            src={studyGroupDetails?.imageUrl || defaultImage}
                            alt={studyGroupDetails?.studyGroupName || "Study Group"}
                            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gray-700"
                            onError={(e) => (e.target.src = defaultImage)}
                        />

                        <div>
                            <div className="flex items-center space-x-3">
                                <h2 className="text-5xl font-bold text-white">
                                    {studyGroupDetails?.studyGroupName || "Study Group"}
                                </h2>
                                {isAdmin && (
                                    <button
                                        className="text-gray-400 hover:text-white transition"
                                        onClick={() => alert("Edit group feature coming soon!")}
                                    >
                                        <FaEdit size={24} />
                                    </button>
                                )}
                            </div>
                            <p className="text-gray-400 text-lg mt-2 max-w-[500px] break-words whitespace-normal">
                                {studyGroupDetails?.studyGroupDescription || "No description available"}
                            </p>
                        </div>
                    </div>

                    <div className="w-full mt-8 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-300">Members</h3>

                        {isAdmin && (
                            <button
                                onClick={handleDeleteGroup}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center gap-2"
                            >
                                <FaTrash />
                                Delete Group
                            </button>
                        )}
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center min-h-[200px]">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center p-4 bg-red-900/20 rounded-lg border border-red-700">
                            <p className="text-red-400">{error}</p>
                        </div>
                    ) : (
                        <div className="w-full space-y-4 mt-4">
                            {studyGroupData.map((user, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] flex items-center justify-between"
                                >
                                    <Link
                                        to={`/dashboard/profile/${user.username}`}
                                        className="group flex items-center space-x-4"
                                    >
                                        <div className="relative">
                                            <img
                                                src={`https://github.com/${user.githubUsername}.png`}
                                                alt={user.username}
                                                className="h-16 w-16 rounded-full object-cover ring-2 ring-gray-700 group-hover:ring-blue-500 transition-all duration-300"
                                                onError={(e) => {
                                                    e.target.src = "https://github.com/github.png";
                                                }}
                                            />
                                            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h2 className="text-lg font-semibold text-white truncate group-hover:text-teal-400 transition-colors duration-300 flex items-center gap-2">
                                                {user.username}
                                                <span
                                                    className={`text-xs px-2 py-1 rounded-full ${index === 0 ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-200"
                                                        }`}
                                                >
                                                    {index === 0 ? "Admin" : "Member"}
                                                </span>
                                            </h2>
                                            <p className="text-sm text-gray-400 truncate">{user.email}</p>
                                        </div>
                                    </Link>

                                    <div className="flex space-x-3">
                                        {user.id !== currentUserId && (
                                            <button
                                                onClick={() => handlePersonalChat(user.id)}
                                                className="bg-teal-600 text-white px-3 py-2 rounded-lg hover:bg-teal-700 transition flex items-center gap-2"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={2}
                                                    stroke="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.477 8-10 8a12.442 12.442 0 01-4.963-.96L3 21l1.41-3.76A7.963 7.963 0 012 12C2 7.582 6.477 4 12 4s10 3.582 10 8z"
                                                    />
                                                </svg>
                                                Chat Now
                                            </button>
                                        )}

                                        {isAdmin && index !== 0 && (
                                            <button
                                                onClick={() => handleRemoveMember(user.id)}
                                                className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}

                        </div>
                    )}
                </div>
            </div>
        </GradientBackground >
    );
};

export default StudyGroupUsers;
