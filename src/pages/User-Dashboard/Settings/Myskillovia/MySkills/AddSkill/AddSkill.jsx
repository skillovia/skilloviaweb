import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserLayout from "../../../../UserLayout/UserLayout";
import { ChevronLeft } from "lucide-react";

const skills = [
  "Electrical Services",
  "Laundry",
  "Fast Foods",
  "Food Bowls",
  "Make up",
  "Grocery Shopping",
  "Fashion Designer",
  // Home services
  "House Cleaning",
  "Deep Cleaning",
  "Carpet Cleaning",
  "Gutter Cleaning",
  "Pressure Washing",
  "Pool Cleaning and Maintenance",
  "Garage Organization",
  "Decluttering Services",
  "Chimney Sweeping",
  "Upholstery Cleaning",
  "Tiling (Floor/Wall)",
  "Drywall Installation and Repair",
  "Kitchen Remodeling",
  "Bathroom Remodeling",
  "Flooring Installation",
  "HVAC Repairs and Installation",
  "Cabinet Installation",
  "Home Theater Setup",
  "Smart Home Installation",
  "Insulation Installation",
  "Lawn Mowing",
  "Landscaping",
  "Tree Trimming and Removal",
  "Garden Maintenance",
  "Fence Repair and Installation",
  "Deck Maintenance and Repairs",
  "Power Washing",
  "Pest Control Services",
  "Snow Removal",
  "Sprinkler System Installation and Repair",
  "Plumbing",
  "Electrical Repairs",
  "Handyman Services",
  "Pool Cleaning",
  "Roofing Repairs",
  "Painting (Interior/Exterior)",
].sort();

const experienceLevels = [
  { title: "Beginner", description: "I'm learning basics and exploring" },
  { title: "Intermediate", description: "I have some experience in the past" },
  { title: "Expert", description: "I've done this for years" },
];

const MAX_FILES = 4;

const CustomBackButton = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="flex items-center text-gray-600 hover:text-gray-800"
  >
    <ChevronLeft className="w-5 h-5" />
    <span className="ml-1">{label}</span>
  </button>
);

export default function AddSkill() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    skill: "",
    experienceLevel: "",
    description: "",
    hourlyRate: "5.00",
    thumbnails: [],
  });
  const [previewUrls, setPreviewUrls] = useState([]);

  const filteredSkills = skills.filter((skill) =>
    skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSkillSelect = (skill) => {
    setFormData((prev) => ({ ...prev, skill }));
  };

  const handleExperienceSelect = (level) => {
    setFormData((prev) => ({ ...prev, experienceLevel: level }));
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      navigate("/settings/skills");
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > MAX_FILES) {
      setError(`Maximum ${MAX_FILES} images allowed`);
      return;
    }

    const invalidFiles = files.filter(
      (file) => !file.type.startsWith("image/")
    );
    if (invalidFiles.length > 0) {
      setError("Only image files are allowed");
      return;
    }

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    setError(null);
    setFormData((prev) => ({ ...prev, thumbnails: files }));
  };

  const removeImage = (index) => {
    const newThumbnails = [...formData.thumbnails];
    const newPreviewUrls = [...previewUrls];

    URL.revokeObjectURL(newPreviewUrls[index]);

    newThumbnails.splice(index, 1);
    newPreviewUrls.splice(index, 1);

    setFormData((prev) => ({ ...prev, thumbnails: newThumbnails }));
    setPreviewUrls(newPreviewUrls);
  };

  const renderImagePreviews = () => (
    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
      {previewUrls.map((url, index) => (
        <div key={index} className="relative">
          <img
            src={url}
            alt={`Preview ${index + 1}`}
            className="w-full h-32 object-cover rounded-lg"
          />
          <button
            onClick={() => removeImage(index)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );

  // const handleSubmit = async () => {
  //   try {
  //     setIsLoading(true);
  //     setError(null);

  //     if (
  //       !formData.skill ||
  //       !formData.experienceLevel ||
  //       !formData.description ||
  //       !formData.hourlyRate
  //     ) {
  //       throw new Error("Please fill in all required fields");
  //     }

  //     const formDataToSend = new FormData();
  //     formDataToSend.append("skill_type", formData.skill);
  //     formDataToSend.append(
  //       "experience_level",
  //       formData.experienceLevel.toLowerCase()
  //     );
  //     formDataToSend.append("hourly_rate", formData.hourlyRate);
  //     formDataToSend.append("description", formData.description);

  //     formData.thumbnails.forEach((file) => {
  //       formDataToSend.append("thumbnails", file);
  //     });

  //     const response = await fetch(`${import.meta.env.VITE_BASE_URL}/skills`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //       },
  //       body: formDataToSend,
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || "Failed to add skill");
  //     }

  //     previewUrls.forEach((url) => URL.revokeObjectURL(url));

  //     navigate("/settings/skills");
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     setError(error.message || "Failed to add skill. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (
        !formData.skill ||
        !formData.experienceLevel ||
        !formData.description ||
        !formData.hourlyRate
      ) {
        throw new Error("Please fill in all required fields");
      }

      // Calculate Spark Token based on hourlyRate
      const sparkToken = parseInt(formData.hourlyRate, 10); // Same logic as UI

      const formDataToSend = new FormData();
      formDataToSend.append("skill_type", formData.skill);
      formDataToSend.append(
        "experience_level",
        formData.experienceLevel.toLowerCase()
      );
      formDataToSend.append("hourly_rate", formData.hourlyRate);
      formDataToSend.append("spark_token", sparkToken); // ✅ Include Spark Token
      formDataToSend.append("description", formData.description);

      formData.thumbnails.forEach((file) => {
        formDataToSend.append("thumbnails", file);
      });

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/skills`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add skill");
      }

      previewUrls.forEach((url) => URL.revokeObjectURL(url));

      navigate("/settings/skills");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error.message || "Failed to add skill. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="w-full">
            <div className="flex items-center mb-4">
              <CustomBackButton onClick={handleBack} label="Back to Skills" />
              <button
                onClick={handleNext}
                disabled={!formData.skill}
                className={`ml-auto bg-primary text-secondary font-medium px-4 py-3 rounded-full text-sm ${
                  !formData.skill ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Next, Experience level
              </button>
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search skills"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 rounded-lg bg-input border-gray border"
              />
            </div>
            <h3 className="mb-4 text-lg font-medium">Select your skill</h3>
            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {filteredSkills.map((skill) => (
                <div
                  key={skill}
                  onClick={() => handleSkillSelect(skill)}
                  className="flex items-center p-4 rounded-lg border border-gray bg-input cursor-pointer hover:bg-gray-100"
                >
                  <span>{skill}</span>
                  <div
                    className={`ml-auto w-6 h-6 rounded-full border-2 ${
                      formData.skill === skill
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300"
                    }`}
                  >
                    {formData.skill === skill && (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-white">✓</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {filteredSkills.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No skills found matching your search
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="w-full">
            <div className="flex items-center mb-4">
              <CustomBackButton onClick={handleBack} label="Select Skill" />
              <button
                onClick={handleNext}
                disabled={!formData.experienceLevel}
                className={`ml-auto bg-primary text-secondary font-medium px-4 py-3 rounded-full text-sm ${
                  !formData.experienceLevel
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Next, Description
              </button>
            </div>
            <h3 className="mb-4 text-lg font-medium">
              What's your experience level?
            </h3>
            <div className="space-y-2">
              {experienceLevels.map((level) => (
                <div
                  key={level.title}
                  onClick={() => handleExperienceSelect(level.title)}
                  className="flex items-center p-4 rounded-lg border-gray bg-input border cursor-pointer hover:bg-gray-100"
                >
                  <div>
                    <div className="font-medium">{level.title}</div>
                    <div className="text-sm text-gray-500">
                      {level.description}
                    </div>
                  </div>
                  <div
                    className={`ml-auto w-6 h-6 rounded-full border-2 ${
                      formData.experienceLevel === level.title
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300"
                    }`}
                  >
                    {formData.experienceLevel === level.title && (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-white">✓</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="w-full">
            <div className="flex items-center mb-4">
              <CustomBackButton onClick={handleBack} label="Experience Level" />
              <button
                onClick={handleNext}
                disabled={!formData.description}
                className={`ml-auto bg-primary px-4 py-2 text-secondary rounded-full text-sm ${
                  !formData.description ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Next, Hourly rate
              </button>
            </div>
            <h3 className="mb-4 text-lg font-medium">
              Sell yourself to clients
            </h3>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Enter a description..."
              className="w-full h-40 p-4 rounded-lg border border-gray bg-input resize-none mb-4"
            />
          </div>
        );

      case 4:
        return (
          <div className="w-full">
            <div className="flex items-center mb-4">
              <CustomBackButton onClick={handleBack} label="Description" />
              <button
                onClick={handleNext}
                disabled={!formData.hourlyRate}
                className={`ml-auto bg-primary text-secondary px-4 py-2 rounded-full text-sm ${
                  !formData.hourlyRate ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Next, Add Images
              </button>
            </div>
            <h3 className="mb-4 text-lg font-medium">
              Set your hourly/token rate
            </h3>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                £
              </span>
              <input
                type="number"
                value={formData.hourlyRate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    hourlyRate: e.target.value,
                  }))
                }
                className="w-full p-3 pl-6 border border-gray bg-input rounded-lg bg-gray-50"
                step="0.01"
                min="0"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                /hr
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {formData.hourlyRate
                ? `${parseInt(formData.hourlyRate, 10)} Spark tokens`
                : "0 Spark tokens"}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="w-full">
            <div className="flex items-center mb-4">
              <CustomBackButton onClick={handleBack} label="Hourly Rate" />
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`ml-auto bg-primary text-secondary px-4 py-2 rounded-full text-sm ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Saving..." : "Complete"}
              </button>
            </div>
            <h3 className="mb-4 text-lg font-medium">Add skill images</h3>
            <div className="mt-4">
              <h4 className="text-lg font-medium mb-2">
                Upload Thumbnails (Max {MAX_FILES} images)
              </h4>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray rounded-lg"
              />
              {formData.thumbnails.length > 0 && (
                <div className="mt-2 text-sm text-gray-500">
                  Selected {formData.thumbnails.length} of {MAX_FILES} images
                </div>
              )}
              {renderImagePreviews()}
              {error && (
                <div className="mt-2 text-sm text-red-500">{error}</div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-4">{renderStep()}</div>
    </UserLayout>
  );
}
