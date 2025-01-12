import React from 'react';

const Input = ({
  label,
  error,
  icon: Icon,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          className={`
            w-full
            rounded-md   bg-red-500
            border
            ${error ? 'border-red-500' : 'border-gray-300'}
            px-3
            py-2
            ${Icon ? 'pl-10' : ''}
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-transparent
            disabled:bg-gray-50
            disabled:text-gray-500
            placeholder:text-gray-400
            text-sm
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

const TextArea = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full
          rounded-md
          border
          ${error ? 'border-red-500' : 'border-gray-300'}
          px-3
          py-2
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-transparent
          disabled:bg-gray-50
          disabled:text-gray-500
          placeholder:text-gray-400
          text-sm
          min-h-[100px]
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

const Select = ({
  label,
  error,
  options = [],
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        className={`
          w-full
          rounded-md
          border
          ${error ? 'border-red-500' : 'border-gray-300'}
          px-3
          py-2
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-transparent
          disabled:bg-gray-50
          disabled:text-gray-500
          text-sm
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export { Input, TextArea, Select };