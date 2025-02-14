import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { Link } from "react-router-dom";

const LandingHeader = () => {
  // const [theme, setTheme] = useState("dark");
  // const [isVisible, setIsVisible] = useState(false);

  // useEffect(() => {
  //   setIsVisible(true);
  //   const savedTheme = localStorage.getItem("theme");
  //   if (savedTheme) {
  //     setTheme(savedTheme);
  //     document.documentElement.classList.add(savedTheme);
  //   } else {
  //     document.documentElement.classList.add("dark");
  //   }
  // }, []);

  // const toggleTheme = () => {
  //   const newTheme = theme === "light" ? "dark" : "light";
  //   setTheme(newTheme);
  //   localStorage.setItem("theme", newTheme);
  //   document.documentElement.classList.remove("dark", "light");
  //   document.documentElement.classList.add(newTheme);
  // };

  return (
    <>
      <header id="about" className="relative min-h-screen overflow-hidden">
        <div className="relative z-10 container mx-auto px-4 pt-8">
          <motion.div
            className="flex justify-between items-center mb-16"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-4xl font-bold text-white"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Elev8
              </div>
            </motion.div>
            <div className="flex space-x-4">
              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-800 text-white font-semibold py-2.5 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
                onClick={toggleTheme}
              >
                {theme === "dark" ? (
                  <FaMoon className="text-yellow-400" />
                ) : (
                  <FaSun className="text-yellow-400" />
                )}
              </motion.button> */}
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-800 text-white font-semibold py-2.5 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Login
                </motion.button>
              </Link>
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-purple-800 text-white font-semibold py-2.5 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Register
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <motion.h1
              className="text-7xl font-extrabold mb-8 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-10xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Connect, Collaborate, Conquer
              </span>{" "}
              🚀
            </motion.h1>
            <motion.p
              className="text-xl mb-12 max-w-3xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Showcase your coding achievements, find teammates for hackathons,
              and join study groups.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/register">
                <button className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                  Get Started Now
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </header>
    </>
  );
};

export default LandingHeader;
