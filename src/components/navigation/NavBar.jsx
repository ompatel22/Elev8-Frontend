import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ hackathons, setFilteredHackathons }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const filtered = hackathons.filter((hackathon) =>
      hackathon.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHackathons(filtered);
  };

  return (
    <nav className="shadow-md pt-4 pb-4 flex justify-between items-center text-white">
      <div className="w-1/3 flex space-x-4">
        <input
          type="text"
          placeholder="Type..."
          className="w-2/3 p-2 border rounded"
          value={searchTerm}
          onChange={handleChange}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleSearch}
        >
          Search
        </button>
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
