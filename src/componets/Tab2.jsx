import React, { useState } from 'react';

const Tabs2 = ({
  tabs,
  defaultTab = 0,
  variant = 'default',
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Variant styles
  const variants = {
    default: {
      container: 'border-b border-gray-200',
      tab: 'px-4 py-2 text-sm font-medium',
      active: 'text-blue-600 border-b-2 border-blue-600',
      inactive: 'text-gray-500 hover:text-gray-700 hover:border-gray-300',
    },
    pills: {
      container: 'space-x-2',
      tab: 'px-4 py-2 text-sm font-medium rounded-full',
      active: 'bg-blue-600 text-white',
      inactive: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100',
    },
    boxed: {
      container: 'space-x-1',
      tab: 'px-4 py-2 text-sm font-medium rounded-t-lg',
      active: 'bg-white text-blue-600 border-t border-x border-gray-200',
      inactive: 'bg-gray-50 text-gray-500 hover:text-gray-700 hover:bg-gray-100',
    }
  };

  const style = variants[variant];

  return (
    <div className={className}>
      {/* Tab List */}
      <div className={`flex ${style.container}`}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id || index}
            onClick={() => setActiveTab(index)}
            className={`
              ${style.tab}
              transition-colors
              duration-200
              ${activeTab === index ? style.active : style.inactive}
            `}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tabpanel-${index}`}
          >
            <div className="flex items-center space-x-2">
              {tab.icon && <tab.icon className="w-4 h-4" />}
              <span>{tab.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="mt-4">
        {tabs.map((tab, index) => (
          <div
            key={tab.id || index}
            role="tabpanel"
            id={`tabpanel-${index}`}
            className={`
              ${activeTab === index ? 'block' : 'hidden'}
              focus:outline-none
            `}
            tabIndex={0}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs2;