import React, { useState, useEffect } from "react";
import { ChevronLeft, Plus, Edit, Star, Tag, Loader2 } from "lucide-react";
import UserLayout from "../../../UserLayout/UserLayout";
import BackButton from "../../../../../componets/Back";
import { Link } from "react-router-dom";
import { HiOutlineExternalLink } from "react-icons/hi";
import { IoBriefcaseOutline } from "react-icons/io5";
import EmptyState from "../../../../../componets/EmptyState";

const MySkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
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
        setSkills(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) {
    return (
      <UserLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin w-12 h-12 text-secondary" />
        </div>
      </UserLayout>
    );
  }

  if (error) {
    return (
      <UserLayout>
        <div className="max-w-4xl mx-auto px-4 text-red-500">
          Error: {error}
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <BackButton label="My Skills" />
          <Link
            to="/settings/skill/add"
            className="px-4 py-2 text-secondary bg-primary rounded-full flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add a skill
          </Link>
        </header>

        {/* Skills List */}
        {skills.map((skill) => (
          <div
            // key={skill.id}
            key={skill._id}
            className="mb-4 p-4 bg-input border border-gray rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h2 className="font-medium">{skill.skill_type}</h2>
              </div>
              {/*} <Link to={`/settings/skills/${skill.id}`}>*/}
              <Link to={`/settings/skills/${skill._id}`}>
                <span>
                  <HiOutlineExternalLink className="text-[1.5rem] text-secondary" />
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-1 mb-2">
              <span className="text-sm text-gray-600">
                Experience level: {skill.experience_level}
              </span>
            </div>

            <p className="text-gray-600 mb-4 text-[13px]">
              {skill.description || "No description provided"}
            </p>

            {/* Hourly Rate */}
            <div className="">
              <h3 className="text-sm font-medium mb-2">Hourly rate</h3>
              <p className="text-gray-600">
                £{skill.hourly_rate}
                {skill.spark_token && ` - ${skill.spark_token} spark tokens`}
              </p>
            </div>

            {/* Thumbnails */}
            {(skill.thumbnail01 ||
              skill.thumbnail02 ||
              skill.thumbnail03 ||
              skill.thumbnail04) && (
              <div className="mt-4 grid grid-cols-2 lg:flex gap-2 lg:flex-wrap">
                {[
                  skill.thumbnail01,
                  skill.thumbnail02,
                  skill.thumbnail03,
                  skill.thumbnail04,
                ]
                  .filter(Boolean)
                  .map((thumbnail, index) => (
                    <img
                      key={index}
                      src={thumbnail}
                      alt={`Skill thumbnail ${index + 1}`}
                      className="w-[10rem] h-[10rem] object-cover rounded-lg"
                    />
                  ))}
              </div>
            )}
          </div>
        ))}

        {skills.length === 0 && (
          <div className="min-h-[400px] flex items-center justify-center  rounded-lg shadow-sm">
            <EmptyState
              title="No Skills Added Yet"
              description="Start adding your professional skills to showcase your expertise."
              icon={() => (
                <IoBriefcaseOutline className="text-[4rem] text-text" />
              )}
            />
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default MySkillsPage;
