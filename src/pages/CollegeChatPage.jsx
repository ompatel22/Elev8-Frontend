import React from "react";
import GradientBackground from "../components/background/GradientBackground";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "../components/navigation/Navigation";
import CollegeChat from "../components/college-chat/CollegeChat";

function CollegeChatPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (!username) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <GradientBackground className="min-h-screen">
        <Navigation />
        <CollegeChat />
      </GradientBackground>
    </>
  );
}

export default CollegeChatPage;
