import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileSection from "../profile/ProfileSection";
import { useParams } from "react-router-dom";
import GitHubCard from "../profile/GitHubCard";
import LeetCodeCard from "../profile/LeetcodeCard";
import CodeChefCard from "../profile/CodeChefCard";
import GradientBackground from "../background/GradientBackground";

const ProfileDashboard = () => {
  const params = useParams();
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState({});
  const [githubData, setGithubData] = useState(null);
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [codechefData, setCodechefData] = useState(null);

  const username = params.username;

  useEffect(() => {
    // Fetch user data
    axios
      .get(`http://localhost:8080/api/users/${username}`)
      .then((response) => {
        setUserData(response.data);
        setSuccess(true);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [username]);

  // Fetch platform data only when userData is successfully set
  useEffect(() => {
    if (success && userData.username) {
      console.log("Updated userData:", userData);

      // Fetch GitHub data
      axios
        .get(`https://api.github.com/users/${userData.githubUsername}`)
        .then((response) => setGithubData(response.data))
        .catch((error) => console.error("Error fetching GitHub data:", error));

      // Fetch LeetCode data
      axios
        .get(
          `https://leetcode-stats-api.herokuapp.com/${userData.leetcodeUsername}`
        )
        .then((response) => setLeetcodeData(response.data))
        .catch((error) =>
          console.error("Error fetching LeetCode data:", error)
        );

      // Fetch CodeChef data
      axios
        .get(
          `https://codechef-api.vercel.app/handle/${userData.codechefUsername}`
        )
        .then((response) => setCodechefData(response.data))
        .catch((error) =>
          console.error("Error fetching CodeChef data:", error)
        );
    }
  }, [success, userData]);

  return (
    <GradientBackground className="min-h-screen text-white flex flex-col p-6 pt-28">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side - Profile Section */}
        {codechefData && githubData && (
          <ProfileSection
            imageUrl={githubData.avatar_url}
            countryFlagUrl={codechefData.countryFlag}
            name={userData.displayName}
            username={username}
            bio="Learning. Growing. Blooming. Passionate developer with a love for problem-solving."
          />
        )}

        {/* Right Side - Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
          {githubData && (
            <GitHubCard
              platform="GitHub Stats"
              imgUrl1={`https://github-readme-stats.vercel.app/api?username=${userData.githubUsername}&show_icons=true&theme=tokyonight&rank_icon=github&hide_border=true&bg_color=0d0d0d`}
              imgUrl2={`https://github-readme-stats.vercel.app/api/top-langs/?username=${userData.githubUsername}&layout=compact&theme=tokyonight&hide_border=true&bg_color=0d0d0d&card_width=466`}
              stats={[
                { label: "Total Repositories", value: githubData.public_repos },
                { label: "Followers", value: githubData.followers },
                { label: "Following", value: githubData.following },
              ]}
            />
          )}
          {githubData && (
            <GitHubCard
              platform="GitHub Stats"
              imgUrl1={`https://github-contributor-stats.vercel.app/api?username=${userData.githubUsername}&limit=5&theme=tokyonight&combine_all_yearly_contributions=true&hide_border=true&bg_color=0d0d0d&card_width=466`}
              imgUrl2={`https://streak-stats.demolab.com/?user=${userData.githubUsername}&theme=dark&hide_border=true&card_width=497&bg_color=0d0d0d`}
              stats={[]}
            />
          )}
          {leetcodeData && (
            <LeetCodeCard
              platform="LeetCode Stats"
              stats={[
                { label: "Acceptance Rate", value: leetcodeData.acceptanceRate },
                { label: "Ranking", value: leetcodeData.ranking },
              ]}
              imgUrl={`https://leetcard.jacoblin.cool/${userData.leetcodeUsername}?theme=dark&font=inter&ext=heatmap`}
            />
          )}
          {codechefData && (
            <CodeChefCard
              platform="CodeChef Stats"
              stats={[]}
              imgUrl={`https://codechef-api.vercel.app/rating/${userData.codechefUsername}`}
            />
          )}
          {codechefData && (
            <CodeChefCard
              platform="CodeChef Stats"
              stats={[
                { label: "Stars", value: codechefData.stars },
                { label: "Max Rating", value: codechefData.highestRating },
                { label: "Curr Rating", value: codechefData.currentRating },
                { label: "Country Rank", value: codechefData.countryRank },
                { label: "Global Rank", value: codechefData.globalRank },
              ]}
              imgUrl="x"
            />
          )}
        </div>
      </div>
      {console.log("lc", leetcodeData, "cc", codechefData, "gh", githubData)}
    </GradientBackground>
  );
};

export default ProfileDashboard;