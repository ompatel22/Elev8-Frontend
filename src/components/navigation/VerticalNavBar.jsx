import { useState } from "react";
import HackathonList from "../hackathon/HackathonList";

export default function VerticalNavBar({
  setHackathons,
  setFilteredHackathons,
  filteredHackathons,
}) {
  const [activeTab, setActiveTab] = useState("active");

  // Function to handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Navigation */}
      <nav className="w-1/5 bg-gray-900/80 backdrop-blur-lg text-white shadow-lg p-4 flex flex-col space-y-4 rounded-lg mr-8">
        {["active","past", "ongoing", "upcoming"].map((tab) => (
          <button
            key={tab}
            className={`p-3 rounded-lg ${
              activeTab === tab ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
            onClick={() => handleTabChange(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Hackathons
          </button>
        ))}
      </nav>

      {/* Content Area */}
      <main className="flex-1 bg-transparent">
        {activeTab === "active" && (
          <div className="container mx-auto p-4 pt-12">
            <HackathonList
              type="active"
              setHackathons={setHackathons}
              filteredHackathons={filteredHackathons}
              setFilteredHackathons={setFilteredHackathons}
            />
          </div>
        )}
        {activeTab === "past" && (
          <div className="container mx-auto p-4 pt-12">
            <HackathonList
              type="past"
              setHackathons={setHackathons}
              filteredHackathons={filteredHackathons}
              setFilteredHackathons={setFilteredHackathons}
            />
          </div>
        )}
        {activeTab === "ongoing" && (
          <div className="container mx-auto p-4 pt-12">
            <HackathonList
              type="ongoing"
              setHackathons={setHackathons}
              filteredHackathons={filteredHackathons}
              setFilteredHackathons={setFilteredHackathons}
            />
          </div>
        )}
        {activeTab === "upcoming" && (
          <div className="container mx-auto p-4 pt-12">
            <HackathonList
              type="upcoming"
              setHackathons={setHackathons}
              filteredHackathons={filteredHackathons}
              setFilteredHackathons={setFilteredHackathons}
            />
          </div>
        )}
      </main>
    </div>
  );
}
