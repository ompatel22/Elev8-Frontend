import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from '../navigation/Navigation';
import { Typewriter } from 'react-simple-typewriter';

const CollegeChatUsers = () => {
    const { roomId } = useParams();
    const [collegeData, setCollegeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8080/api/v1/rooms/${roomId}/users`);
                console.log("API Response:", response.data);
                setCollegeData(response.data || []);
            } catch (err) {
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [roomId]);

    if (loading) {
        return <div className="text-center text-white">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <>
            <Navigation />
            <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 pt-20">
                <h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-8 leading-[1.2] pb-2">
                    <Typewriter
                        words={[`${roomId} College Students`]}
                        loop={1} // Run only once
                        cursor
                        cursorStyle="|"
                        typeSpeed={100}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </h1>
                <div className="flex flex-col gap-6">
                    {collegeData.length > 0 ? (
                        collegeData.map((user, index) => (
                            <Link
                                to={`/dashboard/profile/${user.username}`}
                                key={index}
                                className="transform transition-transform duration-200 hover:scale-[1.02] animate-fade-in"
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                <div className="flex items-center bg-gray-700 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-200">
                                    <img
                                        src={`https://github.com/${user.githubUsername}.png`}
                                        alt={user.username}
                                        className="h-16 w-16 rounded-full border-2 border-gray-600"
                                    />
                                    <div className="ml-4">
                                        <h2 className="text-xl font-semibold text-white">{user.username}</h2>
                                        <p className="text-gray-400">{user.email}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No users available</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default CollegeChatUsers;
