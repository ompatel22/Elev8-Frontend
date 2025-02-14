import React from "react";
import { Link } from "react-router-dom";

const HackathonRequestStatusCard = ({ id, hackathonTitle, status, hackathonId, createdBy, requestedAt }) => (
  <div className="shadow-lg p-6 rounded-lg bg-gray-900 text-white border-2 border-blue-500 h-68">
    <Link to={`/dashboard/hackathons/${hackathonId}`}>
      <h4 className="text-2xl font-bold">{hackathonTitle}</h4>
    </Link>
    <p className="text-sm">Uploaded By: {createdBy}</p>
    <p className="text-sm">Status: {status}</p>
    <p className="text-sm">Requested At: {requestedAt}</p>
  </div>
);

export default HackathonRequestStatusCard;
