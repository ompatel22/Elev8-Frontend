import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const Navbar = ({ hackathons, setFilteredHackathons }) => {
  const [titleSearch, setTitleSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  const debouncedSearch = useCallback(
    debounce((titleQuery, cityQuery) => {
      const filtered = hackathons.filter((hackathon) => {
        const matchesTitle = hackathon.title.toLowerCase().includes(titleQuery.toLowerCase());
        const matchesCity = hackathon.location.toLowerCase().includes(cityQuery.toLowerCase());
        return matchesTitle && matchesCity;
      });

      setFilteredHackathons(filtered);
    }, 300),
    [hackathons]
  );

  const handleTitleSearchChange = (e) => {
    const query = e.target.value;
    setTitleSearch(query);
    debouncedSearch(query, citySearch);
  };

  const handleCitySearchChange = (e) => {
    const query = e.target.value;
    setCitySearch(query);
    debouncedSearch(titleSearch, query);
  };

  return (
    <nav className="shadow-md pt-4 pb-4 flex justify-between items-center text-white">
      <div className="w-1/2 flex space-x-4">
        {/* Search by Title */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by Title..."
            value={titleSearch}
            onChange={handleTitleSearchChange}
            className="w-full pl-10 pr-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Search by City */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by City..."
            value={citySearch}
            onChange={handleCitySearchChange}
            className="w-full pl-10 pr-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Link to="/dashboard/hackathons/add">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add Hackathon
          </button>
        </Link>
        <Link to="/dashboard/hackathons/requests">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Received Requests
          </button>
        </Link>
        <Link to="/dashboard/hackathons/requests/status">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Requests Status
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
