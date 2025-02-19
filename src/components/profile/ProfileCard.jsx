import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiLeetcode, SiCodechef } from 'react-icons/si';

const ProfileCard = ({ platform, username, icon: Icon, link, bgColor }) => (
  <div className="bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300 backdrop-blur-md border border-gray-700 size-52">
    <div className="flex flex-col items-center gap-3">
      <Icon className="w-8 h-8 text-blue-400" />
      <h3 className="text-xl font-semibold text-blue-400">{platform}</h3>
      <p className="text-sm text-gray-300 truncate max-w-full">
        @{username.length > 15 ? `${username.slice(0, 15)}...` : username}
      </p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors text-gray-300 hover:text-white text-sm truncate max-w-full"
      >
        Connect
      </a>
    </div>
  </div>
);

export default ProfileCard;