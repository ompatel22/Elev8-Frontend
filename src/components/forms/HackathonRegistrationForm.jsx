import React, { useState, useEffect } from "react";
import { Calendar, Upload, Globe } from "lucide-react";
import Navigation from "../navigation/Navigation";
import GradientBackground from "../background/GradientBackground";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Input = ({ label, error, ...props }) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-medium text-gray-200 mb-1">
        {label}
      </label>
    )}
    <input
      className={`w-full px-3 py-2 bg-gray-900/50 border ${
        error ? "border-red-500" : "border-gray-700"
      } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400`}
      {...props}
    />
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

const RadioGroup = ({ label, options, value, onChange, error, ...props }) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-medium text-gray-200 mb-2">
        {label}
      </label>
    )}
    <div className="flex space-x-4">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <input
            type="radio"
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
            className="w-4 h-4 text-blue-500 border-gray-700 focus:ring-blue-500"
            {...props}
          />
          <span className="text-gray-200">{option.label}</span>
        </label>
      ))}
    </div>
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

const StepIndicator = ({ currentStep, totalSteps }) => (
  <div className="flex items-center space-x-4 mb-4">
    {[...Array(totalSteps)].map((_, index) => (
      <React.Fragment key={index}>
        <span
          className={`h-8 w-8 rounded-full flex items-center justify-center ${
            index + 1 <= currentStep
              ? "bg-blue-500 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          {index + 1}
        </span>
        {index < totalSteps - 1 && <div className="h-0.5 w-8 bg-gray-600" />}
      </React.Fragment>
    ))}
  </div>
);

const HackathonRegistrationForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formData, setFormData] = useState({
    logo: null,
    title: "",
    organization: "",
    theme: "",
    location: "",
    mode: "online",
    about: "",
    teamSize: { min: 1, max: 4 },
    registrationDates: {
      start: "",
      end: "",
    },
    hackathonDates: {
      start: "",
      end: "",
    },
    createdBy: localStorage.getItem("username"),
  });

  const [formErrors, setFormErrors] = useState({});

  const validateStep1 = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Title is required";
    if (!formData.organization.trim())
      errors.organization = "Organization is required";
    if (!formData.about.trim()) errors.about = "Description is required";
    return errors;
  };

  const validateStep2 = () => {
    const errors = {};
    // Registration Dates Validation
    if (!formData.registrationDates.start)
      errors.RegStartDate = "Start date is required";
    if (!formData.registrationDates.end)
      errors.RegEndDate = "End date is required";
    if (!formData.registrationDates.start)
      errors.HackStartDate = "Start date is required";
    if (!formData.registrationDates.end)
      errors.HackEndDate = "End date is required";
    if (new Date(formData.registrationDates.start) <= new Date()) {
      errors.RegStartDate = "Start date must be in the future";
    }
    if (new Date(formData.registrationDates.end) <= new Date()) {
      errors.RegEndDate = "End date must be in the future";
    }
    if (
      new Date(formData.registrationDates.end) <=
      new Date(formData.registrationDates.start)
    ) {
      errors.RegEndDate = "End date must be greater than start date";
    }

    // Hackathon Dates Validation
    if (!formData.hackathonDates.start)
      errors.HackStartDate = "Start date is required";
    if (!formData.hackathonDates.end)
      errors.HackEndDate = "End date is required";
    if (new Date(formData.hackathonDates.start) <= new Date()) {
      errors.HackStartDate = "Start date must be in the future";
    }
    if (new Date(formData.hackathonDates.end) <= new Date()) {
      errors.HackEndDate = "End date must be in the future";
    }
    if (
      new Date(formData.hackathonDates.end) <=
      new Date(formData.hackathonDates.start)
    ) {
      errors.HackEndDate = "End date must be greater than start date";
    }

    // 🚀 New Validation: Hackathon dates must be after registration dates
    if (
      new Date(formData.hackathonDates.start) <=
      new Date(formData.registrationDates.end)
    ) {
      errors.HackStartDate =
        "Hackathon start date must be after registration end date";
    }

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

  const handleNext = () => {
    const errors = validateStep1();
    if (Object.keys(errors).length === 0) {
      setStep(2);
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateStep2();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create FormData object
      const submitFormData = new FormData();

      // Add file first if it exists
      if (formData.logo) {
        submitFormData.append("logo", formData.logo);
      }

      // Create a data object without the logo and format dates
      const dataWithoutLogo = {
        ...formData,
        logo: null,
        registrationDates: {
          start: formData.registrationDates.start.replace("T", " ") + ":00",
          end: formData.registrationDates.end.replace("T", " ") + ":00",
        },
        hackathonDates: {
          start: formData.hackathonDates.start.replace("T", " ") + ":00",
          end: formData.hackathonDates.end.replace("T", " ") + ":00",
        },
      };

      // Add the rest of the data as a JSON string
      submitFormData.append("data", JSON.stringify(dataWithoutLogo));

      const response = await axios.post(
        "http://localhost:8080/api/hackathons",
        submitFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess(true);
      navigate("/dashboard/hackathons");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create hackathon");
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (1MB = 1048576 bytes)
      if (file.size > 1048576) {
        setFormErrors((prev) => ({
          ...prev,
          logo: "File size must be less than 1MB",
        }));
        return;
      }

      // Check file type
      if (!file.type.match("image.*")) {
        setFormErrors((prev) => ({
          ...prev,
          logo: "Please upload an image file",
        }));
        return;
      }

      // Create preview URL
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);

      // Store the file object
      setFormData((prev) => ({
        ...prev,
        logo: file,
      }));

      setFormErrors((prev) => ({
        ...prev,
        logo: undefined,
      }));
    }
  };

  // Clean up preview URL when component unmounts or when preview changes
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <GradientBackground className="min-h-screen">
      <Navigation />
      <div className="max-w-3xl mx-auto pt-32">
        <div className="max-w-3xl mx-auto">
          <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg shadow-xl">
            {/* Form Header */}
            <div className="p-6 border-b border-gray-800">
              <StepIndicator currentStep={step} totalSteps={2} />
              <h2 className="text-2xl font-bold text-white">
                {step === 1 ? "Basic Details" : "Registration Details"}
              </h2>
              <p className="mt-1 text-gray-400">
                {step === 1
                  ? "Fill in the basic information about your hackathon"
                  : "Configure registration settings and requirements"}
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
                  <p className="text-green-500">
                    Hackathon created successfully!
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 ? (
                  <>
                    {/* Logo Upload */}
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-200 mb-1">
                        Hackathon Logo
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-lg">
                        <div className="space-y-1 text-center">
                          {previewUrl ? (
                            <div className="flex flex-col items-center">
                              <img
                                src={previewUrl}
                                alt="Preview"
                                className="h-64 w-96 object-cover rounded-lg mb-2"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  URL.revokeObjectURL(previewUrl);
                                  setPreviewUrl(null);
                                  setFormData((prev) => ({
                                    ...prev,
                                    logo: null,
                                  }));
                                }}
                                className="text-sm text-red-500 hover:text-red-400"
                              >
                                Remove
                              </button>
                            </div>
                          ) : (
                            <>
                              <Upload className="mx-auto h-12 w-12 text-gray-400" />
                              <div className="flex text-sm text-gray-400">
                                <label className="relative cursor-pointer rounded-md font-medium text-blue-500 hover:text-blue-400">
                                  <span>Upload a file</span>
                                  <input
                                    type="file"
                                    className="sr-only"
                                    onChange={handleLogoUpload}
                                    accept="image/*"
                                  />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-400">
                                PNG, JPG, GIF up to 1MB
                              </p>
                            </>
                          )}
                          {formErrors.logo && (
                            <p className="mt-1 text-sm text-red-500">
                              {formErrors.logo}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <Input
                      label="Hackathon Title"
                      placeholder="Enter hackathon title"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      error={formErrors.title}
                    />

                    <Input
                      label="Organization"
                      placeholder="Enter organization name"
                      value={formData.organization}
                      onChange={(e) =>
                        handleInputChange("organization", e.target.value)
                      }
                      error={formErrors.organization}
                    />

                    <Input
                      label="Theme"
                      placeholder="Enter hackathon theme"
                      value={formData.theme}
                      onChange={(e) =>
                        handleInputChange("theme", e.target.value)
                      }
                    />

                    <Input
                      label="Location"
                      placeholder="Enter hackathon Location"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                    />

                    <RadioGroup
                      label="Mode of Event"
                      options={[
                        { value: "online", label: "Online" },
                        { value: "offline", label: "Offline" },
                      ]}
                      value={formData.mode}
                      onChange={(e) =>
                        handleInputChange("mode", e.target.value)
                      }
                    />

                    <Textarea
                      label="About Hackathon"
                      placeholder="Describe your hackathon, including rules, eligibility, and format"
                      value={formData.about}
                      onChange={(e) =>
                        handleInputChange("about", e.target.value)
                      }
                      rows={6}
                      error={formErrors.about}
                    />

                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50"
                      disabled={loading}
                    >
                      Next
                    </button>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-200">
                        Team Size
                      </label>
                      <div className="flex space-x-4">
                        <Input
                          type="number"
                          placeholder="Min Team Size"
                          value={formData.teamSize.min}
                          onChange={(e) =>
                            handleInputChange("teamSize", {
                              ...formData.teamSize,
                              min: parseInt(e.target.value),
                            })
                          }
                          className="w-24"
                          min="1"
                          error={formErrors.teamSizeMin}
                        />
                        <Input
                          type="number"
                          placeholder="Max Team Size"
                          value={formData.teamSize.max}
                          onChange={(e) =>
                            handleInputChange("teamSize", {
                              ...formData.teamSize,
                              max: parseInt(e.target.value),
                            })
                          }
                          className="w-24"
                          min={formData.teamSize.min}
                          error={formErrors.teamSizeMax}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <Input
                        label="Registration Start Date"
                        type="datetime-local"
                        value={formData.registrationDates.start}
                        onChange={(e) =>
                          handleInputChange("registrationDates", {
                            ...formData.registrationDates,
                            start: e.target.value,
                          })
                        }
                        error={formErrors.RegStartDate}
                      />

                      <Input
                        label="Registration End Date"
                        type="datetime-local"
                        value={formData.registrationDates.end}
                        onChange={(e) =>
                          handleInputChange("registrationDates", {
                            ...formData.registrationDates,
                            end: e.target.value,
                          })
                        }
                        error={formErrors.RegEndDate}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <Input
                        label="Hackathon Start Date"
                        type="datetime-local"
                        value={formData.hackathonDates.start}
                        onChange={(e) =>
                          handleInputChange("hackathonDates", {
                            ...formData.hackathonDates,
                            start: e.target.value,
                          })
                        }
                        error={formErrors.HackStartDate}
                      />

                      <Input
                        label="Hackathon End Date"
                        type="datetime-local"
                        value={formData.hackathonDates.end}
                        onChange={(e) =>
                          handleInputChange("hackathonDates", {
                            ...formData.hackathonDates,
                            end: e.target.value,
                          })
                        }
                        error={formErrors.HackEndDate}
                      />
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-full py-2 px-4 bg-transparent hover:bg-gray-800 text-white border border-gray-600 rounded-lg transition-colors disabled:opacity-50"
                        disabled={loading}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50"
                        disabled={loading}
                      >
                        {loading ? "Creating..." : "Create Hackathon"}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
};

export default HackathonRegistrationForm;
