import React, { useState, useEffect } from 'react';
import { ArrowLeft, Upload, Trash2 } from 'lucide-react';
import UserLayout from '../../../UserLayout/UserLayout';
import BackButton from '../../../../../componets/Back';

const UtilityBill = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingBills, setFetchingBills] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [utilityBills, setUtilityBills] = useState([]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchUtilityBills();
  }, []);

  const fetchUtilityBills = async () => {
    try {
      setFetchingBills(true);
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) throw new Error('Access token not found');

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/settings/kyc/get/utility`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch utility bills');
      }

      const data = await response.json();
      const formattedBills = data.data.map(bill => ({
        id: bill.id,
        fileUrl: bill.document_url,
        fileName: bill.kyc_id_type,
        createdAt: bill.created_at,
        approvalStatus: bill.approval_status,
        kycMethod: bill.kyc_method
      }));
      
      setUtilityBills(formattedBills);
    } catch (err) {
      console.error('Error fetching utility bills:', err);
      setError(err.message);
    } finally {
      setFetchingBills(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeleting(true);
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) throw new Error('Access token not found');

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/settings/kyc/delete/utility/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete utility bill');
      }

      await fetchUtilityBills();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error deleting utility bill:', err);
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleSubmit = async () => {
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
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload utility bill');
      }

      setSuccess(true);
      setFile(null);
      await fetchUtilityBills();
    } catch (err) {
      console.error('Error uploading utility bill:', err);
      setError(err.message || 'Failed to upload utility bill. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'approved':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
    }
  };

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto lg:p-6 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <BackButton label="Utility Bill" />
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
            Operation completed successfully!
          </div>
        )}

        {/* Upload Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-2">Upload Utility Bill</label>
            <label className="block w-full cursor-pointer">
              <div className="border-2 border-dashed border-gray rounded-md bg-gray-50 p-8 text-center hover:bg-gray-100">
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

        {/* Existing Bills Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Uploaded Utility Bills</h2>
          {fetchingBills ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {utilityBills.map((bill) => (
                <div
                  key={bill.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={` https://${bill.fileUrl}`  }
                      alt="Utility Bill"
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <div className="font-medium">{bill.fileName}</div>
                      <div className="text-sm text-gray-500">
                        Uploaded on {new Date(bill.createdAt).toLocaleDateString()}
                      </div>
                      <div className="mt-1">
                        <span className={getStatusBadgeClass(bill.approvalStatus)}>
                          {bill.approvalStatus.charAt(0).toUpperCase() + bill.approvalStatus.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(bill.id)}
                    disabled={deleting}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              {utilityBills.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No utility bills uploaded yet
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default UtilityBill;