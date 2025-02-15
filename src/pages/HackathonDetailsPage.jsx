import React, { useState, useEffect } from "react";
import { Calendar, Users, MapPin, Monitor, Globe } from "lucide-react";
import GradientBackground from "../components/background/GradientBackground";
import { useParams } from "react-router-dom";
import Navigation from "../components/navigation/Navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const HackathonDetailsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Get the username from localStorage or from a global state if stored after login
    const username = localStorage.getItem("username"); // or from context or redux

    if (!username) {
      // If no username found in localStorage, redirect to login
      navigate("/login");
    }
  }, [navigate]);

  const { id } = useParams();
  const [hackathonData, setHackathonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestObject, setRequestObject] = useState({});
  const [text, setText] = useState("");
  const [disabled, setDisabled] = useState(true);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchHackathonData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/hackathons/${id}`
        );
        setHackathonData(response.data);
        setRequestObject({
          hackathonId: response.data.id,
          hackathonTitle: response.data.title,
          createdBy: response.data.createdBy,
          requestedBy: username,
          status: "pending",
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHackathonData();
  }, [id, username]);

  useEffect(() => {
    if (text === "send") {
      handleJoin();
    }
  }, [text]);

  const handleJoin = async () => {
    try {
      if (requestObject.createdBy === username) {
        throw new Error("You cannot request to join your own hackathon.");
      }
      await axios.post("http://localhost:8080/request", requestObject, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Request sent successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  if (loading)
    return (
      <GradientBackground>
        <div className="min-h-screen flex items-center justify-center text-white">
          <div className="animate-pulse text-2xl">
            Loading Hackathon Details...
          </div>
        </div>
      </GradientBackground>
    );

  if (error)
    return (
      <GradientBackground>
        <div className="min-h-screen flex items-center justify-center text-red-400">
          <div className="text-2xl">Error: {error}</div>
        </div>
      </GradientBackground>
    );

  return (
    <GradientBackground>
      <ToastContainer /> {/* Add this line */}
      <Navigation />
      <div className="min-h-screen container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8 max-w-6xl p-4 pt-24">
        {/* Details Section */}
        <div className="md:w-2/3 p-6 bg-gray-900 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20">
          <div className="h-96 flex items-center justify-center">
            <img
              src={hackathonData.logo}
              alt="Hackathon Visual"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
          <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mt-4">
            About the Hackathon
          </h3>
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {hackathonData.about}
          </p>
        </div>

        {/* Sidebar */}
        <div className="md:w-1/3 p-8 bg-gray-900 backdrop-blur-lg rounded-2xl text-white space-y-6 shadow-xl border border-white/20 self-start sticky top-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              {hackathonData.title}
            </h2>
            <p className="text-gray-300 mb-4">{hackathonData.organization}</p>
          </div>

          <div className="flex items-start space-x-4">
              <Link to={`/dashboard/profile/${hackathonData.createdBy}`}>
                <img
                  src={`https://github.com/${hackathonData.createdBy}.png`}
                  alt=""
                  className="h-8 w-8 rounded-full mt-1"
                />
              </Link>
              <div className="flex-1">
                <p className="font-semibold">Uploaded By</p>
                <p className="text-gray-300 capitalize">
                  {hackathonData.createdBy}
                </p>
              </div>
            </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <Calendar className="text-blue-400 mt-1" size={20} />
              <div className="flex-1">
                <p className="font-semibold">Registration Period</p>
                <p className="text-gray-300">
                  {new Date(
                    hackathonData.registrationDates.start
                  ).toLocaleDateString()}{" "}
                  -{" "}
                  {new Date(
                    hackathonData.registrationDates.end
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Users className="text-purple-400 mt-1" size={20} />
              <div className="flex-1">
                <p className="font-semibold">Team Composition</p>
                <p className="text-gray-300">
                  {hackathonData.participationType === "team"
                    ? `${hackathonData.teamSize.min}-${hackathonData.teamSize.max} members`
                    : "Individual"}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Monitor className="text-green-400 mt-1" size={20} />
              <div className="flex-1">
                <p className="font-semibold">Mode</p>
                <p className="text-gray-300 capitalize">{hackathonData.mode}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Globe className="text-green-400 mt-1 mb-8" size={20} />
              <div className="flex-1">
                <p className="font-semibold">Location</p>
                <p className="text-gray-300 capitalize">
                  {hackathonData.location}
                </p>
              </div>
            </div>

            {disabled && (
              <button
                onClick={() => {
                  setText("send");
                  setDisabled(false);
                }}
                className="px-6 py-3 bg-blue-500 text-white rounded mt-24 w-full hover:bg-blue-600 transition-colors"
              > 
                Join Now
              </button>
            )}
          </div>
        </div>
      </div>
    </GradientBackground>
  );
};

export default HackathonDetailsPage;
