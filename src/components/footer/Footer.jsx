import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-gray-300 py-12">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6"
          >
            Elev8
          </motion.div>
          <div className="flex flex-wrap justify-center space-x-6 md:space-x-12 mb-6">
            <a href="#about" className="hover:text-blue-400 transition duration-300">About</a>
            <a href="#features" className="hover:text-blue-400 transition duration-300">Features</a>
            <a  className="hover:text-blue-400 transition duration-300">Contact</a>
            <a  className="hover:text-blue-400 transition duration-300">Privacy Policy</a>
          </div>
          <div className="flex justify-center space-x-6 text-2xl mb-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-300">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-300">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-300">
              <FaLinkedin />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-300">
              <FaInstagram />
            </a>
          </div>
          <p className="text-gray-400">&copy; {currentYear} Elev8. All Rights Reserved.</p>
          <p className="text-gray-400">Made for students by students.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
