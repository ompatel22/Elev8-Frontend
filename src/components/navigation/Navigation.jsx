import { Link, useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaUsers, FaComments, FaCode } from "react-icons/fa";
import Username from "./Username";
import NavItem from "./NavItem";
const Navigation = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <nav className="bg-gray-900/80 backdrop-blur-lg text-white shadow-lg fixed w-full z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/dashboard" className="text-3xl font-extrabold tracking-wide text-blue-400">
            Elev8 🚀
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/dashboard/chat"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-all 
     ${isActive ? "bg-blue-600 text-white hover:bg-blue-" : "text-gray-400 hover:bg-gray-700 hover:text-white"}`
              }
            >
              <FaUsers className="mr-2" />
              Groups & Messages
            </NavLink>

            <NavLink
              to="/dashboard/college-chat"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-all 
     ${isActive ? "bg-blue-600 text-white hover:bg-blue-300" : "text-gray-400 hover:bg-gray-700 hover:text-white"}`
              }
            >
              <FaComments className="mr-2" />
              College Chat
            </NavLink>

            <NavLink
              to="/dashboard/hackathons"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-all 
     ${isActive ? "bg-blue-600 text-white hover:bg-blue-300" : "text-gray-400 hover:bg-gray-700 hover:text-white"}`
              }
            >
              <FaCode className="mr-2" />
              Hackathons
            </NavLink>

            <NavLink
              to={`/dashboard/profile/${username}`}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-all 
     ${isActive ? "bg-blue-600 text-white hover:bg-blue-300" : "text-gray-400 hover:bg-gray-700 hover:text-white"}`
              }
            >
              <FaUser className="mr-2" />
              <Username username={username} />
            </NavLink>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white transition duration-300"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white focus:outline-none">
            {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-0 left-0 w-2/3 h-full bg-gray-900 p-6 shadow-lg transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300`}>
        <button onClick={() => setMenuOpen(false)} className="absolute top-4 right-4 text-white">
          <FaTimes size={28} />
        </button>
        <div className="mt-10 space-y-6">
          <NavItem to="/dashboard/study-groups" icon={<FaUsers />} onClick={() => setMenuOpen(false)}>Study Groups</NavItem>
          <NavItem to="/dashboard/college-chat" icon={<FaComments />} onClick={() => setMenuOpen(false)}>College Chat</NavItem>
          <NavItem to="/dashboard/hackathons" icon={<FaCode />} onClick={() => setMenuOpen(false)}>Hackathons</NavItem>
          <NavItem to={`/dashboard/profile/${username}`} icon={<FaUser />} onClick={() => setMenuOpen(false)}>
            <Username username={username} />
          </NavItem>
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white transition duration-300 w-full"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;