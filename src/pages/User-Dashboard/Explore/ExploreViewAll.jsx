import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, MapPin, UserX, Route, Eye } from "lucide-react";
import UserLayout from "../UserLayout/UserLayout";
import BackButton from "../../../componets/Back";

export default function ExploreAllCategories() {
  const [categories, setCategories] = useState([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      setIsCategoriesLoading(true);
      setCategoriesError("");

      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          throw new Error("Authentication required");
        }

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/admin/skills/get/published`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (data.status === "success") {
          setCategories(data.data || []);
        } else {
          throw new Error(data.message || "Failed to fetch categories");
        }
      } catch (err) {
        setCategoriesError(
          "Unable to load categories. Please try again later."
        );
      } finally {
        setIsCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <UserLayout>
      <div className="container mx-auto max-w-7xl md:px-4 py-8 min-h-screen">
        <span className="flex px-4">
          <BackButton label="All Skills Categories" />
          <h1 className="text-xl font-bold mb-6"></h1>
        </span>

        {isCategoriesLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
          </div>
        )}

        {categoriesError && (
          <div className="text-red-500 text-center py-8 bg-red-50 rounded-xl border border-red-200">
            <div className="flex flex-col items-center space-y-2">
              <UserX className="w-8 h-8 text-red-400" />
              <p className="font-medium">{categoriesError}</p>
            </div>
          </div>
        )}

        {!isCategoriesLoading && !categoriesError && (
          <div className="grid md:grid-cols-2 ">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="group flex transition-all border mx-6 rounded-xl my-4 p-2 items-center space-x-4 duration-300 hover:-translate-y-2 relative overflow-hidden "
                >
                  {/* Explore Image with BG */}
                  <div className="relative mb-3 flex-shrink-0">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden border-2 border-secondary">
                      <img
                        src={
                          category.thumbnail
                            ? category.thumbnail
                            : "https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg"
                        }
                        alt={category.title}
                        className="w-14 h-14 rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold capitalize">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-center ml-6">
                    <Link
                      to={`/explore-list?category=${encodeURIComponent(
                        category.title
                      )}&id=${category._id}`}
                      className="inline-flex items-center px-4 py-2 bg-secondary  text-white rounded-full font-medium shadow hover:bg-blue-700 transition group"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-gray-500 text-center py-12">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No categories available.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </UserLayout>
  );
}