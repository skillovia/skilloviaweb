import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Trash2 } from 'lucide-react';

import UserLayout from '../../../../UserLayout/UserLayout';
import BackButton from '../../../../../../componets/Back';
import EmptyState from '../../../../../../componets/EmptyState';
import { IoBriefcaseOutline } from 'react-icons/io5';
import { TbCreditCardRefund } from "react-icons/tb";

const BillingManagement = () => {
  const navigate = useNavigate();
  const [billingMethods, setBillingMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchBillingMethods();
  }, []);

  const fetchBillingMethods = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/settings/payment/billingmethods`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch billing methods');
      }

      const data = await response.json();
      setBillingMethods(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    setIsDeleting(true);
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/settings/payment/billingmethod/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete billing method');
      }

      setBillingMethods((prev) => prev.filter(method => method.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };

  const BillingMethodCard = ({ cardNumber, expiry, id }) => (
    <div className="border border-gray bg-input p-4 rounded-lg mb-3 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8">
          <div className="w-6 h-6 bg-red-500 rounded-full" />
        </div>
        <div>
          <p className="text-sm text-gray-800">•••• •••• •••• {cardNumber.slice(-4)}</p>
          <p className="text-xs text-gray-500">Expiry: {expiry}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={() => handleDelete(id)}
          className="p-2 hover:bg-gray-200 rounded-full"
          disabled={isDeleting}
        >
          {isDeleting && deletingId === id ? (
            <Loader2 size={16} className="text-gray-600 animate-spin" />
          ) : (
            <Trash2 size={16} className="text-gray-600" />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto p-4">
        <BackButton label='Bills' />
        <h1 className="text-2xl font-semibold mb-6 mt-8">Billing Methods</h1>
        
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin w-12 h-12 text-gray-400" />
            </div>
          ) : error ? (
            <p className="text-red-500 text-center py-4">{error}</p>
          ) : billingMethods.length === 0 ? (

               <div className="min flex items-center justify-center  rounded-lg shadow-sm">
     <EmptyState
    title='No Billing method found'
    description='Click the button below to add one'
   icon={() => (
    <TbCreditCardRefund  className='text-[4rem] text-text' />
  )}

     />
   </div>
          ) : (
            billingMethods.map((method) => (
              <BillingMethodCard
                key={method.id}
                id={method.id}
                cardNumber={method.card_number}
                expiry={method.expiry_date}
              />
            ))
          )}

          <button
            onClick={() => navigate('/add-bills')}
            className="w-full md:w-auto py-3 px-6 bg-primary text-secondary rounded-full font-semibold 
                      hover:bg-opacity-90 transition-colors duration-200 text-[14px]"
          >
            Add a New Billing Method
          </button>
        </div>
      </div>
    </UserLayout>
  );
};

export default BillingManagement;