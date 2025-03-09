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
  registrationDates,
  hackathonDates,
  createdBy,
  location,
  logo,
  joinable,
  requestsToJoin,
}) => {
  return (
    <div className="relative bg-gray-900 border border-white/20 shadow-lg p-6 rounded-2xl text-white transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex flex-col md:flex-row items-center overflow-hidden">
      {/* Background Image */}
      {logo && (
        <div className="absolute inset-0">
          <img src={logo} alt={title} className="w-full h-full object-cover" />
          {/* Left Fade Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/110 via-gray-900/80 to-gray-900/35"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex-1 p-4">
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
          {/* <p className="flex items-center">
            <FaCalendarAlt className="mr-2 text-yellow-400" />
            Registration Starts:{" "}
            <span className="ml-1">
              {new Date(registrationDates.start).toLocaleDateString()}
            </span>
          </p>
          <p className="flex items-center">
            <FaCalendarAlt className="mr-2 text-red-400" />
            Registration Ends:{" "}
            <span className="ml-1">
              {new Date(registrationDates.end).toLocaleDateString()}
            </span>
          </p> */}
          <p className="flex items-center">
            <FaCalendarAlt className="mr-2 text-blue-400" />
            Registration Period:{" "}
            <span className="ml-1">
              {new Date(registrationDates.start).toLocaleDateString()} -{" "}
              {new Date(registrationDates.end).toLocaleDateString()}
            </span>
          </p>

          {hackathonDates && (
            <p className="flex items-center">
              <FaCalendarAlt className="mr-2 text-blue-400" />
              Hackathon Dates:{" "}
              <span className="ml-1">
                {new Date(hackathonDates.start).toLocaleDateString()} -{" "}
                {new Date(hackathonDates.end).toLocaleDateString()}
              </span>
            </p>
          )}

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
        {joinable &&
        createdBy !== `${localStorage.getItem("username")}` &&
        !requestsToJoin.includes(`${localStorage.getItem("username")}`) ? (
          <div className="mt-6">
            <Link to={`/dashboard/hackathons/${id}`}>
              <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Join Now 🚀
              </button>
            </Link>
          </div>
        ) : requestsToJoin.includes(`${localStorage.getItem("username")}`) ? (
          <div className="mt-6">
            <Link to={`/dashboard/hackathons/${id}`}>
              <button className="px-6 py-3 bg-gray-500 text-white font-bold rounded-lg transition-all duration-300 transform shadow-lg">
                Already Requested! ✅
              </button>
            </Link>
          </div>
        ) : (
          <div className="mt-6">
            <Link to={`/dashboard/hackathons/${id}`}>
              <button className="px-6 py-3 bg-gray-500 text-white font-bold rounded-lg transition-all duration-300 transform shadow-lg">
                View Details 📝
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default HackathonCard;
