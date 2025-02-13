import React, { useState } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Link, useNavigate } from "react-router-dom";
import { httpClient } from "../../config/AxiosHelper";
import useChatContext from "../../context/ChatContext";
const LoginForm = () => {
  const navigate = useNavigate();
  const { roomId, currentUser, connected, setConnected, setRoomId, setCurrentUser } = useChatContext();

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const features = [
    "Real-time Group Chats",
    "Hackathon Team Formation",
    "Event Announcements",
    "Resource Sharing",
    "Personalized Learning Communities",
  ];

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Check if the backend response contains a message
        throw new Error(data?.message || "Invalid credentials");
      }

      setSuccess(true);
      localStorage.setItem("username", data.username);
      httpClient.defaults.headers.common['username'] = data.username;
      localStorage.setItem("college", data.collegeName);
      setCurrentUser(data.username);
      setConnected(true);
      setRoomId(data.collegeName);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      // Ensure that error message is properly displayed
      setError(err?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-y-auto relative">
      {/* Close button */}
      <Link to="/">
        <button className="fixed top-4 right-4 z-50 bg-gray-800 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-700 transition-colors text-xl">
          ✕
        </button>
      </Link>

      {/* Main content */}
      <div className="container mx-auto px-10 py-20">
        <motion.div
          className="relative z-10 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl shadow-2xl p-10 w-full max-w-2xl mx-auto backdrop-filter backdrop-blur-lg bg-opacity-50 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-8 leading-[1.2] pb-2">
            <Typewriter
              words={["Login to Elev8"]}
              loop={1} // Run only once
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h1>

          {success && (
            <div className="mb-6 p-4 bg-green-500 bg-opacity-20 border border-green-500 rounded-lg text-green-400 text-center">
              Login successful!
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-400 text-center">
              {error}
            </div>
          )}

          <p className="text-center text-gray-400 mb-8">
            Enter your credentials to access your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="hover:scale-105 transition-transform transform">
              <label className="block text-lg font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="e.g., om_patel_22"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 focus:ring-4 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>

            <div className="hover:scale-105 transition-transform transform">
              <label className="block text-lg font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 focus:ring-4 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-transform transform ${loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              Register here
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Scrolling Text */}
      <div className="fixed w-full bottom-10 overflow-hidden pointer-events-none">
        <motion.div
          className="whitespace-nowrap text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        >
          {features.map((feature, index) => (
            <span
              key={index}
              className="mx-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
            >
              {feature}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Background Decorations
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute top-10 right-10 w-48 h-48 bg-pink-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      </div> */}

    </div>
  );
};

export default LoginForm;
