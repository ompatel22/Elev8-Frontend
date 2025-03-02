import axios from "axios";

function JoinStudyGroup({ studyGroupName }) {
    const handleJoin = async () => {
        const username = localStorage.getItem("username");
        const userId = localStorage.getItem("userId");
        if (!username) {
            console.error("Username not found in localStorage.");
            return;
        }

        console.log("Attempting to join as:", userId);

        try {
            // Fetch the user
            const userResponse = await axios.get(`http://localhost:8080/api/users/${username}`);
            const user = userResponse.data;  // Use a local variable
            console.log("Fetched user:", user);

            // Check if user is already in the study group
            try {
                await axios.get(`http://localhost:8080/api/v1/study_group/${studyGroupName}/user/${userId}`);
                console.log("User is already in the study group.");
                alert("You are already in this study group!");
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    console.warn(`User ${username} not found in ${studyGroupName}. Proceeding to join.`);

                    try {
                        const response = await axios.post(
                            `http://localhost:8080/api/v1/study_group/${studyGroupName}/join_study_group`,
                            { userId },  // Wrap in an object
                            {
                                headers: {
                                    "Content-Type": "application/json", // Ensure correct content type
                                },
                            }
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
        } catch (fetchError) {
            console.error("Error fetching user:", fetchError.response);
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
