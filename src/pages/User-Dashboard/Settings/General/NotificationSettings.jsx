import { useState } from "react";

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    bookingMessages: false,
    orderUpdates: true,
    orderMessages: true,
    promotions: true,
    accountNotifications: true,
    marketingNotifications: true,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-green-50 p-6 flex justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <button className="text-gray-500 hover:text-gray-800 mb-6">
          <span className="mr-2">←</span> Notification Settings
        </button>
        <div className="space-y-4">
          {Object.entries(settings).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between items-center py-2 border-b border-gray-200"
            >
              <span className="text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, " $1").toLowerCase()}
              </span>
              <button
                onClick={() => toggleSetting(key)}
                className={`w-12 h-6 flex items-center rounded-full p-1 ${
                  value ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                    value ? "translate-x-6" : "translate-x-0"
                  }`}
                ></div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
