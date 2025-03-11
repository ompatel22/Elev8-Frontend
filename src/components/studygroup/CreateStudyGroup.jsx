import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GradientBackground from "../background/GradientBackground";

function CreateStudyGroup() {
  const [studyGroupName, setStudyGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [currentName, setCurrentname] = useState("");
  const navigate = useNavigate();
  const fileInputRef = React.createRef();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");
    if (!username) {
      navigate("/login");
    }
    setUser(userId);
    setCurrentname(username);
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert("File size must be less than 1MB");
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studyGroupName.trim()) {
      alert("Study group name is required!");
      return;
    }

    setLoading(true);

    try {
      const userResponse = await axios.get(
        `http://localhost:8080/api/users/${currentName}`
      );

      if (!userResponse.data) {
        alert("User not found!");
        setLoading(false);
        return;
      }

      const studyGroupData = {
        studyGroupName,
        studyGroupDescription: description,
        ownerId: user,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(studyGroupData));

      if (image) {
        formData.append("icon", image);
      }

      const response = await axios.post(
        "http://localhost:8080/api/v1/study_group/create_study_group",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        navigate("/dashboard/chat");
      }
    } catch (error) {
      console.error("Error creating study group:", error);
    } finally {
      setLoading(false);
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

            <div className="text-center">
              <label className="block text-gray-300 mb-1">
                Study Group Icon (Max 1MB)
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {imagePreview && (
                <div className="mt-3 flex flex-col items-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-20 w-20 rounded-full object-cover mb-2"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="text-red-500 hover:text-red-400 text-sm"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full font-bold py-2 px-4 rounded-lg transition-all ${loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500 text-white"
                }`}
            >
              {loading ? "Creating..." : "Create Study Group"}
            </button>
          </form>
        </div>
      </div>
    </GradientBackground>
  );
}

export default CreateStudyGroup;
