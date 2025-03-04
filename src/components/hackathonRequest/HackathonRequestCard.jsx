import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "axios";

const HackathonRequestCard = ({ id, hackathonTitle, requestedBy, hackathonId, requestedAt, status }) => {
  const [statusx, setStatusx] = useState(status);

  // Define styles based on status
  const getStatusStyles = () => {
    switch (statusx) {
      case "pending":
        return {
          border: "border-yellow-500",
          icon: <FaClock className="text-yellow-500 text-lg" />,
          text: "text-yellow-400",
          bg: "bg-yellow-600 hover:bg-yellow-700",
        };
      case "accepted":
        return {
          border: "border-green-500",
          icon: <FaCheckCircle className="text-green-500 text-lg" />,
          text: "text-green-400",
          bg: "bg-green-600 hover:bg-green-700",
        };
      case "rejected":
        return {
          border: "border-red-500",
          icon: <FaTimesCircle className="text-red-500 text-lg" />,
          text: "text-red-400",
          bg: "bg-red-600 hover:bg-red-700",
        };
      default:
        return {
          border: "border-blue-500",
          icon: <FaClock className="text-blue-500 text-lg" />,
          text: "text-blue-400",
          bg: "bg-blue-600 hover:bg-blue-700",
        };
    }
  };

  const { border, icon, text, bg } = getStatusStyles();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleAccept = async () => {
    try {
      await axios.put(`http://localhost:8080/request/${id}/accepted`);
      setStatusx("accepted");
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  const handleReject = async () => {
    try {
      await axios.put(`http://localhost:8080/request/${id}/rejected`);
      setStatusx("rejected");
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  return (
    <div
      className={`p-6 rounded-lg bg-gray-900 text-white border-2 ${border} transition-all duration-200 hover:shadow-lg hover:scale-[1.02]`}
    >
      {/* Profile + Status */}
      <div className="flex items-center gap-3">
        <Link to={`/dashboard/profile/${requestedBy}`}>
          <img
            src={`https://github.com/${requestedBy}.png`}
            alt={requestedBy}
            className="h-12 w-12 rounded-full border border-gray-600 hover:border-white transition-all"
          />
        </Link>
        <h3 className="text-lg font-semibold">{requestedBy}</h3>
        {icon}
      </div>

      {/* Hackathon Title */}
      <Link to={`/dashboard/hackathons/${hackathonId}`} className="block mt-4">
        <h4 className={`text-xl font-bold ${text} hover:text-white transition-all`}>
          {hackathonTitle}
        </h4>
      </Link>

      {/* Status & Timestamp */}
      <p className="text-sm text-gray-300 mt-2">
        <span className="font-semibold text-gray-400">Status:</span> <span className={text}>{statusx}</span>
      </p>
      <p className="text-sm text-gray-300">
        <span className="font-semibold text-gray-400">Requested At:</span> {formatDate(requestedAt)}
      </p>

      {/* Action Buttons */}
      {statusx === "pending" && (
        <div className="mt-4 flex gap-3">
          <button onClick={handleAccept} className={`px-4 py-2 text-white rounded-md text-sm bg-green-600 hover:bg-green-700`}>
            Accept
          </button>
          <button onClick={handleReject} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm">
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default HackathonRequestCard;
