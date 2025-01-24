import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, CheckCircle, Loader } from 'lucide-react';
import BackButton from '../../../../../componets/Back';
import UserLayout from '../../../UserLayout/UserLayout';

const PasswordReset = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null); // 'success' or 'error'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setPasswords({
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });
    setShowPasswords({
      oldPassword: false,
      newPassword: false,
      confirmNewPassword: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      setMessage('New passwords do not match!');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage(null);
    setSuccess(false);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/change/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          password: passwords.oldPassword,
          newPassword: passwords.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setMessage('Password reset was successful!');
        setMessageType('success');
        resetForm();
      } else {
        setMessage(data.message || 'Something went wrong!');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Failed to reset password. Please try again later.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto  p-4">
      <BackButton to="/dashboard" />
      {message && (
            <div
              className={`p-4 rounded-lg my-6 ${
                messageType === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              } flex items-center gap-2`}
            >
              {messageType === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : null}
              <span>{message}</span>
            </div>
          )}
        <h2 className="text-lg font-semibold my-4">Reset Password</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { label: 'Old Password', key: 'oldPassword' },
            { label: 'New Password', key: 'newPassword' },
            { label: 'Confirm New Password', key: 'confirmNewPassword' },
          ].map((field) => (
            <div key={field.key} className="relative">
              <label htmlFor={field.key} className="block text-sm font-medium mb-2 text-gray-700">
                {field.label}
              </label>
              <div className="relative">
                <input
                  type={showPasswords[field.key] ? 'text' : 'password'}
                  name={field.key}
                  id={field.key}
                  value={passwords[field.key]}
                  onChange={handleInputChange}
                  className="w-full border rounded-l bg-input border-gray g px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords((prev) => ({
                      ...prev,
                      [field.key]: !prev[field.key],
                    }))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  {showPasswords[field.key] ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          ))}

       

          <button
            type="submit"
            className={`w-full px-4 py-3 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center gap-2
              ${
                loading
                  ? 'bg-secondary cursor-not-allowed'
                  : 'bg-secondary  active:transform active:scale-[0.98]'
              }
            `}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : success ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Password Updated</span>
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </form>
      </div>
    </UserLayout>
  );
};

export default PasswordReset;