import React, { useEffect } from 'react'
import GradientBackground from '../components/background/GradientBackground';
import CollegeChatUsers from '../components/college-chat/CollegeChatUsers';
import { useNavigate } from 'react-router-dom';

function CollegeChatUsersPage() {

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
        <div>
            <GradientBackground className='min-h-screen'>
                <CollegeChatUsers />
            </GradientBackground>

        </div>
    )
}

export default CollegeChatUsersPage
