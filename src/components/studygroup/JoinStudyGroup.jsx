import React from "react";
import axios from "axios";

function JoinStudyGroup({ studyGroupName }) {
    const handleJoin = async () => {
        const username = localStorage.getItem("username");
        if (!username) {

            console.error("Username not found in localStorage.");
            return;
        }
        console.log("Attempting to join as:", username);

        try {
            await axios.get(`http://localhost:8080/api/v1/study_group/${studyGroupName}/user/${username}`);
            console.log("User is already in the study group.");
            alert("You are already in this study group!");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.warn(`User ${username} not found in ${studyGroupName}. Proceeding to join.`);

                try {
                    const response = await axios.post(
                        `http://localhost:8080/api/v1/study_group/${studyGroupName}/join_study_group`,
                        { username }  // Corrected payload
                    );

                    if (response.status === 200) {
                        window.location.reload();
                    }
                } catch (joinError) {
                    console.error("Error joining study group:", joinError);
                    alert("Failed to join the study group. Please try again.");
                }
            } else {
                console.error("Unexpected error checking study group membership:", error);
            }
        }
    };


    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-xl font-bold text-gray-200">You are not a member of "{studyGroupName}"</h2>
            <p className="text-gray-400 mb-4">Click below to join the study group.</p>
            <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-lg hover:bg-green-500 transition-all"
                onClick={handleJoin}
            >
                Join Now
            </button>
        </div>
    );
}

export default JoinStudyGroup;
