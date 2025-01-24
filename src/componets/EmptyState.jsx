// EmptyState.jsx
import React from 'react';

const EmptyState = ({ 
  title = 'No Data Available',
  description = 'No items to display at the moment.',
  icon: CustomIcon = null,
  action = null,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center text-text justify-center p-8 text-center ${className}`}>
      {/* Icon Section */}
      <div className="mb-4">
        {CustomIcon ? (
          <CustomIcon className="w-16 h-16 text-gray-400" />
        ) : (
          <svg
            className="w-16 h-16 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        )}
      </div>

      {/* Text Content */}
      <h3 className="mb-2 text-lg font-medium text-gray-900">
        {title}
      </h3>
      <p className="mb-6 text-sm text-gray-500">
        {description}
      </p>

      {/* Optional Action Button */}
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;