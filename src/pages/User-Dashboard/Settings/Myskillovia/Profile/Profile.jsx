import React, { useState, useEffect, useRef } from "react";
import { Check, Loader2 } from "lucide-react";
import UserLayout from "../../../UserLayout/UserLayout";
import BackButton from "../../../../../componets/Back";
import ProfilePhotoUpload from "./ProfileUpload";
import { jwtDecode } from "jwt-decode";

const ensureHttps = (url) => {
  if (!url) return null;
  return url.startsWith("http") ? url : `https://${url}`;
};
// const Profile = ({ photoPreview, setPhotoPreview, setSelectedFile }) => {
const Profile = () => {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    expertVisibility: true,
    firstName: "",
    lastName: "",
    email: "",
    website: "",
    city: "",
    streetAddress: "",
    zipCode: "",
    openingTime: "00:00",
    closingTime: "00:00",
    weekendsInclusive: false,
    gender: "",
    password: "",
    confirmPassword: "", // Added confirmPassword
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [confirmError, setConfirmError] = useState(""); // For confirm password validation

  // Refs for Google Places Autocomplete
  const cityInputRef = useRef(null);
  const streetInputRef = useRef(null);
  const zipInputRef = useRef(null);

  // Track if Google Maps API is loaded
  const [placesApiLoaded, setPlacesApiLoaded] = useState(false);
  const [placesApiLoading, setPlacesApiLoading] = useState(false);

  // Store autocomplete instances
  const autocompleteInstancesRef = useRef({
    city: null,
    street: null,
  });

  const accessToken = localStorage.getItem("accessToken");
  const userId = accessToken ? jwtDecode(accessToken).id : null;

  // Load Google Maps API - use environment variable for API key
  useEffect(() => {
    if (!window.google && !placesApiLoading) {
      setPlacesApiLoading(true);

      // Get API key from environment variable
      const apiKey = "AIzaSyChFAjrSODzkkKl_TaCCslNXdHwIWR-_uw";

      if (!apiKey) {
        setApiError(
          "Google Maps API key is missing. Please check your environment variables."
        );
        setPlacesApiLoading(false);
        return;
      }

      const googleMapScript = document.createElement("script");
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      googleMapScript.async = true;
      googleMapScript.defer = true;

      googleMapScript.onload = () => {
        setPlacesApiLoaded(true);
        setPlacesApiLoading(false);
      };

      googleMapScript.onerror = () => {
        setApiError(
          "Failed to load Google Maps API. Please check your internet connection and API key."
        );
        setPlacesApiLoading(false);
      };

      document.body.appendChild(googleMapScript);

      return () => {
        if (document.body.contains(googleMapScript)) {
          document.body.removeChild(googleMapScript);
        }
      };
    } else if (window.google) {
      setPlacesApiLoaded(true);
    }
  }, []);

  // Helper function to extract components from place object
  const extractAddressComponents = (place, componentType) => {
    if (!place.address_components) return null;
    const component = place.address_components.find((comp) =>
      comp.types.includes(componentType)
    );
    return component ? component.long_name : null;
  };

  // Initialize city autocomplete
  const initCityAutocomplete = () => {
    if (!window.google || !cityInputRef.current) return;

    try {
      // Clean up previous instance if it exists
      if (autocompleteInstancesRef.current.city) {
        google.maps.event.clearInstanceListeners(
          autocompleteInstancesRef.current.city
        );
      }

      const cityAutocomplete = new window.google.maps.places.Autocomplete(
        cityInputRef.current,
        {
          types: ["(cities)"],
        }
      );

      autocompleteInstancesRef.current.city = cityAutocomplete;

      cityAutocomplete.addListener("place_changed", () => {
        const place = cityAutocomplete.getPlace();

        if (!place.geometry) {
          setApiError("No details available for this location");
          return;
        }

        const cityName =
          extractAddressComponents(place, "locality") ||
          extractAddressComponents(place, "administrative_area_level_1") ||
          place.name;
        // Try to extract postal code from city autocomplete (unreliable, but in case)
        const postalCode = extractAddressComponents(place, "postal_code");

        setFormData((prev) => ({
          ...prev,
          city: cityName || "",
          zipCode: postalCode || prev.zipCode, // Only update if available
        }));

        setApiError("");
      });
    } catch (err) {
      console.error("Error initializing city autocomplete:", err);
      setApiError("Error initializing location search");
    }
  };

  // Initialize street address autocomplete
  const initStreetAutocomplete = () => {
    if (!window.google || !streetInputRef.current) return;

    try {
      // Clean up previous instance if it exists
      if (autocompleteInstancesRef.current.street) {
        google.maps.event.clearInstanceListeners(
          autocompleteInstancesRef.current.street
        );
      }

      const addressAutocomplete = new window.google.maps.places.Autocomplete(
        streetInputRef.current,
        {
          types: ["address"],
        }
      );

      autocompleteInstancesRef.current.street = addressAutocomplete;

      addressAutocomplete.addListener("place_changed", () => {
        const place = addressAutocomplete.getPlace();

        if (!place.geometry) {
          setApiError("No details available for this address");
          return;
        }

        // Option 1: Use the formatted_address directly if available
        if (place.formatted_address) {
          const addressParts = place.formatted_address.split(",");
          const streetPart = addressParts[0];
          setFormData((prev) => ({
            ...prev,
            streetAddress: streetPart,
          }));
        } else {
          // Option 2: Extract and combine components
          const streetNumber = extractAddressComponents(place, "street_number");
          const streetName = extractAddressComponents(place, "route");
          const subpremise = extractAddressComponents(place, "subpremise");

          let fullStreetAddress = "";
          if (streetNumber) fullStreetAddress += streetNumber;
          if (streetName)
            fullStreetAddress += (fullStreetAddress ? " " : "") + streetName;
          if (subpremise)
            fullStreetAddress += (fullStreetAddress ? ", " : "") + subpremise;

          if (fullStreetAddress) {
            setFormData((prev) => ({
              ...prev,
              streetAddress: fullStreetAddress,
            }));
          }
        }

        const postalCode = extractAddressComponents(place, "postal_code");
        const city =
          extractAddressComponents(place, "locality") ||
          extractAddressComponents(place, "sublocality") ||
          extractAddressComponents(place, "administrative_area_level_1");

        setFormData((prev) => {
          const updates = {};
          if (postalCode) {
            updates.zipCode = postalCode;
          }
          if (city) {
            updates.city = city;
          }
          return { ...prev, ...updates };
        });

        setApiError("");
      });
    } catch (err) {
      console.error("Error initializing street autocomplete:", err);
      setApiError("Error initializing address search");
    }
  };

  // Initialize autocomplete after API loads
  useEffect(() => {
    if (placesApiLoaded) {
      initCityAutocomplete();
      initStreetAutocomplete();
    }
  }, [placesApiLoaded]);

  // Re-initialize autocomplete if inputs are recreated
  useEffect(() => {
    if (placesApiLoaded && cityInputRef.current) {
      initCityAutocomplete();
    }
  }, [cityInputRef.current, placesApiLoaded]);

  useEffect(() => {
    if (placesApiLoaded && streetInputRef.current) {
      initStreetAutocomplete();
    }
  }, [streetInputRef.current, placesApiLoaded]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/users/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "success") {
          setFormData((prev) => ({
            ...prev,
            firstName: data.data.firstname || "",
            lastName: data.data.lastname || "",
            email: data.data.email || "",
            website: data.data.website || "",
            city: data.data.location || "",
            streetAddress: data.data.street || "",
            zipCode: data.data.zip_code || "",
            gender: data.data.gender || "",
            // password and confirmPassword stay blank
          }));
        } else {
          setError(data.message || "Failed to load profile data");
        }
      } catch (err) {
        setError("Failed to load profile data");
        console.error("Error loading profile:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  // Handle input changes, including confirm password logic
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Password confirmation validation
    if (
      name === "confirmPassword" ||
      (name === "password" && formData.confirmPassword)
    ) {
      const checkValue =
        name === "confirmPassword" ? value : formData.confirmPassword;
      if (checkValue !== (name === "password" ? value : formData.password)) {
        setConfirmError("Passwords do not match");
      } else {
        setConfirmError("");
      }
    }
  };

  const handleToggle = (name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // const handleSubmit = async () => {
  //   if (!userId) {
  //     setError("User ID not found");
  //     return;
  //   }

  //   // Prevent submit if passwords don't match
  //   if (
  //     formData.password &&
  //     formData.confirmPassword &&
  //     formData.password !== formData.confirmPassword
  //   ) {
  //     setConfirmError("Passwords do not match");
  //     setError("Please make sure the passwords match.");
  //     return;
  //   }

  //   setIsSaving(true);
  //   setError("");
  //   setConfirmError("");

  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_BASE_URL}/users/update/${userId}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //         },
  //         body: JSON.stringify({
  //           email: formData.email,
  //           firstname: formData.firstName,
  //           lastname: formData.lastName,
  //           gender: formData.gender,
  //           password: formData.password,
  //           location: formData.city,
  //           street: formData.streetAddress,
  //           zip_code: formData.zipCode,
  //           website: formData.website,
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`HTTP error ${response.status}`);
  //     }

  //     const data = await response.json();
  //     if (data.status === "success") {
  //       console.log("Profile updated successfully");
  //     } else {
  //       setError(data.message || "Failed to update profile");
  //     }
  //   } catch (err) {
  //     setError("Something went wrong while updating profile");
  //     console.error("Error updating profile:", err);
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };

  // Custom Toggle Switch Component

  const handleSubmit = async () => {
    if (!userId) {
      setError("User ID not found");
      return;
    }

    // Validate passwords match
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      setConfirmError("Passwords do not match");
      setError("Please make sure the passwords match.");
      return;
    }

    setIsSaving(true);
    setError("");
    setConfirmError("");

    try {
      // 1. Upload profile photo if a new one was selected
      if (selectedFile) {
        const formDataPhoto = new FormData();
        formDataPhoto.append("photo", selectedFile);

        const photoResponse = await fetch(
          `${import.meta.env.VITE_BASE_URL}/users/profile/upload`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: formDataPhoto,
          }
        );

        const photoData = await photoResponse.json();
        if (photoData.status === "success") {
          // Update preview and localStorage
          const photoUrl = ensureHttps(photoData.data.photo);
          setPhotoPreview(photoUrl);

          const currentProfile = JSON.parse(
            localStorage.getItem("userProfile") || "{}"
          );
          const updatedProfile = {
            ...currentProfile,
            photourl: photoData.data.photo,
          };
          localStorage.setItem("userProfile", JSON.stringify(updatedProfile));

          window.dispatchEvent(new Event("profileUpdated"));
        } else {
          setError("Failed to upload profile photo.");
          return;
        }
      }

      // 2. Update the rest of the profile fields
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/users/update/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            email: formData.email,
            firstname: formData.firstName,
            lastname: formData.lastName,
            gender: formData.gender,
            password: formData.password,
            location: formData.city,
            street: formData.streetAddress,
            zip_code: formData.zipCode,
            website: formData.website,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      if (data.status === "success") {
        console.log("Profile updated successfully");
        // You can show a success message or toast here
      } else {
        setError(data.message || "Failed to update profile");
      }
    } catch (err) {
      setError("Something went wrong while updating profile");
      console.error("Error updating profile:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const Toggle = ({ checked, onChange }) => {
    return (
      <button
        onClick={onChange}
        type="button"
        className={`relative w-11 h-6 rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-gray-500"
        }`}
      >
        <div
          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-secondary transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    );
  };

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto lg:p-6 px-3">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin w-12 h-12 text-secondary" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <BackButton label="Edit profile" />
              </div>
              <button
                onClick={handleSubmit}
                disabled={isSaving}
                className="bg-primary text-secondary font-semibold px-4 py-2 rounded-full hover:bg-green-500 transition-colors flex items-center space-x-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" />
                    <span>Saving...</span>
                  </>
                ) : (
                  "Save changes"
                )}
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
                {error}
              </div>
            )}

            {apiError && (
              <div className="mb-4 p-3 bg-yellow-50 text-yellow-600 rounded-md">
                {apiError}
              </div>
            )}

            <div className="mb-8">
              <ProfilePhotoUpload
                photoPreview={photoPreview}
                setPhotoPreview={setPhotoPreview}
                setSelectedFile={setSelectedFile}
              />
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-medium mb-1">Expert visibility</h3>
                  <p className="text-sm text-gray-500">
                    Make yourself visible to clients
                  </p>
                </div>
                <Toggle
                  checked={formData.expertVisibility}
                  onChange={() => handleToggle("expertVisibility")}
                />
              </div>

              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <h3 className="font-medium">Personal details</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                      placeholder="Enter your first name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                      placeholder="Enter your last name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Website link
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                      placeholder="Enter your website"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                      placeholder="Confirm new password"
                    />
                    {formData.confirmPassword && confirmError && (
                      <p className="text-xs text-red-500 mt-1">
                        {confirmError}
                      </p>
                    )}
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Location details</h3>
                    {!placesApiLoaded && placesApiLoading && (
                      <div className="mb-4 flex items-center text-sm text-gray-500">
                        <Loader2 className="animate-spin w-4 h-4 mr-2" />
                        Loading location services...
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          ref={cityInputRef}
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                          placeholder="Your city"
                          autoComplete="off"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Start typing and select your address from the list to
                          auto-fill your ZIP code.
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Street address
                        </label>
                        <input
                          type="text"
                          name="streetAddress"
                          ref={streetInputRef}
                          value={formData.streetAddress}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                          placeholder="St. Address"
                          autoComplete="off"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Start typing and select your address from the list to
                          auto-fill your ZIP code.
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          ZIP/Postal Code
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          ref={zipInputRef}
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                          placeholder="ZIP code"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </UserLayout>
  );
};

export default Profile;
