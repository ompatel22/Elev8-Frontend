import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const HackathonRequestCard = ({
  id,
  hackathonTitle,
  requestedBy,
  hackathonId,
  requestedAt,
  status,
}) => {
  const [statusx, setStatusx] = useState(status);

  // Format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Define border color based on status
  const getBorderColor = () => {
    switch (statusx) {
      case "pending":
        return "border-yellow-500";
      case "accepted":
        return "border-green-500";
      case "rejected":
        return "border-red-500";
      default:
        return "border-blue-500";
    }
  };

  const handleAccept = () => {
    axios.put(`http://localhost:8080/request/${id}/accepted`);
    setStatusx("accepted");
  };

  const handleReject = () => {
    axios.put(`http://localhost:8080/request/${id}/rejected`);
    setStatusx("rejected");
  };

  return (
    <div className={`shadow-lg p-6 rounded-lg bg-gray-900 text-white border-2 ${getBorderColor()} h-68`}>
      {/* Rest of your component remains the same */}
      <div className="flex items-center gap-2">
        <Link to={`/dashboard/profile/${requestedBy}`}>
          <img
            src={`https://github.com/${requestedBy}.png`}
            alt=""
            className="h-10 w-10 rounded-full"
          />
        </Link>
        <h3 className="text-2xl font-bold">{requestedBy}</h3>
      </div>

      <Link to={`/dashboard/hackathons/${hackathonId}`}>
        <h4 className="text-xl font-bold pt-4">{hackathonTitle}</h4>
      </Link>

      <p className="text-sm">Requested At: {formatDate(requestedAt)}</p>
      {statusx === "pending" ? (
        <>
          <button
            onClick={handleAccept}
            className="px-6 py-3 bg-blue-500 text-white rounded mt-4 mr-4"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="px-6 py-3 bg-blue-500 text-white rounded mt-4"
          >
            Reject
          </button>
        </>
      ) : (
        <p className="text-sm">Status: {statusx}</p>
      )}
    </div>
  );
};

export default HackathonRequestCard;