import React from "react";
import { Link } from "react-router-dom";
import { FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const HackathonRequestStatusCard = ({ id, hackathonTitle, status, hackathonId, createdBy, requestedAt }) => {
  // Define styles based on status
  const getStatusStyles = () => {
    switch (status) {
      case "pending":
        return {
          border: "border-yellow-500",
          icon: <FaClock className="text-yellow-500 text-lg" />,
          text: "text-yellow-400",
        };
      case "accepted":
        return {
          border: "border-green-500",
          icon: <FaCheckCircle className="text-green-500 text-lg" />,
          text: "text-green-400",
        };
      case "rejected":
        return {
          border: "border-red-500",
          icon: <FaTimesCircle className="text-red-500 text-lg" />,
          text: "text-red-400",
        };
      default:
        return {
          border: "border-blue-500",
          icon: <FaClock className="text-blue-500 text-lg" />,
          text: "text-blue-400",
        };
    }
  };

  const { border, icon, text } = getStatusStyles();

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

  return (
    <div
      className={`p-6 rounded-lg bg-gray-900 text-white border-2 ${border} transition-all duration-200 hover:shadow-lg hover:scale-[1.02]`}
    >
      {/* Profile + Status */}
      <div className="flex items-center gap-3">
        <Link to={`/dashboard/profile/${createdBy}`}>
          <img
            src={`https://github.com/${createdBy}.png`}
            alt=""
            className="h-12 w-12 rounded-full border border-gray-600 hover:border-white transition-all"
          />
        </Link>
        <h3 className="text-lg font-semibold">{createdBy}</h3>
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
        <span className="font-semibold text-gray-400">Status:</span> <span className={text}>{status}</span>
      </p>
      <p className="text-sm text-gray-300">
        <span className="font-semibold text-gray-400">Requested At:</span> {formatDate(requestedAt)}
      </p>
    </div>
  );
};

export default HackathonRequestStatusCard;
