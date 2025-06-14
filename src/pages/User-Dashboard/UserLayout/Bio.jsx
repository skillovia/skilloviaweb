import React, { useState, useEffect, useRef } from "react";
import { Pencil, Check, X, Loader, MapPin } from "lucide-react";

const EditableProfile = ({
  initialBio,
  location = {},
  street,
  zip_code,
  lon,
  lat,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [geocodeError, setGeocodeError] = useState(null);
  const [formData, setFormData] = useState({
    bio: initialBio || "",
    locationName: "",
    street: street || "",
    zip_code: zip_code || "",
    lon: lon || null,
    lat: lat || null,
  });

  const locationInputRef = useRef(null);
  const streetInputRef = useRef(null);

  // Track if Google Maps API is loaded
  const [placesApiLoaded, setPlacesApiLoaded] = useState(false);
  const [placesApiLoading, setPlacesApiLoading] = useState(false);

  const autocompleteInstancesRef = useRef({
    location: null,
    street: null,
  });

  useEffect(() => {
    if (!window.google && !placesApiLoading && isEditing) {
      setPlacesApiLoading(true);
      const apiKey = "AIzaSyChFAjrSODzkkKl_TaCCslNXdHwIWR-_uw";
      if (!apiKey) {
        setGeocodeError("Google Maps API key is missing.");
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
        setGeocodeError("Failed to load Google Maps API. Please check your internet connection and API key.");
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
  }, [isEditing]);

  const extractAddressComponents = (place, componentType) => {
    if (!place.address_components) return null;
    const component = place.address_components.find((comp) =>
      comp.types.includes(componentType)
    );
    return component ? component.long_name : null;
  };

  const initLocationAutocomplete = () => {
    if (!window.google || !locationInputRef.current) return;
    try {
      if (autocompleteInstancesRef.current.location) {
        google.maps.event.clearInstanceListeners(autocompleteInstancesRef.current.location);
      }
      const locationAutocomplete = new window.google.maps.places.Autocomplete(
        locationInputRef.current,
        { types: ["(cities)"] }
      );
      autocompleteInstancesRef.current.location = locationAutocomplete;
      locationAutocomplete.addListener("place_changed", () => {
        const place = locationAutocomplete.getPlace();
        if (!place.geometry) {
          setGeocodeError("No details available for this location");
          return;
        }
        const cityName =
          extractAddressComponents(place, "locality") ||
          extractAddressComponents(place, "administrative_area_level_1") ||
          place.name;
        setFormData((prev) => ({
          ...prev,
          locationName: cityName || "",
        }));
        setGeocodeError("");
      });
    } catch (err) {
      console.error("Error initializing location autocomplete:", err);
      setGeocodeError("Error initializing location search");
    }
  };

  const initStreetAutocomplete = () => {
    if (!window.google || !streetInputRef.current) return;
    try {
      if (autocompleteInstancesRef.current.street) {
        google.maps.event.clearInstanceListeners(autocompleteInstancesRef.current.street);
      }
      const addressAutocomplete = new window.google.maps.places.Autocomplete(
        streetInputRef.current,
        { types: ["address"] }
      );
      autocompleteInstancesRef.current.street = addressAutocomplete;
      addressAutocomplete.addListener("place_changed", () => {
        const place = addressAutocomplete.getPlace();
        if (!place.geometry) {
          setGeocodeError("No details available for this address");
          return;
        }
        if (place.formatted_address) {
          const addressParts = place.formatted_address.split(",");
          const streetPart = addressParts[0];
          setFormData((prev) => ({
            ...prev,
            street: streetPart,
          }));
        } else {
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
              street: fullStreetAddress,
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
          if (postalCode) updates.zip_code = postalCode;
          if (city) updates.locationName = city;
          if (place.geometry && place.geometry.location) {
            updates.lon = place.geometry.location.lng();
            updates.lat = place.geometry.location.lat();
          }
          return { ...prev, ...updates };
        });
        setGeocodeError("");
      });
    } catch (err) {
      console.error("Error initializing street autocomplete:", err);
      setGeocodeError("Error initializing address search");
    }
  };

  useEffect(() => {
    if (placesApiLoaded && isEditing) {
      initLocationAutocomplete();
      initStreetAutocomplete();
    }
  }, [placesApiLoaded, isEditing]);

  useEffect(() => {
    if (placesApiLoaded && locationInputRef.current && isEditing) {
      initLocationAutocomplete();
    }
  }, [locationInputRef.current, placesApiLoaded, isEditing]);

  useEffect(() => {
    if (placesApiLoaded && streetInputRef.current && isEditing) {
      initStreetAutocomplete();
    }
  }, [streetInputRef.current, placesApiLoaded, isEditing]);

  useEffect(() => {
    const geocodeAddress = async () => {
      if (
        formData.street &&
        formData.locationName &&
        formData.zip_code &&
        (!formData.lon || !formData.lat)
      ) {
        try {
          const apiKey = "AIzaSyChFAjrSODzkkKl_TaCCslNXdHwIWR-_uw";
          const address = `${formData.street}, ${formData.locationName}, ${formData.zip_code}`;
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              address
            )}&key=${apiKey}`
          );
          const data = await response.json();
          if (data.status === "OK" && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            setFormData((prev) => ({
              ...prev,
              lon: lng,
              lat,
              formatted_address: data.results[0].formatted_address,
            }));
            setGeocodeError(null);
          } else {
            setGeocodeError("Could not find coordinates for this address");
            setFormData((prev) => ({
              ...prev,
              lon: null,
              lat: null,
              formatted_address: null,
            }));
          }
        } catch (error) {
          console.error("Geocoding error:", error);
          setGeocodeError("Failed to geocode address");
          setFormData((prev) => ({
            ...prev,
            lon: null,
            lat: null,
            formatted_address: null,
          }));
        }
      }
    };
    if (isEditing) {
      geocodeAddress();
    }
  }, [formData.street, formData.locationName, formData.zip_code, isEditing]);

  // -----> MODIFIED handleUpdate to update localStorage after success
  const handleUpdate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const { lon, lat, ...otherFormData } = formData;
      const payload = {
        ...otherFormData,
        lon,
        lat,
      };
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/users/profile/update/bio`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to update profile");
      }
      // --- UPDATE LOCAL STORAGE with new bio/location ---
      const currentProfile = JSON.parse(localStorage.getItem("userProfile") || "{}");
      const updatedProfile = {
        ...currentProfile,
        bio: formData.bio,
        locationName: formData.locationName,
        street: formData.street,
        zip_code: formData.zip_code,
        lon: formData.lon,
        lat: formData.lat,
      };
      localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
      window.dispatchEvent(new Event("profileUpdated"));
      // -------------------------------------------------
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update failed:", {
        timestamp: new Date().toISOString(),
        error: error.message,
        formData,
        stack: error.stack,
      });
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError(null);
    setGeocodeError(null);
    setFormData((prev) => ({
      ...prev,
      bio: initialBio || "",
      locationName: location?.locationName || "",
      street: street || "",
      zip_code: zip_code || "",
      lon: lon || null,
      lat: lat || null,
    }));
  };

  if (isEditing) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="font-semibold">Edit My Bio</div>
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              disabled={isLoading}
              className="text-green-500 hover:text-green-600 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="text-red-500 hover:text-red-600 disabled:opacity-50"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        {error && (
          <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        {geocodeError && (
          <div className="p-3 bg-yellow-100 border border-yellow-200 text-yellow-700 rounded-md text-sm">
            {geocodeError}
          </div>
        )}
        {placesApiLoading && (
          <div className="p-3 bg-blue-50 border border-blue-100 text-blue-600 rounded-md text-sm flex items-center">
            <Loader className="w-4 h-4 animate-spin mr-2" />
            Loading location services...
          </div>
        )}
        <div className="space-y-3">
          <textarea
            value={formData.bio}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, bio: e.target.value }))
            }
            className="w-full p-2 text-sm text-gray-600 border border-gray bg-input rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            placeholder="Write your bio..."
            rows={3}
            disabled={isLoading}
          />
          <div>
            <input
              type="text"
              ref={locationInputRef}
              value={formData.locationName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  locationName: e.target.value,
                }))
              }
              className="w-full p-2 text-sm text-gray-600 border border-gray bg-input rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              placeholder="Location"
              disabled={isLoading}
              autoComplete="off"
            />
            <p className="text-xs text-gray-500 mt-1">
              Start typing to see city suggestions
            </p>
          </div>
          <div>
            <input
              type="text"
              ref={streetInputRef}
              value={formData.street}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, street: e.target.value }))
              }
              className="w-full p-2 text-sm text-gray-600 border border-gray bg-input rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              placeholder="Street"
              disabled={isLoading}
              autoComplete="off"
            />
            <p className="text-xs text-gray-500 mt-1">
              Start typing to see address suggestions
            </p>
          </div>
          <input
            type="text"
            value={formData.zip_code}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, zip_code: e.target.value }))
            }
            className="w-full p-2 text-sm text-gray-600 border border-gray bg-input rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            placeholder="ZIP Code"
            disabled={isLoading}
          />
          {formData.lon && formData.lat && (
            <div className="text-sm text-gray-500">
              Coordinates: {formData.lon.toFixed(4)}, {formData.lat.toFixed(4)}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold">My Bio</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="text-gray-500 hover:text-gray-700"
        >
          <Pencil className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          {formData.bio || "No bio available"}
        </p>
        {formData.locationName && (
          <p className="text-sm text-gray-500">
            <span className="font-medium capitalize flex space-x-1 text-secondary">
              <MapPin size={20} />
              <p className="text-sm text-gray-500">
                {formData.locationName}, {formData.street}, {formData.zip_code}
              </p>
            </span>
          </p>
        )}
        {formData.lon && formData.lat && (
          <p className="text-xs text-gray-400">
            Coordinates: {formData.lon.toFixed(6)}, {formData.lat.toFixed(6)}
          </p>
        )}
      </div>
    </div>
  );
};

export default EditableProfile;