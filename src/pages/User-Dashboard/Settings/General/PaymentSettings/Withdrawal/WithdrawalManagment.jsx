import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Trash2, Loader2 } from 'lucide-react';
import UserLayout from '../../../../UserLayout/UserLayout';
import BackButton from '../../../../../../componets/Back';
import EmptyState from '../../../../../../componets/EmptyState';
import { TbCreditCardRefund } from 'react-icons/tb';


const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 bottom-0 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const WithdrawalManagement = () => {
  const navigate = useNavigate();
  const [withdrawalMethods, setWithdrawalMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMethodId, setSelectedMethodId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchWithdrawalMethods();
  }, []);

  const fetchWithdrawalMethods = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const response = await fetch(
   
        `${import.meta.env.VITE_BASE_URL}/settings/payment/withdrawalmethods`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch withdrawal methods');
      }

      const data = await response.json();
      setWithdrawalMethods(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const response = await fetch(

        `${import.meta.env.VITE_BASE_URL}/settings/payment/withdrawalmethod/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete withdrawal method');
      }

      setWithdrawalMethods((prevMethods) => 
        prevMethods.filter((method) => method.id !== id)
      );
      setShowDeleteModal(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const WithdrawalMethodCard = ({ bank, accountNumber, name, id }) => (
    <div className="border border-gray bg-input p-4 rounded-lg mb-3 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Building2 className="text-gray-600" />
        <div>
          <p className="text-sm text-gray-800">{bank}</p>
          <p className="text-xs text-gray-500">{name}</p>
          <p className="text-xs text-gray-500">•••••{accountNumber.slice(-4)}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => {
            setSelectedMethodId(id);
            setShowDeleteModal(true);
          }}
          className="p-2 hover:bg-gray-200 rounded-full"
          disabled={isDeleting}
        >
          <Trash2 size={16} className="text-gray-600" />
        </button>
      </div>
    </div>
  );

  const DeleteConfirmationModal = () => (
    <Modal
      isOpen={showDeleteModal}
      onClose={() => !isDeleting && setShowDeleteModal(false)}
      title="Confirm Deletion"
    >
      <div className="space-y-4">
        <p className="text-gray-600">
          Are you sure you want to delete this withdrawal method?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete(selectedMethodId)}
            disabled={isDeleting}
            className="px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md disabled:bg-red-300 flex items-center gap-2"
          >
            {isDeleting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </Modal>
  );

  return (
    // <UserLayout>
    //   <div className="max-w-4xl mx-auto">
    //     <div className="p-4">
    //       <BackButton label="withdrawal" />
          
    //       {loading ? (
    //         <div className="flex justify-center items-center h-64">
    //           <Loader2 className="animate-spin w-12 h-12 text-gray-400" />
    //         </div>
    //       ) : error ? (
    //         <p className="text-red-500 text-center py-4">{error}</p>

    //       ): withdrawalMethods.length === 0 ? (
    //         <div className="min flex items-center justify-center  rounded-lg shadow-sm">
    //         <EmptyState
    //       title= 'No Skills Added Yet'
    //       description= 'Start adding your professional skills to showcase your expertise.'
    //       icon={() => (
    //        <TbCreditCardRefund  className='text-[4rem] text-text' />
    //      )}
       
    //         />
    //       </div>
    //       ): (
          
    //         <div className="space-y- mt-4">
    //           {withdrawalMethods.map((method) => (
    //             <WithdrawalMethodCard
    //               key={method.id}
    //               id={method.id}
    //               bank={method.bank_name}
    //               accountNumber={method.account_number}
    //               name={method.account_name}
    //             />
    //           ))}
              
    //           <button
    //             onClick={() => navigate('/add-withdrawal')}
    //             className="w-full md:w-auto py-3 px-6 bg-primary text-secondary rounded-full 
    //                        font-semibold hover:bg-opacity-90 transition-colors  text-[14px] duration-200"
    //           >
    //             Add a New Withdrawal Method
    //           </button>
    //         </div>
    //       )}
    //     </div>
    //     <DeleteConfirmationModal />
    //   </div>
    // </UserLayout>



      <UserLayout>
        <div className="max-w-4xl mx-auto">
          <div className="p-4">
            <BackButton label="withdrawal" />
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin w-12 h-12 text-gray-400" />
              </div>
            ) : error ? (
              <p className="text-red-500 text-center py-4">{error}</p>
            ) : withdrawalMethods.length === 0 ? (
              <div className="min flex items-center justify-center rounded-lg shadow-sm">
                <EmptyState
                  title='No withdrawal method found'
                  description='Click the button below to add one'
                  icon={() => (
                    <TbCreditCardRefund className='text-[4rem] text-text' />
                  )}
                />
              </div>
            ) : (
              <div className="space-y-4 mt-4"> {/* Fixed the space-y- class */}
                {withdrawalMethods.map((method) => (
                  <WithdrawalMethodCard
                    key={method.id}
                    id={method.id}
                    bank={method.bank_name}
                    accountNumber={method.account_number}
                    name={method.account_name}
                  />
                ))}
              </div>
            )}
            
            {/* Move the button outside the conditional rendering */}
            <div className="mt-4">
              <button
                onClick={() => navigate('/add-withdrawal')}
                className="w-full md:w-auto py-3 px-6 bg-primary text-secondary rounded-full 
                         font-semibold hover:bg-opacity-90 transition-colors text-[14px] duration-200"
              >
                Add a New Withdrawal Method
              </button>
            </div>
          </div>
          <DeleteConfirmationModal />
        </div>
      </UserLayout>
    
  );
};

export default WithdrawalManagement