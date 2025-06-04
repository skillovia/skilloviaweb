import React, { useState, useEffect } from "react";
import { ChevronLeft, Edit, Loader2, Star } from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import UserLayout from "../../../UserLayout/UserLayout";
import BackButton from "../../../../../componets/Back";

const SkillDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkillDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/skills/user/all`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch skills");
        }

        const data = await response.json();
        // const foundSkill = data.data.find(skill => skill.id === parseInt(id));
        // const foundSkill = data.data.find(
        //   (skill) => skill._id === parseInt(id)
        // );
        const foundSkill = data.data.find((skill) => skill._id === id);

        if (!foundSkill) {
          throw new Error("Skill not found");
        }

        setSkill(foundSkill);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSkillDetails();
    }
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/skills/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete skill");
        }

        navigate("/settings/skills");
      } catch (err) {
        alert("Error deleting skill: " + err.message);
      }
    }
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin w-12 h-12 text-secondary" />
        </div>
      </UserLayout>
    );
  }

  if (error || !skill) {
    return (
      <UserLayout>
        <div className="max-w-4xl mx-auto px-4 text-red-500">
          Error: {error || "Skill not found"}
        </div>
      </UserLayout>
    );
  }

  // Prepare thumbnails array from skill data
  const thumbnails = [
    skill.thumbnail01,
    skill.thumbnail02,
    skill.thumbnail03,
    skill.thumbnail04,
  ].filter(Boolean);

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <BackButton label={skill.skill_type} />
        </header>

        {/* Image Gallery */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {thumbnails.map((thumbnail, index) => (
            <div
              key={index}
              className="aspect-square rounded-lg overflow-hidden"
            >
              <img
                src={thumbnail}
                alt={`${skill.skill_type} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Service Info */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h2 className="font-medium">{skill.skill_type}</h2>
              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                {skill.approval_status}
              </span>
            </div>
            {/*} <Link to={`/settings/skills/edit/${skill.id}`}>*/}
            <Link to={`/settings/skills/edit/${skill._id}`}>
              <Edit className="w-4 h-4 text-gray-500" />
            </Link>
          </div>
          <div className="flex items-center gap-1 mb-2">
            <span className="text-sm text-gray-600">
              Experience level: {skill.experience_level}
            </span>
          </div>
          <p className="text-gray-600 mb-4">
            {skill.description || "No description provided"}
          </p>

          {/* Hourly Rate */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Hourly rate</h3>
            <p className="text-gray-600">
              £{skill.hourly_rate}
              {skill.spark_token && ` - ${skill.spark_token} spark tokens`}
            </p>
          </div>
        </div>

        {/* Reviews Section - Placeholder */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Reviews (0)</h2>
            <button className="text-secondary text-sm">See all</button>
          </div>
          <div className="text-center py-8 text-gray-500">No reviews yet</div>
        </div>
      </div>
    </UserLayout>
  );
};

export default SkillDetails;
