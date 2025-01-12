import React from 'react';
import { ArrowLeft, Mail, CheckCircle, AlertCircle, FileText, ChevronRight } from 'lucide-react';
import BackButton from '../../../../../componets/Back';
import UserLayout from '../../../UserLayout/UserLayout';
import { useNavigate } from 'react-router-dom';


const VerificationStep = ({ icon, title, description, status = 'pending', onClick }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <ChevronRight className="w-5 h-5 text-gray-400" />;
    }
  };
 

  return (
    <button 
      onClick={onClick}
      className="w-full bg-input border border-gray p-4 rounded-lg flex items-center justify-between mb-3 hover:bg-[#edf0ed] transition-colors"
    >
      <div className="flex items-center space-x-3">
        <div className="text-gray-600">
          {icon}
        </div>
        <div className="text-left">
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      {getStatusIcon()}
    </button>
  );
};

const KYCVerification = () => {
    const navigate = useNavigate();
  return (
    <UserLayout>



    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
       <BackButton label='Kyc'/>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-1">Details to provide</h2>
        <p className="text-gray-500 text-sm">The following are information we want from you.</p>
      </div>

      {/* Verification Steps */}
      <div>
        <VerificationStep
          icon={<Mail className="w-5 h-5" />}
          title="Email"
          description="Verify your email to get started"
          status="completed"
        
        />

        <VerificationStep
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="12" cy="10" r="3" />
            <path d="M7 18h10" />
          </svg>}
          title="Identification"
          description="A valid legal document we can use to identify you"
          status="warning"
          onClick={() => navigate("/settings/kyc/identification")}
        />

        <VerificationStep
          icon={<FileText className="w-5 h-5" />}
          title="Utility Bill"
          description="Provide your latest utility bill"
          onClick={() => navigate("/settings/kyc/bill")}
        />
      </div>
    </div>
    </UserLayout>
  );
};

export default KYCVerification;