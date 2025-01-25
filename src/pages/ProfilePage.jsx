import React from "react";
import GradientBackground from "../components/background/GradientBackground";
import Navigation from "../components/navigation/Navigation";
import ProfileDashboard from "../components/body/ProfileDashboard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

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
      <ProfileDashboard />
    </GradientBackground>
  );
};

export default ProfilePage;
