
import React, { useState } from 'react';
import Sidebar from '../UserLayout/UserSidebar'
import UserHeader from '../UserLayout/UserHeader'
import UserLayout from '../UserLayout/UserLayout'

import { ChevronRight, Lock, UserCircle, ShieldCheck, Users, MoveRight, ArrowRight } from 'lucide-react';
import Legal from './Legal-Support/Legal';
import General from './General/General';


const Settings = ({children}) => {
    const [activeTab, setActiveTab] = useState('My Skillovia');

    const tabs = [
        'My Skillovia',
        'General',
        'Legal & Support'
      ];

      const menuItems = [
        {
          icon: <Lock className="w-5 h-5" />,
          label: 'My skills',
          link: '/settings/skills'
        },
        {
          icon: <UserCircle className="w-5 h-5" />,
          label: 'Edit profile',
          link: '/settings/profile'
        },
        {
          icon: <ShieldCheck className="w-5 h-5" />,
          label: 'KYC',
          link: '/settings/kyc'
        },
        {
          icon: <Users className="w-5 h-5" />,
          label: 'Invite friends',
          link: '/settings/invite'
        }
      ];
  return (
   <UserLayout>

<div className=" w-full lg:max-w-4xl mx-auto px-4">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      
      {/* Tabs with improved visibility */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex -mb-px space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab
                  ? 'border-seconday text-secondary border-b-4'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Menu Items - only show if My Skillovia tab is active */}
      {activeTab === 'My Skillovia' && (
        <div className="mt-6 space-y-2">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                <span className="text-gray-700">{item.label}</span>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 text-secondary" />
            </a>
          ))}
        </div>
      )}

      {/* General Tab Content */}
      {activeTab === 'General' && (
       <General />
      )}

      {/* Legal & Support Tab Content */}
      {activeTab === 'Legal & Support' && (
       <Legal />
      )}
    </div>

   </UserLayout>
  )
}

export default Settings
