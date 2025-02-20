import React from "react";
import GradientBackground from "../components/background/GradientBackground";
import Navigation from "../components/navigation/Navigation";
import HackathonRequestStatusCard from "../components/hackathonRequest/HackathonRequestStatusCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const HackathonRequestStatusPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Get the username from localStorage or from a global state if stored after login
    const username = localStorage.getItem("username"); // or from context or redux

    if (!username) {
      // If no username found in localStorage, redirect to login
      navigate("/login");
    }
  }, [navigate]);

  const [hackathonRequests, setHackathonRequests] = useState([]);
  const username = localStorage.getItem("username");

  const fetchHackathonRequests = async () => {
    const response = await axios.get(
      `http://localhost:8080/requests/status/${username}`
    );
    setHackathonRequests(response.data.reverse());
  };

  useEffect(() => {
    fetchHackathonRequests();
  }, []);

  if (hackathonRequests.length === 0) {
    return (
      <GradientBackground className="min-h-screen">
        <Navigation />
        <div className="container mx-auto p-4 pt-24 flex flex-col gap-4 items-center justify-center">
          <h1 className="text-2xl font-bold">No hackathon requests found</h1>
        </div>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground className="min-h-screen">
      <Navigation />
      <div className="container mx-auto p-4 pt-24 flex flex-col gap-4">
        {hackathonRequests.map((request) => (
          <HackathonRequestStatusCard key={request.id} {...request} />
        ))}
      </div>
    </GradientBackground>
  );
};

export default HackathonRequestStatusPage;
