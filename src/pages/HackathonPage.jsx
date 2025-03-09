import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navigation/NavBar";
import GradientBackground from "../components/background/GradientBackground";
import Navigation from "../components/navigation/Navigation";
import { useState, useEffect } from "react";
import VerticalNavBar from "../components/navigation/VerticalNavBar";

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
      <div className="container mx-auto p-4 pt-24 pb-24 overflow-auto h-screen">
        <Navbar
          hackathons={hackathons}
          setFilteredHackathons={setFilteredHackathons}
        />
        <VerticalNavBar
          setHackathons={setHackathons}
          filteredHackathons={filteredHackathons}
          setFilteredHackathons={setFilteredHackathons}
        />
      </div>
    </GradientBackground>
  );
};

export default HackathonPage;
