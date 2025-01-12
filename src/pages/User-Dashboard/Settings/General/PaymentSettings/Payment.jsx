import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CreditCard, 
  Building2, 
  Pencil, 
  Trash2, 
  Lock,
  ChevronRight
} from 'lucide-react';
import UserLayout from '../../../UserLayout/UserLayout';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState('payment'); // payment, billing, addBilling, withdrawal, addWithdrawal
  
  const BillingMethodCard = ({ cardNumber, expiry }) => (
    <div className=" border border-gray bg-input p-4 rounded-lg mb-3 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8">
          <div className="w-6 h-6 bg-red-500 rounded-full" />
        </div>
        <div>
          <p className="text-sm text-gray-800">•••• •••• •••• {cardNumber}</p>
          <p className="text-xs text-gray-500">Expiry: {expiry}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="p-2 hover:bg-gray-200 rounded-full">
          <Pencil size={16} className="text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-200 rounded-full">
          <Trash2 size={16} className="text-gray-600" />
        </button>
      </div>
    </div>
  );

  const WithdrawalMethodCard = ({ bank, accountNumber, name }) => (
    <div className=" border border-gray bg-input p-4 rounded-lg mb-3 flex justify-between items-center">
      <div className="flex items-center gap-3 ">
        <Building2 className="text-gray-600" />
        <div>
          <p className="text-sm text-gray-800">{bank}</p>
          <p className="text-xs text-gray-500">{name}</p>
          <p className="text-xs text-gray-500">•••••{accountNumber}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="p-2 hover:bg-gray-200 rounded-full">
          <Pencil size={16} className="text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-200 rounded-full">
          <Trash2 size={16} className="text-gray-600" />
        </button>
      </div>
    </div>
  );

//   const Header = ({ title }) => (
//     <div className="flex items-center gap-4 px-4 ">
//       <button 
//         onClick={() => {
//           if (currentScreen === 'payment') {
//             navigate(-1) // Navigate back to settings page
//           } else {
//             setCurrentScreen('payment'); // Go back to payment screen
//           }
//         }}
//         className="hover:bg-gray-100 p-2 rounded-full"
//       >
//         <ArrowLeft size={20} className="text-gray-600" />
//       </button>
//       <h1 className="text-lg font-medium">{title}</h1>
//     </div>
//   );


const Header = ({ title }) => (
    <div className="flex items-center gap-4 p-4 ">
      <button 
        onClick={() => setCurrentScreen('payment')}
        className="hover:bg-gray-100 p-2 rounded-full"
      >
        <ArrowLeft size={20} className="text-gray-600" />
      </button>
      <h1 className="text-lg font-medium">{title}</h1>
    </div>
  );

  const PaymentScreen = () => (
    <div className="h-full ">
      <Header title="Payment" />
      <div className="p-4 space-y-3">
        <button 
          onClick={() => setCurrentScreen('billing')}
          className="w-full p-4  rounded-lg  border border-gray bg-input flex justify-between items-center"
        >
          <div className="flex items-center gap-3">
            <CreditCard className="text-gray-600" />
            <span className="text-gray-800">Billing</span>
          </div>
          <ChevronRight className="text-gray-400" />
        </button>

        <button 
          onClick={() => setCurrentScreen('withdrawal')}
          className="w-full p-4  border border-gray bg-input rounded-lg flex justify-between items-center"
        >
          <div className="flex items-center gap-3">
            <Building2 className="text-gray-600" />
            <span className="text-gray-800">Get Paid</span>
          </div>
          <ChevronRight className="text-gray-400" />
        </button>
      </div>
    </div>
  );

  const BillingScreen = () => (
    <div className="h-full ">
      <Header title="Billing" />
      <div className="p-4">
        <BillingMethodCard cardNumber="4002" expiry="20/2024" />
        <BillingMethodCard cardNumber="4002" expiry="20/2024" />
        <button 
          onClick={() => setCurrentScreen('addBilling')}
          className="lg:w-[30%] py-3 px-3 text-[12px] w-[60%] bg-primary text-secondary rounded-full font-semibold mt-4 hover:bg-green-500"
        >
          Add a New Billing Method
        </button>
      </div>
    </div>
  );

  const WithdrawalScreen = () => (
    <div className="h-full ">
      <Header title="Withdrawal" />
      <div className="p-4">
        <WithdrawalMethodCard 
          bank="KUDA MFB" 
          accountNumber="7539" 
          name="John Doe" 
        />
        <button 
          onClick={() => setCurrentScreen('addWithdrawal')}
               className="lg:w-[40%] text-[12px] rounded-full font-semibold py-2 px-3 w-[70%] bg-primary text-secondary mt-4 hover:bg-green-500"
        >
          Add a New Withdrawal Method
        </button>
      </div>
    </div>
  );

  const AddBillingScreen = () => (
    <div className="h-full ">
      <Header title="Add a New Billing Method" />
      <form className="p-4 space-y-4">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Card number</label>
          <div className="relative">
            <CreditCard size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Enter card no."
              className="w-full p-3 pl-10  border border-gray bg-input rounded-lg border border-gray-200 focus:outline-none focus:border-green-400"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Expires on</label>
            <input 
              type="text" 
              placeholder="MM/YY"
              className="w-full p-3  border border-gray bg-input rounded-lg border border-gray-200 focus:outline-none focus:border-green-400"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Security code</label>
            <input 
              type="text" 
              placeholder="•••"
              className="w-full p-3  border border-gray bg-input rounded-lg border border-gray-200 focus:outline-none focus:border-green-400"
            />
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Address</label>
          <input 
            type="text" 
            placeholder="Enter address"
            className="w-full p-3  border border-gray bg-input rounded-lg border border-gray-200 focus:outline-none focus:border-green-400"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">City</label>
          <select className="w-full p-3  border border-gray bg-input rounded-lg border border-gray-200 focus:outline-none focus:border-green-400">
            <option value="">Select city</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Postal code (Optional)</label>
          <input 
            type="text" 
            placeholder="Enter postal code"
            className="w-full p-3  border border-gray bg-input rounded-lg border border-gray-200 focus:outline-none focus:border-green-400"
          />
        </div>
        <button 
          type="submit"
          className="lg:w-[40%] text-[12px] rounded-full font-semibold py-2 px-3 w-[50%] bg-primary text-secondary mt-4 hover:bg-green-500"
        >
          Save
        </button>
      </form>
    </div>
  );

  const AddWithdrawalScreen = () => (
    <div className="h-full ">
      <Header title="Add withdrawal method" />
      <form className="p-4 space-y-4">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Select bank</label>
          <select className="w-full p-3   border-gray bg-input rounded-lg border border-gray-200 focus:outline-none focus:border-green-400">
            <option value="">Select bank option</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Account number</label>
          <input 
            type="text" 
            placeholder="Enter account number"
            className="w-full p-3  rounded-lg  border border-gray bg-input focus:outline-none focus:border-green-400"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Account name</label>
          <input 
            type="text" 
            placeholder="Account name"
            className="w-full p-3 bg-gray-50 rounded-lg  border border-gray bg-input focus:outline-none focus:border-green-400"
          />
        </div>
        <button 
          type="submit"
              className="lg:w-[40%] text-[12px] rounded-full font-semibold py-2 px-3 w-[50%] bg-primary text-secondary mt-4 hover:bg-green-500"
        >
          Save
        </button>
      </form>
    </div>
  );

  const screens = {
    payment: <PaymentScreen />,
    billing: <BillingScreen />,
    withdrawal: <WithdrawalScreen />,
    addBilling: <AddBillingScreen />,
    addWithdrawal: <AddWithdrawalScreen />
  };

  return (
    
    <UserLayout>

    <div className="max-w-4xl mx-auto h-screen ">
      {screens[currentScreen]}
    </div>
    </UserLayout>
  );
};

export default Payment;