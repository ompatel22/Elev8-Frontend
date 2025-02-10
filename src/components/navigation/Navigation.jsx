import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navigation = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const username=localStorage.getItem('username');
  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <nav className="bg-gray-900/80 backdrop-blur-lg text-white shadow-lg fixed w-full z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/dashboard"
            className="text-4xl font-extrabold tracking-wide text-blue-400"
          >
            Elev8
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavItem to="/dashboard/study-groups">Study Groups</NavItem>
            <NavItem to="/dashboard/college-chat">College Chat</NavItem>
            <NavItem to="/dashboard/hackathons">Hackathons</NavItem>
            <NavItem to={"/dashboard/profile/"+username}>
              {localStorage.getItem("username") || "Profile"}
            </NavItem>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white transition duration-300"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900/95 text-center py-5 shadow-lg">
          <NavItem
            to="/dashboard/hackathons"
            onClick={() => setMenuOpen(false)}
          >
            Hackathons
          </NavItem>
          <NavItem
            to="/dashboard/college-chat"
            onClick={() => setMenuOpen(false)}
          >
            College Chat
          </NavItem>
          <NavItem
            to="/dashboard/study-groups"
            onClick={() => setMenuOpen(false)}
          >
            Study Groups
          </NavItem>
          <NavItem to={"/dashboard/profile/"+username} onClick={() => setMenuOpen(false)}>
            {localStorage.getItem("username") || "Profile"}
          </NavItem>
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white transition duration-300"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

const NavItem = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block py-2 md:py-0 text-lg text-gray-300 hover:text-blue-400 transition duration-300"
  >
    {children}
  </Link>
);

export default Navigation;