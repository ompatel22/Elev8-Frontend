import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileSection from "../profile/ProfileSection";
import { useParams } from "react-router-dom";
import GitHubCard from "../profile/GitHubCard";
import LeetCodeCard from "../profile/LeetcodeCard";
import CodeChefCard from "../profile/CodeChefCard";
import GradientBackground from "../background/GradientBackground";
import ShimmerEffect from "../shimmer/ShimmerEffect";
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiLeetcode, SiCodechef } from 'react-icons/si';
import ProfileCard from "../profile/ProfileCard";

const platformConfig = [
  {
    platform: "LinkedIn",
    usernameKey: "linkedinurl",
    icon: FaLinkedin,
    baseUrl: "https://linkedin.com/in/",
    bgColor: "bg-[#0077b5]/10 backdrop-blur-md"
  },
  {
    platform: "Instagram",
    usernameKey: "instagramusername",
    icon: FaInstagram,
    baseUrl: "https://instagram.com/",
    bgColor: "bg-[#E1306C]/10 backdrop-blur-md"
  },
  {
    platform: "GitHub",
    usernameKey: "githubUsername",
    icon: FaGithub,
    baseUrl: "https://github.com/",
    bgColor: "bg-[#333]/10 backdrop-blur-md"
  },
  {
    platform: "Twitter",
    usernameKey: "twitterusername",
    icon: FaXTwitter,
    baseUrl: "https://x.com/",
    bgColor: "bg-[#000000]/10 backdrop-blur-md"
  },
  {
    platform: "LeetCode",
    usernameKey: "leetcodeUsername",
    icon: SiLeetcode,
    baseUrl: "https://leetcode.com/",
    bgColor: "bg-[#FFA116]/10 backdrop-blur-md"
  },
  {
    platform: "CodeChef",
    usernameKey: "codechefUsername",
    icon: SiCodechef,
    baseUrl: "https://codechef.com/users/",
    bgColor: "bg-[#5B4638]/10 backdrop-blur-md"
  }
];

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
        console.log(response.data);
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

  const ProfileSectionShimmer = () => (
    <div className="w-full md:w-80 bg-black/40 backdrop-blur-md rounded-lg p-6 h-[400px]">
      <ShimmerEffect className="w-32 h-32 rounded-full mx-auto mb-4" />
      <ShimmerEffect className="h-6 w-3/4 mx-auto mb-3 rounded" />
      <ShimmerEffect className="h-4 w-1/2 mx-auto mb-6 rounded" />
      <ShimmerEffect className="h-20 w-full rounded mb-4" />
    </div>
  );

  const CardShimmer = () => (
    <div className="bg-black/40 backdrop-blur-md rounded-lg p-6 h-[400px]">
      <ShimmerEffect className="h-6 w-1/3 mb-4 rounded" />
      <ShimmerEffect className="h-40 w-full rounded mb-4" />
      <ShimmerEffect className="h-4 w-2/3 rounded mb-2" />
      <ShimmerEffect className="h-4 w-1/2 rounded" />
    </div>
  );

  const SocialCardShimmer = () => (
    <div className={`bg-black/40 backdrop-blur-md rounded-lg p-4 flex flex-col gap-2`}>
      <div className="flex items-center gap-2">
        <ShimmerEffect className="h-8 w-8 rounded-full" />
        <ShimmerEffect className="h-6 w-24 rounded" />
      </div>
      <ShimmerEffect className="h-4 w-32 rounded" />
    </div>
  );

  return (
    <GradientBackground className="min-h-screen text-white flex flex-col p-6 pt-28">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side - Profile Section */}
        <div className="flex flex-col gap-6 w-[32rem]">
          {!success || !codechefData || !githubData ? (
            <>
              <ProfileSectionShimmer />
              {/* Social Media Cards Grid with Shimmer */}
              <div className="grid grid-cols-2 gap-2">
                {[...Array(6)].map((_, index) => (
                  <SocialCardShimmer key={index} />
                ))}
              </div>
            </>
          ) : (
            <>
              <ProfileSection
                imageUrl={githubData.avatar_url}
                countryFlagUrl={codechefData.countryFlag}
                name={userData.displayName}
                username={username}
                bio={userData.bio}
              />
              {/* Social Media Cards Grid */}
              <div className="grid grid-cols-2 gap-y-8 pl-12">
                {platformConfig
                  .filter(platform => userData[platform.usernameKey])
                  .map((platform) => (
                    <ProfileCard
                      key={platform.platform}
                      platform={platform.platform}
                      username={userData[platform.usernameKey]}
                      icon={platform.icon}
                      link={`${platform.baseUrl}${userData[platform.usernameKey]}`}
                      bgColor={platform.bgColor}
                    />
                  ))}
              </div>
            </>
          )}
        </div>

        {/* Right Side - Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 pl-20">
          {!githubData ? (
            <>
              <CardShimmer />
              <CardShimmer />
            </>
          ) : (
            <>
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
              <GitHubCard
                platform="GitHub Stats"
                imgUrl1={`https://github-contributor-stats.vercel.app/api?username=${userData.githubUsername}&limit=5&theme=tokyonight&combine_all_yearly_contributions=true&hide_border=true&bg_color=0d0d0d&card_width=466`}
                imgUrl2={`https://streak-stats.demolab.com/?user=${userData.githubUsername}&theme=dark&hide_border=true&card_width=497&bg_color=0d0d0d`}
                stats={[]}
              />
            </>
          )}
          {!leetcodeData ? (
            <CardShimmer />
          ) : (
            <LeetCodeCard
              platform="LeetCode Stats"
              stats={[
                { label: "Acceptance Rate", value: leetcodeData.acceptanceRate },
                { label: "Ranking", value: leetcodeData.ranking },
              ]}
              imgUrl={`https://leetcard.jacoblin.cool/${userData.leetcodeUsername}?theme=dark&font=inter&ext=heatmap`}
            />
          )}
          {!codechefData ? (
            <>
              <CardShimmer />
              <CardShimmer />
            </>
          ) : (
            <>
              <CodeChefCard
                platform="CodeChef Stats"
                stats={[]}
                imgUrl={`https://codechef-api.vercel.app/rating/${userData.codechefUsername}`}
              />
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
            </>
          )}
        </div>
      </div>
      {/* {console.log("lc", leetcodeData, "cc", codechefData, "gh", githubData)} */}
    </GradientBackground>
  );
};

export default ProfileDashboard;