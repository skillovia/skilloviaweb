import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import BackButton from '../../componets/Back';


const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  const services = [
    "House Cleaning", "Deep Cleaning", "Carpet Cleaning", "Gutter Cleaning",
    "Pressure Washing", "Pool Cleaning and Maintenance", "Garage Organization",
    "Decluttering Services", "Chimney Sweeping", "Upholstery Cleaning",
    "Tiling (Floor/Wall)", "Drywall Installation and Repair", "Kitchen Remodeling",
    "Bathroom Remodeling", "Flooring Installation", "HVAC Repairs and Installation",
    "Cabinet Installation", "Home Theater Setup", "Smart Home Installation",
    "Insulation Installation", "Lawn Mowing", "Landscaping", "Tree Trimming and Removal",
    "Garden Maintenance", "Fence Repair and Installation", "Deck Maintenance and Repairs",
    "Power Washing", "Pest Control Services", "Snow Removal",
    "Sprinkler System Installation and Repair", "Plumbing", "Electrical Repairs",
    "Handyman Services", "Pool Cleaning", "Roofing Repairs", "Painting (Interior/Exterior)"
  ];

  useEffect(() => {
    // Focus the input element when the component mounts
    inputRef.current.focus();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filtered = services.filter(service =>
      service.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="relative">
        {/* Search Header */}
        <div className="flex items-center space-x-4 mb-4">
          <BackButton label=''/>
          <h1 className="text-lg font-semibold">Search</h1>
        </div>

        {/* Search Input */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            ref={inputRef} // Attach the ref to the input element
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Search people, skills and communities"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Suggestions List */}
        <div className="mt-2">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <SearchIcon className="h-4 w-4 text-gray-500" />
              </div>
              <span className="text-gray-700">{suggestion}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search