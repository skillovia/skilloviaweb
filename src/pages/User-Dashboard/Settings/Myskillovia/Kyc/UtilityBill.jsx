import React, { useState } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';
import UserLayout from '../../../UserLayout/UserLayout';
import BackButton from '../../../../../componets/Back';

const UtilityBill = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!file) {
      setError('Please upload a utility bill');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) throw new Error('Access token not found');

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/settings/kyc/upload/utility`,

        {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload utility bill');
      }

      setSuccess(true);
      // Clear form after successful upload
      setFile(null);
    } catch (err) {
      console.error('Error uploading utility bill:', err);
      setError(err.message || 'Failed to upload utility bill. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto lg:p-6 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <BackButton label='Utility Bill' />
          </div>
          <button 
            className={`bg-primary text-secondary font-semibold px-4 py-2 rounded-full ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-500'
            }`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Save changes'}
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-md">
            {error}
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-600 rounded-md">
            Utility bill uploaded successfully!
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-2">Upload Utility Bill</label>
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
      </div>
    </UserLayout>
  );
};

export default UtilityBill;