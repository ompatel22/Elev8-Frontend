import React from 'react'

const GitHubCard = ({ platform, stats, imgUrl1, imgUrl2 }) => {
  return (
    <div className="bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300 backdrop-blur-md border border-gray-700">
      <h3 className="text-2xl font-bold text-blue-400 mb-4">{platform}</h3>
      <div className="flex flex-col items-center space-y-4">
        <img src={imgUrl1} alt="GitHub Stats" className="rounded-lg" />
        <img src={imgUrl2} alt="GitHub Top Languages" className="rounded-lg" />
      </div>
      <div className="mt-8 space-y-2">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between text-gray-300">
            <span>{stat.label}</span>
            <span className="font-medium text-white">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GitHubCard;
