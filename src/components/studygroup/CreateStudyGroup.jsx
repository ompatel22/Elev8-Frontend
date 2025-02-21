import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GradientBackground from "../background/GradientBackground" 

function CreateStudyGroup() {
  const [studyGroupName, setStudyGroupName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(() => {
    // Get the username from localStorage
    const username = localStorage.getItem("username");
    if (!username) {
      navigate("/login");
    }
    setUser(username);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studyGroupName.trim()) {
      alert("Study group name is required!");
      return;
    }

    try {
      // Fetch user details from backend
      const userResponse = await axios.get(
        `http://localhost:8080/api/users/${user}`
      );

      if (!userResponse.data) {
        alert("User not found!");
        return;
      }

      console.log(userResponse.data);

      const studyGroupData = {
        studyGroupName,
        studyGroupDescription: description,
        owner: userResponse.data, // Sending full user object
      };

      // Send the POST request
      const response = await axios.post(
        "http://localhost:8080/api/v1/study_group/create_study_group",
        studyGroupData
      );

      if (response.status === 200) {
        navigate("/dashboard/study-groups");
      }
    } catch (error) {
      console.error("Error creating study group:", error);
      navigate(`/dashboard/study-group/create-study-group`);
    }
  };

  return (
    <GradientBackground>
      <div className="flex justify-center items-center min-h-screen text-white">
        <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create Study Group
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Study Group Name */}
            <div>
              <label className="block text-gray-300 mb-1">
                Study Group Name *
              </label>
              <input
                type="text"
                value={studyGroupName}
                onChange={(e) => setStudyGroupName(e.target.value)}
                placeholder="Enter study group name"
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description (Optional) */}
            <div>
              <label className="block text-gray-300 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                required
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-all"
            >
              Create Study Group
            </button>
          </form>
        </div>
      </div>
    </GradientBackground>
  );
}

export default CreateStudyGroup;
