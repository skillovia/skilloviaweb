import React from 'react';
import { ArrowLeft, Smartphone, Monitor } from 'lucide-react';
import UserLayout from '../../UserLayout/UserLayout';
import BackButton from '../../../../componets/Back';

const LinkedDevices = () => {
  const devices = [
    {
      id: 1,
      name: 'This device (SM-938374)',
      type: 'Android',
      location: 'Lagos, Nigeria',
      status: 'Active now',
      icon: Smartphone
    },
    {
      id: 2,
      name: 'Chrome 105',
      type: 'Mac',
      location: 'Lagos, Nigeria',
      status: '5h ago',
      icon: Monitor
    }
  ];

  return (
    <UserLayout>

  

    <div className="max-w-4xl mx-auto px-4 ">
      <div className="flex items-center mb-6 gap-2">
       <BackButton label='Linked Devices'/>
     
      </div>

      <div className="space-y-4">
        {devices.map((device) => (
          <div key={device.id} className="flex items-start gap-3">
            <device.icon className="w-6 h-6 text-gray-600" />
            <div className="flex-1">
              <p className="font-medium">{device.name}</p>
              <p className="text-sm text-gray-600">{device.type}</p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{device.location}</span>
                <span>•</span>
                <span>{device.status}</span>
              </div>
            </div>
          </div>
        ))}

        <button className="w-full text-red-500 text-sm py-2">
          Sign Out From All Other Devices
        </button>

        <button className="w-full bg-[#8fff7b] text-black rounded-lg py-3 font-medium hover:bg-[#7aee66] transition-colors">
          Save
        </button>
      </div>
    </div>
    </UserLayout>
  );

};

export default LinkedDevices;