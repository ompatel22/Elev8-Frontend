import React from 'react'


const FeatureCard = ({ icon, title, description }) => {
    return (
        <div className="dark:bg-gray-600 bg-gray-300 p-8 rounded-lg shadow-xl text-center hover:scale-105 transition-transform">
            <div className="text-5xl mb-4">{icon}</div>
            <h3 className="text-2xl font-semibold mb-2 dark:text-white text-gray-900">{title}</h3>
            <p className="dark:text-gray-300 text-gray-800">{description}</p>
        </div>
    );
};
export default FeatureCard;