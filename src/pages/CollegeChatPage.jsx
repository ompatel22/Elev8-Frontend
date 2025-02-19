import React from "react";
import GradientBackground from "../components/background/GradientBackground";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "../components/navigation/Navigation";
import Chatpage from "../components/Chat/Chatpage";

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
        <Chatpage />
      </GradientBackground>
    </>
  );
}

export default CollegeChatPage;
