import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navigation/NavBar";
import HackathonList from "../components/hackathon/HackathonList";
import GradientBackground from "../components/background/GradientBackground";
import Navigation from "../components/navigation/Navigation";
import { useState, useEffect } from "react";

const HackathonPage = () => {
  const navigate = useNavigate();
  const [hackathons, setHackathons] = useState([]);
  const [filteredHackathons, setFilteredHackathons] = useState([]);

  useEffect(() => {
    // Get the username from localStorage or from a global state if stored after login
    const username = localStorage.getItem("username"); // or from context or redux

    if (!username) {
      // If no username found in localStorage, redirect to login
      navigate("/login");
    }
  }, [navigate]);

  return (
    <GradientBackground className="min-h-screen">
      <Navigation />
      <div className="container mx-auto p-4 pt-24">
        <Navbar
          hackathons={hackathons}
          setFilteredHackathons={setFilteredHackathons}
        />
        <HackathonList
          setHackathons={setHackathons}
          filteredHackathons={filteredHackathons}
          setFilteredHackathons={setFilteredHackathons}
        />
      </div>
    </GradientBackground>
  );
};

export default HackathonPage;
