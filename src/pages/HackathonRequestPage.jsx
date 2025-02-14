import React from "react";
import GradientBackground from "../components/background/GradientBackground";
import Navigation from "../components/navigation/Navigation";
import HackathonRequestCard from "../components/hackathonRequest/HackathonRequestCard";
import { useState, useEffect } from "react";
import axios from "axios";

const HackathonRequestPage = () => {
  const [hackathonRequests, setHackathonRequests] = useState([]);
  const username = localStorage.getItem("username");

  const fetchHackathonRequests = async () => {
    const response = await axios.get(
      `http://localhost:8080/requests/${username}`
    );
    setHackathonRequests(response.data.reverse()); // Reverse once after fetching
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
          <HackathonRequestCard key={request.id} {...request} />
        ))}
      </div>
    </GradientBackground>
  );
};

export default HackathonRequestPage;
