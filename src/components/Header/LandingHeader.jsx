import React, { useState, useEffect } from 'react'
import { FaSun, FaMoon } from "react-icons/fa";
const LandingHeader = () => {

    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.add(savedTheme);
        } else {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(newTheme);
    };

    return (
        <>
            <header className="dark:bg-gray-800 bg-gray-100 dark:text-white text-gray-800 py-16 relative">
                <div className="container mx-auto px-4">
                    <div className="absolute top-4 right-4 flex space-x-4">
                        <button
                            className="bg-gray-400 dark:bg-gray-300 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:bg-green-400 dark:hover:bg-green-400 transition-colors flex items-center justify-center"
                            onClick={toggleTheme}
                        >
                            {theme === "dark" ? <FaMoon /> : <FaSun />}
                        </button>
                        <button
                            className="bg-blue-500 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                        >
                            Login
                        </button>
                        <button
                            className="bg-yellow-500 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:bg-yellow-600 transition-colors"
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className="text-center">
                        <h1 className="text-6xl font-extrabold leading-tight mb-6 dark:text-gray-100 text-black">
                            Elev8
                        </h1>
                        <p className="font-bold text-2xl mb-8 mx-auto max-w-3xl dark:text-gray-100 text-black">
                            Connect. Collaborate. Achieve. Showcase your coding achievements, find hackathon teammates, and join study groups with like-minded peers.
                        </p>
                    </div>
                </div>
            </header>
        </>
    )
}

export default LandingHeader;