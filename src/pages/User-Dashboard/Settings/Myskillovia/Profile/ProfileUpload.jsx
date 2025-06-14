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
  // const [photoPreview, setPhotoPreview] = useState(null);

  // const userId = localStorage.getItem('decodedToken')
  //   ? JSON.parse(localStorage.getItem('decodedToken')).id
  //   : null;

  const accessToken = localStorage.getItem("accessToken");

  const userId = accessToken ? jwtDecode(accessToken).id : null;

  // Fetch current profile photo
  // useEffect(() => {
  //   const fetchProfilePhoto = async () => {
  //     if (!userId) return;

  //     try {
  //       const response = await fetch(
  //         `${import.meta.env.VITE_BASE_URL}/users/profile/${userId}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //           },
  //         }
  //       );

  //       const data = await response.json();
  //       if (data.status === "success" && data.data.photourl) {
  //         setPhotoPreview(data.photourl);
  //         console.log(data.data.photourl);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching profile photo:", err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchProfilePhoto();
  // }, [userId]);

  const fetchProfile = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
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
      console.error("❌ Error fetching profile:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  // const handlePhotoChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   // Validate file type
  //   if (!file.type.startsWith("image/")) {
  //     setError("Please select an image file");
  //     return;
  //   }

  //   // Validate file size (max 5MB)
  //   if (file.size > 5 * 1024 * 1024) {
  //     setError("Image size should be less than 5MB");
  //     return;
  //   }
  //   setPhotoPreview(URL.createObjectURL(file));
  //   setSelectedFile(file);
  //   // setIsUploading(true);
  //   // setError("");

  //   // Create form data
  //   const formData = new FormData();
  //   formData.append("photo", file);

  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_BASE_URL}/users/profile/upload`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //         },
  //         body: formData,
  //       }
  //     );

  //     const data = await response.json();

  //     if (data.status === "success") {
  //       // Update preview
  //       // setPhotoPreview(data.data.photo);
  //       setPhotoPreview(ensureHttps(data.data.photo));

  //       // Update local storage
  //       const currentProfile = JSON.parse(
  //         localStorage.getItem("userProfile") || "{}"
  //       );
  //       const updatedProfile = {
  //         ...currentProfile,
  //         photourl: data.data.photo,
  //       };
  //       localStorage.setItem("userProfile", JSON.stringify(updatedProfile));

  //       // Notify other components
  //       window.dispatchEvent(new Event("profileUpdated"));
  //     } else {
  //       setError("Failed to upload photo");
  //     }
  //   } catch (err) {
  //     setError("Error uploading photo");
  //     console.error("Error:", err);
  //   } finally {
  //     setIsUploading(false);
  //   }
  // };
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    // Just preview, don't upload
    setPhotoPreview(URL.createObjectURL(file));
    setSelectedFile(file); // This is stored to upload later
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
            {/*<img
              src={
                photoPreview ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&s"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />*/}
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
