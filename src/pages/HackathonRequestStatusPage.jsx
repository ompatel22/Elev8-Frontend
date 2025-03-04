import React, { useState, useEffect } from "react";
import GradientBackground from "../components/background/GradientBackground";
import Navigation from "../components/navigation/Navigation";
import HackathonRequestStatusCard from "../components/hackathonRequest/HackathonRequestStatusCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HackathonRequestStatusPage = () => {
  const navigate = useNavigate();
  const [hackathonRequests, setHackathonRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("accepted");

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (!username) {
      navigate("/login");
    } else {
      fetchHackathonRequests(username);
    }
  }, [navigate]);

  const fetchHackathonRequests = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/requests/status/${username}`
      );
      setHackathonRequests(response.data.reverse());
    } catch (error) {
      console.error("Error fetching hackathon requests:", error);
    }
  };

  // Filter requests based on active tab
  const filteredRequests = hackathonRequests.filter(
    (request) => request.status.toLowerCase() === activeTab
  );

  return (
    <GradientBackground className="min-h-screen">
      <Navigation />
      <div className="flex min-h-screen p-4 pt-24 mx-auto max-w-7xl pb-0 overflow-y-auto">
        {/* Sidebar Navigation */}
        <nav className="w-1/4 bg-gray-900/80 backdrop-blur-lg text-white shadow-lg p-4 flex flex-col space-y-4 rounded-lg mr-8">
          <h1 className="text-2xl font-semibold mx-auto mb-10">
            Your Requests' Status
          </h1>
          {["accepted", "rejected", "pending"].map((tab) => (
            <button
              key={tab}
              className={`p-3 rounded-lg text-lg font-semibold ${
                activeTab === tab ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Requests
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <main className="flex-1 bg-transparent">
          <div className="container mx-auto p-4">
            {filteredRequests.length === 0 ? (
              <div className="text-center text-xl font-semibold mt-4">
                No {activeTab} requests found
              </div>
            ) : (
              filteredRequests.map((request) => (
                <div className="mb-4">
                  <HackathonRequestStatusCard key={request.id} {...request} />
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </GradientBackground>
  );
};

export default HackathonRequestStatusPage;
