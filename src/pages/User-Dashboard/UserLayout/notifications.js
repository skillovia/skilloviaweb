// utils/notifications.js
export const markNotificationAsSeen = async (notificationId, token) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/notifications/${notificationId}/seen`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to mark notification as seen");
  }
  const data = await response.json();
  return data.data; // updated notification
};
