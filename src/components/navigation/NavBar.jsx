import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import { FaSearch } from "react-icons/fa";



const Navbar = ({ hackathons, setFilteredHackathons }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useCallback(
    debounce((query) => {
      const filtered = hackathons.filter((hackathon) =>
        hackathon.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredHackathons(filtered);
    }, 300),
    [hackathons]
  );
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <nav className="shadow-md pt-4 pb-4 flex justify-between items-center text-white">
      <div className="w-1/3 flex space-x-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search now..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="flex space-x-4">
        <Link to="/dashboard/hackathons/add">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Add Hackathon
          </button>
        </Link>
        <Link to="/dashboard/hackathons/requests">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Received Requests
          </button>
        </Link>
        <Link to="/dashboard/hackathons/requests/status">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Requests Status
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
