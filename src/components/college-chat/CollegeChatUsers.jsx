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
              <Link
                to={`/dashboard/profile/${user.username}`}
                key={index}
                className="group block"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transform hover:-translate-y-1">
                  <div className="flex items-center space-x-4">
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
                      <h2 className="text-lg font-semibold text-white truncate group-hover:text-teal-400 transition-colors duration-300">
                        {user.username}
                      </h2>
                      <p className="text-sm text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeChatUsers;
