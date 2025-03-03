import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBuilding,
  FaLaptopCode,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";

const HackathonCard = ({
  id,
  title,
  organization,
  theme,
  mode,
  registrationDates,
  createdBy,
  location,
  logo,
}) => (
  <div className="relative bg-gray-900 backdrop-blur-lg border border-white/20 shadow-lg p-6 rounded-2xl text-white transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex flex-col md:flex-row items-center">
    {/* Left Content */}
    <div className="flex-1 p-4">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <div className="space-y-2 text-sm">
        <p className="flex items-center">
          <FaBuilding className="mr-2 text-blue-400" />{" "}
          <span className="font-semibold">{organization}</span>
        </p>
        <p className="flex items-center">
          <FaLaptopCode className="mr-2 text-green-400" />{" "}
          <span className="font-semibold">{theme}</span>
        </p>
        <p className="flex items-center">
          <FaCalendarAlt className="mr-2 text-yellow-400" /> Starts:{" "}
          <span className="ml-1">
            {new Date(registrationDates.start).toLocaleDateString()}
          </span>
        </p>
        <p className="flex items-center">
          <FaCalendarAlt className="mr-2 text-red-400" /> Ends:{" "}
          <span className="ml-1">
            {new Date(registrationDates.end).toLocaleDateString()}
          </span>
        </p>
        <p className="flex items-center">
          <FaMapMarkerAlt className="mr-2 text-purple-400" />{" "}
          <span className="font-semibold">{location}</span>
        </p>
        <p className="flex items-center">
          <FaUser className="mr-2 text-gray-400" />{" "}
          <span className="font-semibold">{createdBy}</span>
        </p>
      </div>

      {/* Join Now Button */}
      <div className="mt-6">
        <Link to={`/dashboard/hackathons/${id}`}>
          <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Join Now 🚀
          </button>
        </Link>
      </div>
    </div>

    {/* Large Right-Side Logo */}
    {logo && (
  <div className="w-72 h-72 flex-shrink-0 mt-4 md:mt-0 rounded-xl overflow-hidden border-4 border-blue-500 shadow-xl bg-white">
    <img
      src={logo}
      alt={title}
      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
    />
  </div>
)}

  </div>
);

export default HackathonCard;
