import React from 'react';

const ProfileSection = ({ imageUrl, name, username, bio, countryFlagUrl }) => {
  return (
    <div className="pl-8 pt-10 flex flex-col items-center text-center md:items-start md:text-left space-y-4 md:w-1/3">
      <img
        src={imageUrl}
        alt={name}
        className="w-40 h-40 rounded-full border-4 border-blue-500 shadow-lg"
      />
      <div className="flex items-center space-x-2">
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
  );
};

export default ProfileSection;
