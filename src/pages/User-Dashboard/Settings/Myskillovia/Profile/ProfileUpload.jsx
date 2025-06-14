import React, { useState, useEffect } from "react";
import { Loader2, Camera } from "lucide-react";
import { jwtDecode } from "jwt-decode";

const ensureHttps = (url) => {
  if (!url) return null;
  return url.startsWith("http") ? url : `https://${url}`;
};

const ProfilePhotoUpload = ({
  photoPreview,
  setPhotoPreview,
  setSelectedFile,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const userId = accessToken ? jwtDecode(accessToken).id : null;

  // Fetch profile to get photo on mount (first load only)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!accessToken) throw new Error("❌ Access token not found");
        const decodedToken = jwtDecode(accessToken);
        const user_id = decodedToken?.id;
        if (!user_id) throw new Error("❌ User ID not found in token");
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/users/profile/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) throw new Error("❌ Failed to fetch profile");
        const data = await response.json();
        const photoUrl = ensureHttps(data.data.photourl);
        setPhotoPreview(photoUrl);
      } catch (err) {
        setError(err.message);
        setPhotoPreview(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
    // Only run on mount
    // eslint-disable-next-line
  }, []);

  // Preview instantly when user selects a file
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }
    setPhotoPreview(URL.createObjectURL(file)); // Instant preview
    setSelectedFile(file);
    setError("");
  };

  if (isLoading) {
    return (
      <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-100">
        <Loader2 className="animate-spin w-8 h-8 text-gray-400" />
      </div>
    );
  }

  return (
    <div className="relative">
      {error && (
        <div className="absolute -top-8 left-0 right-0 text-sm text-red-500 text-center">
          {error}
        </div>
      )}
      <div className="relative inline-block">
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="hidden"
          id="photo-upload"
          disabled={isUploading}
        />
        <label htmlFor="photo-upload" className="cursor-pointer block relative">
          <div className="w-20 h-20 rounded-full overflow-hidden relative">
            <img
              src={
                photoPreview && photoPreview.trim() !== ""
                  ? photoPreview
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&s"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Loader2 className="animate-spin w-8 h-8 text-white" />
              </div>
            )}
            {!isUploading && (
              <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1">
                <Camera className="w-4 h-4 text-secondary" />
              </div>
            )}
          </div>
        </label>
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;