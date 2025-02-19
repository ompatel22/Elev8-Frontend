import React from "react";
import { motion } from "framer-motion";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      className="relative w-full h-full max-w-sm flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 flex flex-col justify-between h-full"
        whileHover={{
          scale: 1.03,
          boxShadow: "0 0 30px 0 rgba(124, 58, 237, 0.1)",
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="text-6xl mb-6"
          initial={{ scale: 1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {icon}
        </motion.div>
        <motion.h3
          className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-gray-300 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default FeatureCard;
