import { Link } from "react-router-dom";

const HackathonCard = ({ id, title, organization, theme, mode, registrationDates, createdBy }) => (
  <div className="shadow-lg p-6 rounded-lg bg-gray-900 text-white border-2 border-blue-500 h-68">
    <h3 className="text-2xl font-bold">{title}</h3>
    <p className="text-sm">Organization: {organization}</p>
    <p className="text-sm">Theme: {theme}</p>
    <p className="text-sm">Mode: {mode}</p>
    <p className="text-sm">Starts: {registrationDates.start}</p>
    <p className="text-sm">Ends: {registrationDates.end}</p>  
    <p className="text-sm">Uploaded By: {createdBy}</p>
    <Link to={`/dashboard/hackathons/${id}`}>
    <button className="px-6 py-3 bg-blue-500 text-white rounded mt-4">
      Join Now
    </button>
    </Link>
  </div>
);

export default HackathonCard;
