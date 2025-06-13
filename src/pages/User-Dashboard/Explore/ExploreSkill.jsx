import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Loader2, MapPin, Route, UserX } from "lucide-react";

function shuffleArray(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function ExploreSkill({
  categories,
  isCategoriesLoading,
  categoriesError,
}) {
  const randomCategories = categories
    ? shuffleArray(categories).slice(0, 4)
    : [];

  return (
    <div className="md:mb-6 relative">
      {/* Background gradient decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 rounded-3xl -z-10"></div>

      <div className="flex justify-between items-center mb-3 relative z-10">
        <div className="flex items-center space-x-2">
          <h2 className="text-[15px] font-bold">Explore Skills</h2>
        </div>
        <Link
          to="/explore-all"
          className="group flex items-center px-4 py-2 text-sm font-medium text-secondary  duration-300 "
        >
          View all
          <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {isCategoriesLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="relative">
            <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
            <div className="absolute inset-0 w-10 h-10 rounded-full bg-blue-100 animate-ping opacity-20"></div>
          </div>
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
        <>
          {/* Mobile: Horizontal scroll */}
          <div className="md:hidden">
            <div className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4 px-1">
              {randomCategories.length > 0 ? (
                randomCategories.map((category, index) => (
                  <Link
                    key={category.id}
                    to={`/explore-list?category=${encodeURIComponent(
                      category.title
                    )}&id=${category._id}`}
                    className="group cursor-pointer flex-shrink-0 w-48 flex flex-col transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: `linear-gradient(135deg, ${
                        ["#667eea", "#764ba2", "#f093fb", "#f5576c"][index % 4]
                      }10, white)`,
                    }}
                  >
                    <div className="relative w-full h-32 mb-4 overflow-hidden rounded-xl border-2 border-secondary p-2">
                      <img
                        src={
                          category.thumbnail
                            ? category.thumbnail
                            : "https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg"
                        }
                        alt={category.title}
                        className="w-full h-full object-cover rounded-xl border transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Gradient overlay on lower half */}
                      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                      {/* Title on top of overlay */}
                      <div className="absolute bottom-2 left-3 right-3 z-20">
                        <h3 className="text-base font-bold capitalize text-white drop-shadow-md">
                          {category.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="w-full text-gray-500 text-center py-8">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p>No categories available.</p>
                </div>
              )}
            </div>
          </div>

          {/* Desktop: Grid layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 ">
            {randomCategories.length > 0 ? (
              randomCategories.map((category, index) => (
                <Link
                  key={category.id}
                  to={`/explore-list?category=${encodeURIComponent(
                    category.title
                  )}&id=${category._id}`}
                  className="group cursor-pointer flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
                >
                  <div className="relative w-full h-40 mb-3 overflow-hidden rounded-xl border-4 border-secondary p-2">
                    <img
                      src={
                        category.thumbnail
                          ? category.thumbnail
                          : "https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg"
                      }
                      alt={category.title}
                      className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/70 to-transparent z-10"></div>

                    <div className="absolute bottom-3 left-4 right-4 z-20">
                      <h3 className="text-lg font-bold text-white drop-shadow-md capitalize">
                        {category.title}
                      </h3>
                      <h3 className="text-base font-bold capitalize text-white drop-shadow-md">
                        {category.description}
                      </h3>
                      {/* <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed ">
                      {category.description}
                    </p> */}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-gray-500 text-center py-12">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No categories available.</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
