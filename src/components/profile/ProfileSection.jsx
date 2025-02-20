import React from 'react';

const ProfileSection = ({ imageUrl, name, username, bio, countryFlagUrl, coverImageUrl }) => {
  return (
    <div className="relative">
      {/* Cover Image */}
      <div 
        className="absolute top-0 left-0 w-full h-48 border-blue-500 border-4 rounded-lg bg-cover bg-center ml-8 mt-1"
        style={{ backgroundImage: `url(${coverImageUrl})` }}
      />
      
      {/* Profile Content */}
      <div className="relative pt-10 flex flex-col items-center text-center space-y-4 pb-10 ml-8 mt-16">
          <img
            src={imageUrl}
            alt={name}
            className="w-48 h-48 rounded-full border-4 border-blue-500 shadow-lg"
          />
        <div className="flex items-center space-x-2 pt-2">
          <h1 className="text-3xl font-bold text-white">{name}</h1>
          {countryFlagUrl && (
            <img
              src={countryFlagUrl}
              alt="Country Flag"
              className="w-8 h-8"
            />
          )}
        </div>
        <h2 className="text-xl text-gray-400">@{username}</h2>
        <p className="text-gray-300 max-w-xs">{bio}</p>
      </div>
    </div>
  );
};

export default ProfileSection;
