import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserLayout from "../UserLayout/UserLayout";
import Verify from "../Verify/Verify";
import { ChevronRight, Loader2, MapPin, Route, UserX } from "lucide-react";
import ExploreSkill from "./ExploreSkill"; // Import the new component
import { jwtDecode } from "jwt-decode";
const ExploreSection = () => {
  const [nearbyPeople, setNearbyPeople] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const [error, setError] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const [loading, setLoading] = useState(true);

  const [categoriesError, setCategoriesError] = useState("");
  // State for filters

  const [stateFilter, setStateFilter] = useState("london");
  const [distanceFilter, setDistanceFilter] = useState("all");
  // User's position from token
  const [userPosition, setUserPosition] = useState(null);
  // User ID from token
  const [userId, setUserId] = useState(null);
  console.log("profileData:", profileData);
  // UK Cities - Official List
  const states = [
    { value: "aberdeen", label: "Aberdeen" },
    { value: "leeds", label: "Leeds" },
    { value: "armagh", label: "Armagh" },
    { value: "bangor", label: "Bangor" },
    { value: "bath", label: "Bath" },
    { value: "belfast", label: "Belfast" },
    { value: "birmingham", label: "Birmingham" },
    { value: "bradford", label: "Bradford" },
    { value: "brighton-and-hove", label: "Brighton & Hove" },
    { value: "bristol", label: "Bristol" },
    { value: "cambridge", label: "Cambridge" },
    { value: "canterbury", label: "Canterbury" },
    { value: "cardiff", label: "Cardiff" },
    { value: "carlisle", label: "Carlisle" },
    { value: "chelmsford", label: "Chelmsford" },
    { value: "chester", label: "Chester" },
    { value: "chichester", label: "Chichester" },
    { value: "coventry", label: "Coventry" },
    { value: "derby", label: "Derby" },
    { value: "derry", label: "Derry" },
    { value: "dundee", label: "Dundee" },
    { value: "durham", label: "Durham" },
    { value: "edinburgh", label: "Edinburgh" },
    { value: "ely", label: "Ely" },
    { value: "exeter", label: "Exeter" },
    { value: "glasgow", label: "Glasgow" },
    { value: "gloucester", label: "Gloucester" },
    { value: "hereford", label: "Hereford" },
    { value: "kingston-upon-hull", label: "Kingston upon Hull" },
    { value: "inverness", label: "Inverness" },
    { value: "lancaster", label: "Lancaster" },
    { value: "leicester", label: "Leicester" },
    { value: "lichfield", label: "Lichfield" },
    { value: "lincoln", label: "Lincoln" },
    { value: "liverpool", label: "Liverpool" },
    { value: "london", label: "London" },
    { value: "winchester", label: "Winchester" },
    { value: "worcester", label: "Worcester" },
    { value: "york", label: "York" },
  ];

  const distances = [
    { value: "all", label: "All Distances" },
    { value: "8000", label: "0 - 5 miles" }, // 8 km
    { value: "16000", label: "6 - 10 miles" }, // 16 km
    { value: "32000", label: "11 - 20 miles" }, // 32 km
    { value: "64000", label: "20+ miles" }, // 64 km
  ];

  const FilterDropdown = ({ icon: Icon, label, value, options, onChange }) => (
    <div className="relative flex-1">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-gray-600" />
        <label className="text-sm text-gray-600">{label}</label>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-input border border-gray rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
  useEffect(() => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) throw new Error("Access token not found");

      const decodedToken = jwtDecode(accessToken);
      const user_id = decodedToken?.id;
      if (!user_id) throw new Error("User ID not found");

      setUserId(user_id);

      if (decodedToken?.lat && decodedToken?.lon) {
        const lat = parseFloat(decodedToken.lat);
        const lon = parseFloat(decodedToken.lon);

        if (!isNaN(lat) && !isNaN(lon)) {
          setUserPosition({
            latitude: lat,
            longitude: lon,
          });
        }
      }
    } catch (err) {
      console.error("Token decode error:", err.message);
    }
  }, []);

  // useEffect(() => {
  //   try {
  //     const accessToken = localStorage.getItem("accessToken");

  //     if (!accessToken) {
  //       throw new Error("❌ Access token not found in localStorage");
  //     }

  //     const decodedToken = jwtDecode(accessToken); // ✅ Decode the token
  //     const user_id = decodedToken?.id;
  //     if (!user_id) {
  //       throw new Error("❌ User ID not found in token");
  //     }

  //     setUserId(user_id);

  //     // Check if lat and lon are available in the token
  //     if (decodedToken?.lat && decodedToken?.lon) {
  //       const lat = parseFloat(decodedToken.lat);
  //       const lon = parseFloat(decodedToken.lon);

  //       if (!isNaN(lat) && !isNaN(lon)) {
  //         setUserPosition({
  //           latitude: lat,
  //           longitude: lon,
  //         });
  //       }
  //     }
  //   } catch (err) {
  //     // ignore
  //   }
  // }, []);
  // const fetchProfile = async () => {
  //   try {
  //     const accessToken = localStorage.getItem("accessToken");
  //     if (!accessToken) throw new Error("Access token not found");

  //     const decodedToken = jwtDecode(accessToken);
  //     const user_id = decodedToken?.id;
  //     if (!user_id) throw new Error("User ID not found");

  //     const response = await fetch(
  //       `${import.meta.env.VITE_BASE_URL}/users/profile/${user_id}`,

  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );

  //     if (!response.ok) throw new Error("Failed to fetch profile");

  //     const result = await response.json();
  //     setProfileData({
  //       ...result.data,
  //       // photourl: ensureHttps(result.data.photourl),
  //     });
  //   } catch (err) {
  //     console.error("Error fetching profile:", err.message);
  //     setError(err.message);
  //   } finally {
  //     setProfileLoading(false);
  //   }
  // };

  // // Now call it in useEffect
  // useEffect(() => {
  //   fetchProfile();
  // }, []);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Access token not found");

        const decodedToken = jwtDecode(accessToken);
        const user_id = decodedToken?.id;
        if (!user_id) throw new Error("User ID not found");

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/users/profile/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch profile");

        const result = await response.json();
        setProfileData({
          ...result.data,
          // photourl: ensureHttps(result.data.photourl),
        });

        // Try to get user's geolocation
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const coords = {
              lat: pos.coords.latitude,
              lon: pos.coords.longitude,
            };
            setUserPosition(coords);
          },
          (error) => {
            console.warn("⚠️ Geolocation failed:", error.message);

            // Fallback to profile location if available
            if (result.data?.location?.lat && result.data?.location?.lon) {
              setUserPosition({
                lat: result.data.location.lat,
                lon: result.data.location.lon,
              });
            } else {
              console.error("❌ No valid fallback coordinates in profile.");
            }
          }
        );
      } catch (err) {
        console.error("Error fetching profile:", err.message);
        setError(err.message);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      if (profileLoading || userPosition) return;

      console.log("📍 Attempting to get user location...");

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("📍 Geolocation successful:", position.coords);
            setUserPosition({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.warn("⚠️ Geolocation failed:", error.message);

            if (profileData?.lat && profileData?.lon) {
              console.log("📦 Fallback to profile lat/lon:", {
                lat: profileData.lat,
                lon: profileData.lon,
              });
              setUserPosition({
                latitude: parseFloat(profileData.lat),
                longitude: parseFloat(profileData.lon),
              });
            } else if (
              profileData?.location?.coordinates &&
              Array.isArray(profileData.location.coordinates) &&
              profileData.location.coordinates.length === 2
            ) {
              // 🚨 Fix here: extract $numberDouble values
              const rawCoords = profileData.location.coordinates;
              const lon =
                typeof rawCoords[0] === "object"
                  ? parseFloat(rawCoords[0]["$numberDouble"])
                  : parseFloat(rawCoords[0]);
              const lat =
                typeof rawCoords[1] === "object"
                  ? parseFloat(rawCoords[1]["$numberDouble"])
                  : parseFloat(rawCoords[1]);

              console.log("📦 Fallback to profile location.coordinates:", {
                lat,
                lon,
              });

              setUserPosition({
                latitude: lat,
                longitude: lon,
              });
            } else {
              console.error("❌ No valid fallback coordinates in profile.");
            }
          }
        );
      } else {
        console.warn("🧭 Geolocation not supported by browser.");

        // Fallback logic repeated here (for browsers without geolocation)
        if (profileData?.lat && profileData?.lon) {
          console.log("📦 Fallback to profile lat/lon:", {
            lat: profileData.lat,
            lon: profileData.lon,
          });
          setUserPosition({
            latitude: parseFloat(profileData.lat),
            longitude: parseFloat(profileData.lon),
          });
        } else if (
          profileData?.location?.coordinates &&
          Array.isArray(profileData.location.coordinates) &&
          profileData.location.coordinates.length === 2
        ) {
          const rawCoords = profileData.location.coordinates;
          const lon =
            typeof rawCoords[0] === "object"
              ? parseFloat(rawCoords[0]["$numberDouble"])
              : parseFloat(rawCoords[0]);
          const lat =
            typeof rawCoords[1] === "object"
              ? parseFloat(rawCoords[1]["$numberDouble"])
              : parseFloat(rawCoords[1]);

          console.log("📦 Fallback to profile location.coordinates:", {
            lat,
            lon,
          });

          setUserPosition({
            latitude: lat,
            longitude: lon,
          });
        } else {
          console.error("❌ No valid fallback coordinates in profile.");
        }
      }
    };

    fetchLocation();
  }, [profileLoading, profileData, userPosition]);

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

  // useEffect(() => {
  //   const fetchPeople = async () => {
  //     // Don't fetch if we don't have position data yet
  //     if (!userPosition) {
  //       return;
  //     }

  //     setIsLoading(true);
  //     setError("");

  //     try {
  //       const accessToken = localStorage.getItem("accessToken");

  //       if (!accessToken) {
  //         throw new Error("Authentication required");
  //       }

  //       let url;

  //       if (distanceFilter === "all") {
  //         // Use a very large radius (1,000,000 meters) and apply state filter
  //         url = `${import.meta.env.VITE_BASE_URL}/users/people/nearby/${
  //           userPosition.latitude
  //         }/${userPosition.longitude}/1000000?state=${stateFilter}`;
  //       } else {
  //         // If distance filter is active, use the /nearby endpoint with coordinates and distance
  //         //   url = `${import.meta.env.VITE_BASE_URL}/users/people/nearby/${
  //         //     userPosition.latitude
  //         //   }/${userPosition.longitude}/${distanceFilter}`;
  //         // }
  //         url = `${import.meta.env.VITE_BASE_URL}/users/people/nearby/${
  //           userPosition.latitude
  //         }/${userPosition.longitude}/${distanceFilter}?state=${stateFilter}`;
  //       }
  //       const response = await fetch(url, {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       const data = await response.json();

  //       if (data.status === "success") {
  //         // Ensure we set an empty array if data.data is null or undefined
  //         setNearbyPeople(data.data || []);
  //       } else {
  //         throw new Error(data.message || "Failed to fetch people");
  //       }
  //     } catch (err) {
  //       setError("Unable to load people. Please try again later.");
  //       // Set to empty array when there's an error
  //       setNearbyPeople([]);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchPeople();
  // }, [stateFilter, distanceFilter, userPosition]); // Re-fetch when filters or position change

  console.log("📍 Distance Filter:", distanceFilter);
  console.log("📍 State Filter:", stateFilter);
  console.log("📍 User Position:", userPosition);

  // if (distanceFilter !== "all") {
  //   console.log("✅ Calling nearby API with URL:", url);
  // }

  useEffect(() => {
    const fetchPeople = async () => {
      if (!userPosition) {
        console.log("⏳ Waiting for user position...");
        return;
      }
      setIsLoading(true);
      setError("");

      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          throw new Error("Authentication required");
        }

        let url;

        // if (distanceFilter === "all") {
        //   // ✅ Use the /within/:address endpoint based on selected city (stateFilter)
        //   url = `${
        //     import.meta.env.VITE_BASE_URL
        //   }/users/people/within/${stateFilter}`;
        // } else {
        //   // ✅ Use the /nearby/:lat/:lon/:radius?state=city endpoint
        //   // Make sure we have userPosition
        //   if (!userPosition) {
        //     return;
        //   }

        //   //   url = `${import.meta.env.VITE_BASE_URL}/users/people/nearby/${
        //   //     userPosition.latitude
        //   //   }/${userPosition.longitude}/${distanceFilter}?state=${stateFilter}`;
        //   // }
        //   url = `${import.meta.env.VITE_BASE_URL}/users/people/nearby/${
        //     userPosition.longitude
        //   }/${userPosition.latitude}/${distanceFilter}?state=${stateFilter}`;
        // }

        if (distanceFilter === "all") {
          url = `${
            import.meta.env.VITE_BASE_URL
          }/users/people/within/${stateFilter}`;
          console.log("🌍 Fetching with city-only filter:", url);
        } else {
          if (!userPosition) {
            console.warn("⚠️ User position is not yet available.");
            return;
          }

          // url = `${import.meta.env.VITE_BASE_URL}/users/people/nearby/${
          //   userPosition.longitude
          // }/${userPosition.latitude}/${distanceFilter}?state=${stateFilter}`;
          // url = `${import.meta.env.VITE_BASE_URL}/users/people/nearby/${
          //   userPosition.latitude
          // }/${userPosition.longitude}/${distanceFilter}?state=${stateFilter}`;
          url = `${import.meta.env.VITE_BASE_URL}/users/people/nearby/${
            userPosition.lat
          }/${userPosition.lon}/${distanceFilter}?state=${stateFilter}`;

          console.log("📡 Fetching nearby people:", url);
        }

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.status === "success") {
          setNearbyPeople(data.data || []);
        } else {
          throw new Error(data.message || "Failed to fetch people");
        }
      } catch (err) {
        setError("Unable to load people. Please try again later.");
        setNearbyPeople([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, [stateFilter, distanceFilter, userPosition]);

  // If we're still waiting for user position, show loading
  if (profileLoading || !userPosition) {
    return (
      <UserLayout>
        <Verify />
        <div className="max-w-4xl mx-auto px-4 rounded-lg">
          <div className="flex justify-center items-center py-16">
            <Loader2 className="animate-spin w-8 h-8 text-gray-500 mr-2" />
            <p>
              {profileLoading
                ? "Loading your profile..."
                : "Loading your location data..."}
            </p>
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <Verify />
      <div className="max-w-4xl mx-auto px-4 rounded-lg">
        <ExploreSkill
          categories={categories}
          isCategoriesLoading={isCategoriesLoading}
          categoriesError={categoriesError}
        />

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">People nearby</h2>
          </div>
          <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
            <div className="flex gap-4">
              <FilterDropdown
                icon={MapPin}
                label="City"
                value={stateFilter}
                options={states}
                onChange={(value) => {
                  setStateFilter(value);
                  // Reset distance filter when state changes
                  setDistanceFilter("all");
                }}
              />
              <FilterDropdown
                icon={Route}
                label="Distance"
                value={distanceFilter}
                options={distances}
                onChange={(value) => {
                  setDistanceFilter(value);
                }}
              />
            </div>
          </div>
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
            </div>
          )}

          {error && (
            <div className="text-red-500 text-center py-4">{error}</div>
          )}

          {!isLoading && !error && nearbyPeople.length === 0 && (
            <div className="flex flex-col items-center justify-center text-gray-500 text-center py-8">
              <UserX className="w-12 h-12 mb-2 text-gray-400" />
              <p>
                {distanceFilter === "all"
                  ? `No people found in ${
                      states.find((s) => s.value === stateFilter)?.label
                    }.`
                  : `No people found within ${
                      distances.find((d) => d.value === distanceFilter)?.label
                    }.`}
              </p>
              <p className="text-sm mt-2">Try selecting different filters.</p>
            </div>
          )}

          {!isLoading && !error && nearbyPeople.length > 0 && (
            <div className="flex gap-8 overflow-x-auto pb-4">
              {nearbyPeople.map((person) => (
                <Link
                  key={person.i_d}
                  to={`/user-profile/${person._id}`}
                  className="flex flex-col items-center flex-shrink-0 hover:opacity-90 transition-opacity"
                >
                  <div className="w-24 h-24 mb-2 overflow-hidden rounded-full">
                    <img
                      src={
                        person.photourl
                          ? `${person.photourl}`
                          : "https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg"
                      }
                      alt={person.firstname}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-center flex space-x-2 text-gray-800 whitespace-nowrap">
                    <span>{person.firstname}</span>
                    <span>{person.lastname}</span>
                  </p>
                  {person.distance !== undefined && (
                    <p className="text-xs text-gray-500 mt-1">
                      {person.distance === 0
                        ? "Less than 1 km"
                        : `${person.distance.toFixed(1)} km away`}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default ExploreSection;
