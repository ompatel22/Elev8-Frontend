import { Link } from "react-router-dom";

const NavItem = ({ to, children, icon, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-2 text-lg text-gray-300 hover:text-blue-400 transition duration-300"
  >
    {icon} {children}
  </Link>
);

export default NavItem;
