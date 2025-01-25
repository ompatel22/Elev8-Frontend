import React, { useState } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const features = [
    "Real-time Group Chats",
    "Hackathon Team Formation",
    "Event Announcements",
    "Resource Sharing",
    "Personalized Learning Communities",
  ];

  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    password: "",
    email: "",
    collegeName: "",
    githubUsername: "",
    leetcodeUsername: "",
    codechefUsername: "",
    hackerrankUsername: "",
    codeforcesUsername: "",
  });

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
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(typeof data === "string" ? data : JSON.stringify(data));
      }

      setSuccess(true);
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setError(err.message);
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
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="relative z-10 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl shadow-2xl p-10 w-full max-w-3xl mx-auto backdrop-filter backdrop-blur-lg bg-opacity-50 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-8">
            <Typewriter
              words={["Welcome to Elev8"]}
              loop={1}
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={500}
            />
          </h1>

          {success && (
            <div className="mb-6 p-4 bg-green-500 bg-opacity-20 border border-green-500 rounded-lg text-green-400 text-center">
              Registration successful! Welcome to Elev8!
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-400 text-center">
              {error}
            </div>
          )}

          <p className="text-center text-gray-400 mb-8">
            Let's set up your account and start your journey!
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
          >
            {[
              {
                label: "Username",
                name: "username",
                type: "text",
                placeholder: "e.g., om_patel_22",
              },
              {
                label: "Name",
                name: "displayName",
                type: "text",
                placeholder: "e.g., Om Patel",
              },
              {
                label: "Password",
                name: "password",
                type: "password",
                placeholder: "Enter a strong password",
              },
              {
                label: "email",
                name: "email",
                type: "email",
                placeholder: "e.g., omupatel22@gmail.com",

              },
              {
                label: "College Name",
                name: "collegeName",
                type: "text",
                placeholder: "e.g., DDU University",
              },
              {
                label: "GitHub Username",
                name: "githubUsername",
                type: "text",
                placeholder: "e.g., ompatel22",
              },
              {
                label: "LeetCode Username",
                name: "leetcodeUsername",
                type: "text",
                placeholder: "e.g., ompatel22",
              },
              {
                label: "CodeChef Username",
                name: "codechefUsername",
                type: "text",
                placeholder: "e.g., ompatel22",
              },
              {
                label: "HackerRank Username",
                name: "hackerrankUsername",
                type: "text",
                placeholder: "e.g., ompatel22",
              },
              {
                label: "Codeforces Username",
                name: "codeforcesUsername",
                type: "text",
                placeholder: "e.g., ompatel22",
              },
            ].map((field) => (
              <div
                key={field.name}
                className="col-span-1 hover:scale-105 transition-transform transform"
              >
                <label className="block text-lg font-medium text-gray-300 mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 focus:ring-4 focus:ring-blue-500 focus:outline-none transition-all"
                />
              </div>
            ))}
            <div className="col-span-1 sm:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-transform transform ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Animated Background Elements
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute top-10 right-10 w-48 h-48 bg-pink-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      </div> */}

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
    </div>
  );
};

export default RegistrationForm;
