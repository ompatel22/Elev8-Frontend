import React from "react";
import Navigation from "../components/navigation/Navigation";
import GradientBackground from "../components/background/GradientBackground";
import Welcome from "../components/body/Welcome";
import Footer from "../components/footer/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
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
      <Welcome />
      <Footer />
    </GradientBackground>
  );
};

export default DashboardPage;
