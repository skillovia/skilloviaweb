import React, { useState } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';
import UserLayout from '../../../UserLayout/UserLayout';
import BackButton from '../../../../../componets/Back';

// Modal Component
const Modal = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  const idTypes = [
    'Residence permit',
    'Driving license', 
    'International passport'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-medium mb-4">ID Type</h3>
        <div className="space-y-2">
          {idTypes.map((type) => (
            <button
              key={type}
              onClick={() => {
                onSelect(type);
                onClose();
              }}
              className="w-full p-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-md"
            >
              <span>{type}</span>
              <div className="w-4 h-4 rounded-full border border-gray-300"></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Identification = () => {
  const [selectedType, setSelectedType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <UserLayout>
 
    <div className="max-w-4xl mx-auto lg:p-6 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <BackButton label='Kyc' />
        </div>
        <button className="bg-primary text-secondary font-semibold px-4 py-2 rounded-full hover:bg-green-500">
          Save changes
        </button>
      </div>

      {/* Form */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm mb-2">ID Type</label>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full p-3 text-left bg-input border border-gray rounded-md hover:bg-gray-50"
          >
            {selectedType || 'Select option'}
          </button>
        </div>

        <div>
          <label className="block text-sm mb-2">Upload ID image</label>
          <label className="block w-full cursor-pointer">
            <div className="border-2 border-dashed border-gray rounded-md bg-input p-8 text-center bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center space-y-2">
                <Upload className="w-8 h-8 text-gray-400" />
                <div className="text-sm text-gray-600">Click to upload image</div>
                <div className="text-xs text-gray-400">SVG, PNG, or JPG</div>
              </div>
              <input 
                type="file" 
                className="hidden" 
                accept=".svg,.png,.jpg,.jpeg"
                onChange={handleFileChange}
              />
            </div>
          </label>
          {file && (
            <div className="mt-2 text-sm text-gray-600">
              Selected file: {file.name}
            </div>
          )}
        </div>
      </div>

      {/* ID Type Selection Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={setSelectedType}
      />
    </div>
           
    </UserLayout>
  );
};

export default Identification;