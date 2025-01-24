import { useState } from "react";
import UserLayout from "../../UserLayout/UserLayout";
import BackButton from "../../../../componets/Back";

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
    <UserLayout>


    <div className="  px-4 flex justify-center items-center">
      <div className="w-full max-w-md ">
        {/* <span className="flex">

        </span> */}
        <button className="text-gray-500 hover:text-gray-800 mb-6 flex ">
          <span className="mr-2"><BackButton label="" /></span> <p className="text-[20px] pt-2 font-medium">Notification Settings</p>  
        </button>
        <div className="space-y-4">
          {Object.entries(settings).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between items-center py-4 rounded px-3 border bg-input border-gray"
            >
              <span className="text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, " $1").toLowerCase()}
              </span>
              <button
                onClick={() => toggleSetting(key)}
                className={`w-12 h-6 flex items-center rounded-full p-1 ${
                  value ? "bg-primary" : "bg-secondary"
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
    </UserLayout>
  );
};

export default NotificationSettings;
