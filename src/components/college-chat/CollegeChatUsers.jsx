import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../navigation/Navigation";
import { Typewriter } from "react-simple-typewriter";

const CollegeChatUsers = () => {
  const { roomId } = useParams();
  const [collegeData, setCollegeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState("");


  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setCurrentUserId(userId);
  }, [])

  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8080/api/v1/rooms/${roomId}/users`
        );
        console.log("API Response:", response.data);
        setCollegeData(response.data || []);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roomId]);

  const handlePersonalChat = async (member2Id) => {
    try {
      console.log(currentUserId);
      console.log(member2Id);

      const response = await axios.post(
        `http://localhost:8080/api/v1/personal_chat/create_or_get_personal_chat/${currentUserId}/${member2Id}`
      );
      console.log(response);
    } catch (error) {
      console.log("Unable to Create or Fetch the Personal Chat.");
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto p-4 pt-28 flex flex-col gap-4 items-center justify-center w-full max-w-7xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 pb-2">
            <Typewriter
              words={[`${roomId} College Community`]}
              loop={1}
              cursor
              cursorStyle="_"
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Connect with fellow students and build your network
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-red-900/20 rounded-lg border border-red-700">
            <p className="text-red-400">{error}</p>
          </div>
        ) : (
          <div className="w-full space-y-4">
            {collegeData.map((user, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    {/* Profile Image with Link */}
                    <Link to={`/dashboard/profile/${user.username}`} className="group">
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
                    </Link>

                    <div className="flex-1 min-w-0">
                      {/* Name with Link */}
                      <Link to={`/dashboard/profile/${user.username}`} className="group block">
                        <h2 className="text-lg font-semibold text-white truncate group-hover:text-teal-400 transition-colors duration-300">
                          {user.username}
                        </h2>
                      </Link>
                      {/* Email (Not linked) */}
                      <p className="text-sm text-gray-400 truncate">{user.email}</p>
                    </div>
                  </div>

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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeChatUsers;
