import React from 'react'
import GradientBackground from '../components/background/GradientBackground'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navigation from '../components/navigation/Navigation';
import Chatpage from '../components/Chat/Chatpage';

function CollegeChatPage() {
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
        <>
            <GradientBackground className='min-h-screen'>
                <Navigation />
                <Chatpage />
            </GradientBackground>
        </>
    )
}

export default CollegeChatPage
