import React, { useState } from "react";
import { Calendar, Upload, Globe } from "lucide-react";
import Navigation from "../navigation/Navigation";
import GradientBackground from "../background/GradientBackground";
import { useNavigate } from "react-router-dom";
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
  const [formData, setFormData] = useState({
    logo: null,
    title: "",
    organization: "",
    theme: "",
    mode: "online",
    about: "",
    participationType: "team",
    teamSize: { min: 1, max: 4 },
    registrationDates: {
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
    if (!formData.registrationDates.start)
      errors.startDate = "Start date is required";
    if (!formData.registrationDates.end)
      errors.endDate = "End date is required";
    if (formData.participationType === "team") {
      if (formData.teamSize.min < 1)
        errors.teamSizeMin = "Minimum team size must be at least 1";
      if (formData.teamSize.max < formData.teamSize.min) {
        errors.teamSizeMax = "Maximum team size must be greater than minimum";
      }
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
      const response = await fetch("http://localhost:8080/api/hackathons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create hackathon");
      }

      setSuccess(true);
      navigate("/dashboard/hackathons");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-400">
                            <label className="relative cursor-pointer rounded-md font-medium text-blue-500 hover:text-blue-400">
                              <span>Upload a file</span>
                              <input
                                type="file"
                                className="sr-only"
                                onChange={(e) =>
                                  handleInputChange("logo", e.target.files[0])
                                }
                                accept="image/*"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-400">
                            PNG, JPG, GIF up to 1MB
                          </p>
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
                    <RadioGroup
                      label="Participation Type"
                      options={[
                        // { value: "individual", label: "Individual" },
                        { value: "team", label: "Team" },
                      ]}
                      value={formData.participationType}
                      onChange={(e) =>
                        handleInputChange("participationType", e.target.value)
                      }
                    />

                    {formData.participationType === "team" && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-200">
                          Team Size
                        </label>
                        <div className="flex space-x-4">
                          <Input
                            type="number"
                            placeholder="Min"
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
                            placeholder="Max"
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
                    )}

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
                        error={formErrors.startDate}
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
                        error={formErrors.endDate}
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
