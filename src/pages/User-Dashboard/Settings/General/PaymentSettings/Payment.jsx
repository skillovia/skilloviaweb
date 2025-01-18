import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Building2, ChevronRight } from 'lucide-react';
import UserLayout from '../../../UserLayout/UserLayout';
import BackButton from '../../../../../componets/Back';

const Payment = () => {
  const navigate = useNavigate();

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto min-h-screen">
        <div className="p-4 space-y-3">
          <BackButton label="payment" />
          
          <button
            onClick={() => navigate('/bills')}
            className="w-full p-4 rounded-lg border border-gray bg-input hover:bg-gray-50 
                       flex justify-between items-center transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <CreditCard className="text-gray-600" />
              <span className="text-gray-800 font-medium">Billing</span>
            </div>
            <ChevronRight className="text-gray-400" />
          </button>

          <button
            onClick={() => navigate('/get-paid')}
            className="w-full p-4 border border-gray bg-input hover:bg-gray-50 rounded-lg 
                       flex justify-between items-center transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <Building2 className="text-gray-600" />
              <span className="text-gray-800 font-medium">Get Paid</span>
            </div>
            <ChevronRight className="text-gray-400" />
          </button>
        </div>
      </div>
    </UserLayout>
  );
};

export default Payment;