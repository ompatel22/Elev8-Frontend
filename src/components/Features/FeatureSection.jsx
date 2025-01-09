import React from "react";
import FeatureCard from "./FeatureCard";

const FeatureSection = () => {
    return (
        <section className="py-16 dark:bg-gray-700 bg-gray-200">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-semibold text-center dark:text-white text-gray-900 mb-12">
                    Why Join Us?
                </h2>
                <div className="flex justify-center gap-6">
                    <FeatureCard
                        icon="👨‍💻"
                        title="Build Your Profile"
                        description="Showcase achievements from platforms like GitHub, LeetCode, and Codeforces."
                    />
                    <FeatureCard
                        icon="🤝"
                        title="Hackathon Connections"
                        description="Find hackathons and build your dream team effortlessly."
                    />
                    <FeatureCard
                        icon="💬"
                        title="Join Study Groups"
                        description="Collaborate with peers in focused study groups and share resources."
                    />
                    <FeatureCard
                        icon="🏫"
                        title="College Groups"
                        description="Participate in group chats exclusive to your college."
                    />
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;
