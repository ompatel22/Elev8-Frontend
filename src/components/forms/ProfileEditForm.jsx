import React, { useState, useEffect } from "react";
import { User, Lock, Mail, Building, Github, Code, FileCode, BookOpen, Linkedin, Twitter, Instagram } from "lucide-react";
import Navigation from "../navigation/Navigation";
import GradientBackground from "../background/GradientBackground";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Reuse the Input component with icon support
const Input = ({ label, error, icon: Icon, ...props }) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-medium text-gray-200 mb-1">
        {label}
      </label>
    )}
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
      )}
      <input
        className={`w-full ${Icon ? 'pl-10' : 'pl-3'} py-2 bg-gray-900/50 border ${
          error ? "border-red-500" : "border-gray-700"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400`}
        {...props}
      />
    </div>
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

const Textarea = ({ label, error, ...props }) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-medium text-gray-200 mb-1">
        {label}
      </label>
    )}
    <textarea
      className={`w-full px-3 py-2 bg-gray-900/50 border ${
        error ? "border-red-500" : "border-gray-700"
      } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400`}
      {...props}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

const ProfileEditForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    username: null,
    password: null,
    displayName: null,
    email: null,
    collegeName: null,
    githubUsername: null,
    leetcodeUsername: null,
    codechefUsername: null,
    bio: null,
    linkedinurl: null,
    twitterusername: null,
    instagramusername: null,
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    // URL validations
    const urlRegex = /^https?:\/\/.+/;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.email && !emailRegex.test(formData.email)) 
      errors.email = "Please enter a valid email";

    if (formData.linkedinurl && !urlRegex.test(formData.linkedinurl)) 
      errors.linkedinurl = "Please enter a valid URL";

    return errors;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setFormErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        `http://localhost:8080/api/users/${localStorage.getItem("username")}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess(true);
      // Optionally redirect or show success message
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground className="min-h-screen">
      <Navigation />
      <div className="max-w-3xl mx-auto pt-32">
        <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg shadow-xl">
          {/* Form Header */}
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
            <p className="mt-1 text-gray-400">
              Update your profile information and social links
            </p>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {error && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-lg">
                <p className="text-red-500">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 p-4 bg-green-500/10 border border-green-500 rounded-lg">
                <p className="text-green-500">Profile updated successfully!</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Input
                  label="Username"
                  icon={User}
                  placeholder="Enter username (optional)"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  error={formErrors.username}
                />

                <Input
                  label="Password"
                  icon={Lock}
                  type="password"
                  placeholder="Enter new password (optional)"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  error={formErrors.password}
                />

                <Input
                  label="Display Name (optional)"
                  icon={User}
                  placeholder="Enter display name"
                  value={formData.displayName}
                  onChange={(e) => handleInputChange("displayName", e.target.value)}
                  error={formErrors.displayName}
                />

                <Input
                  label="Email"
                  icon={Mail}
                  type="email"
                  placeholder="Enter email (optional)"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  error={formErrors.email}
                />

                <Input
                  label="College Name"
                  icon={Building}
                  placeholder="Enter college name (optional)"
                  value={formData.collegeName}
                  onChange={(e) => handleInputChange("collegeName", e.target.value)}
                  error={formErrors.collegeName}
                />

                <Input
                  label="GitHub Username"
                  icon={Github}
                  placeholder="Enter GitHub username (optional)"
                  value={formData.githubUsername}
                  onChange={(e) => handleInputChange("githubUsername", e.target.value)}
                />

                <Input
                  label="LeetCode Username"
                  icon={Code}
                  placeholder="Enter LeetCode username (optional)"
                  value={formData.leetcodeUsername}
                  onChange={(e) => handleInputChange("leetcodeUsername", e.target.value)}
                />

                <Input
                  label="CodeChef Username"
                  icon={FileCode}
                  placeholder="Enter CodeChef username (optional)"
                  value={formData.codechefUsername}
                  onChange={(e) => handleInputChange("codechefUsername", e.target.value)}
                />

                <Input
                  label="LinkedIn URL"
                  icon={Linkedin}
                  placeholder="Enter LinkedIn profile URL (optional)"
                  value={formData.linkedinurl}
                  onChange={(e) => handleInputChange("linkedinurl", e.target.value)}
                  error={formErrors.linkedinurl}
                />

                <Input
                  label="X (Twitter) Username"
                  icon={Twitter}
                  placeholder="Enter X username (optional)"
                  value={formData.twitterusername}
                  onChange={(e) => handleInputChange("twitterusername", e.target.value)}
                />

                <Input
                  label="Instagram Username"
                  icon={Instagram}
                  placeholder="Enter Instagram username (optional)"
                  value={formData.instagramusername}
                  onChange={(e) => handleInputChange("instagramusername", e.target.value)}
                />
              </div>

              <Textarea
                label="Bio"
                placeholder="Tell us about yourself (optional)"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                rows={4}
              />

              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
};

export default ProfileEditForm;
