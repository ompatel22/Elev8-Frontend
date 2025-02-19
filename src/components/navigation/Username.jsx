import { useState } from "react";
import { Link } from "react-router-dom";
const Username = ({ username }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block">
      <span 
        className="cursor-pointer" 
        onClick={toggleDropdown}
      >
        {username}
      </span>
      {isDropdownOpen && (
        <div className="absolute z-50 mt-2 w-48 bg-black rounded-md shadow-lg py-1">
          <Link to={`/dashboard/profile/${username}/edit`}>
            <button 
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800"
            >
            Edit Profile
          </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Username;