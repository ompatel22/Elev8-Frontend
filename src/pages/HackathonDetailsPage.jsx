import React, { useState, useEffect } from "react";
import { Calendar, Users, MapPin, ChevronRight } from "lucide-react";
import GradientBackground from "../components/background/GradientBackground";
import { useParams } from "react-router-dom";
import Navigation from "../components/navigation/Navigation";
const HackathonDetailsPage = () => {
  const { id } = useParams();
  const [hackathonData, setHackathonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHackathonData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/hackathons/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch hackathon data");
        }
        const data = await response.json();
        setHackathonData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHackathonData();
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
      <Navigation />
      <div className="min-h-screen container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8 max-w-6xl p-4 pt-24">
        {/* Simple First Column */}
        <div className="md:w-2/3 p-6 bg-gray-900 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20">
          <div className="h-96 flex items-center justify-center">
            <img
              src="https://hackitup-msc.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F765a8a5fefc84d488a450cd07078724d%2Fassets%2Fcover%2F687.jpeg&w=1440&q=100"
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

        {/* Fixed Details Section */}
        <div className="md:w-1/3 p-8 bg-gray-900 backdrop-blur-lg rounded-2xl text-white space-y-6 shadow-xl border border-white/20 self-start sticky top-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              {hackathonData.title}
            </h2>
            <p className="text-gray-300 mb-4">{hackathonData.organization}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Calendar className="text-blue-400" size={20} />
              <div>
                <p className="font-semibold">Registration Period</p>
                <p className="text-gray-300">
                  {formatDate(hackathonData.registrationDates.start)} -
                  {formatDate(hackathonData.registrationDates.end)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Users className="text-purple-400" size={20} />
              {hackathonData.participationType === "team" ? (
                <div>
                  <p className="font-semibold">Team Composition</p>
                  <p className="text-gray-300">
                    {hackathonData.teamSize.min}-{hackathonData.teamSize.max}{" "}
                  members
                </p>
                </div>
              ) : (
                <div>
                  <p className="font-semibold">Team Composition</p>
                  <p className="text-gray-300">Individual</p>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <MapPin className="text-green-400" size={20} />
              <div>
                <p className="font-semibold">Mode</p>
                <p className="text-gray-300 capitalize">{hackathonData.mode}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
};

export default HackathonDetailsPage;
