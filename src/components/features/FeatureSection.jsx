import React from "react";
import FeatureCard from "./FeatureCard";
import { motion } from "framer-motion";

const FeatureSection = ({ text }) => {
  return (
    <div id="features" className="min-h-screen flex flex-col justify-center py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            {text}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mt-8">
            Join a community of passionate developers and unlock your full
            potential.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: "👨‍💻",
              title: "Build Your Profile",
              description:
                "Showcase achievements from platforms like GitHub, LeetCode, and CodeChef.",
            },
            {
              icon: "🤝",
              title: "Hackathon Connections",
              description:
                "Find hackathons and build your dream team effortlessly.",
            },
            {
              icon: "💬",
              title: "Join Study Groups",
              description:
                "Collaborate with peers in focused study groups and share resources.",
            },
            {
              icon: "🏫",
              title: "College Groups",
              description:
                "Participate in group chats exclusive to your college.",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center h-full"
            >
              <FeatureCard
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
