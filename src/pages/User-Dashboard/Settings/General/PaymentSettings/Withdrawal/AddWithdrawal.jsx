import React, { useState } from 'react';
import UserLayout from '../../../../UserLayout/UserLayout';
import BackButton from '../../../../../../componets/Back';


const AddWithdrawal = () => {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const accessToken = localStorage.getItem('accessToken');
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accessToken) {
      setError('Authorization token is missing');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      const response = await fetch(
   
        `${import.meta.env.VITE_BASE_URL}/settings/payment/withdrawalmethod`,
        {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bank_name: bankName,
          account_number: accountNumber,
          account_name: accountName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Error response:', data);
        throw new Error(data.message || 'Something went wrong');
      }

      setSuccessMessage('Withdrawal method added successfully');
      setBankName('');
      setAccountNumber('');
      setAccountName('');
    } catch (err) {
      console.error('Error occurred:', err);
      setError(err.message || 'An error occurred while saving');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserLayout>
      <div>
        <form className="p-4 space-y-4" onSubmit={handleSubmit}>
          <BackButton label='withdraw' />
          {successMessage && (
            <p className="text-green-500 text-sm mb-4">{successMessage}</p>
          )}

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Bank name</label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Enter bank name"
              className="w-full p-3 rounded-lg border border-gray bg-input focus:outline-none focus:border-green-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Account number</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter account number"
              className="w-full p-3 rounded-lg border border-gray bg-input focus:outline-none focus:border-green-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Account name</label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Account name"
              className="w-full p-3 bg-gray-50 rounded-lg border border-gray bg-input focus:outline-none focus:border-green-400"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="lg:w-[40%] text-[12px] rounded-full font-semibold py-2 px-3 w-[50%] bg-primary text-secondary mt-4 hover:bg-green-500"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </UserLayout>
  );
};

export default AddWithdrawal;