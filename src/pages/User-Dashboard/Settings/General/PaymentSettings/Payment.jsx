import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Building2, ChevronRight } from 'lucide-react';
import UserLayout from '../../../UserLayout/UserLayout';
import BackButton from '../../../../../componets/Back';
import { IoMdWallet } from 'react-icons/io';

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

          <section className="pt-10">


          <Link to="/create-stripe-account" className="flex items-center justify-center bg-secondary border border-gray-300 rounded-md px-4 py-2 text-white hover:text-gray-700">
    <IoMdWallet className="mr-1 text-white" />
    <span>Setup Connect Wallet </span>
  </Link>
          </section>
        </div>
      </div>
    </UserLayout>
  );
};

export default Payment;