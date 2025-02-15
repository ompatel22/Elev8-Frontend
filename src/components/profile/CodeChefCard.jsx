import React from "react";

const CodeChefCard = ({ platform, stats, imgUrl }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 backdrop-blur-md border border-gray-700">
      <h3 className="text-2xl font-bold text-blue-400 mb-4">{platform}</h3>
      {imgUrl !== "x" && (
        <div className="relative w-full overflow-hidden aspect-[4/3]">
          <iframe
            className="border-none shadow-lg rounded-lg w-full h-[300px] md:h-[430px] md:scale-75 md:w-[720px] origin-top-left"
            src={imgUrl}
            title="CodeChef Stats"
          />
        </div>
      )}
      <div className="space-y-2 mt-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between pb-2">
            <span className="text-gray-400">{stat.label}</span>
            <span className="text-white font-semibold">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeChefCard;
