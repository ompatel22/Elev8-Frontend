import React from "react";
import { Link } from "react-router-dom";

const HackathonRequestStatusCard = ({ id, hackathonTitle, status, hackathonId, createdBy, requestedAt }) => {
  // Define border color based on status
  const getBorderColor = () => {
    switch (status) {
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

  return (
    <div className={`shadow-lg p-6 rounded-lg bg-gray-900 text-white border-2 ${getBorderColor()} h-68`}>
      <div className="flex items-center gap-2">
        <Link to={`/dashboard/profile/${createdBy}`}>
          <img
            src={`https://github.com/${createdBy}.png`}
            alt=""
            className="h-10 w-10 rounded-full"
          />
        </Link>
        <h3 className="text-2xl font-bold">{createdBy}</h3>
      </div>

      <Link to={`/dashboard/hackathons/${hackathonId}`}>
        <h4 className="text-xl font-bold pt-4">{hackathonTitle}</h4>
      </Link>
      <p className="text-sm">Status: {status}</p>
      <p className="text-sm">Requested At: {formatDate(requestedAt)}</p>
    </div>
  );
};

export default HackathonRequestStatusCard;