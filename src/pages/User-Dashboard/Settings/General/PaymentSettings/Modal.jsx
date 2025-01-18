import React from 'react';

const Modal = ({ isOpen, onClose, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <p className="text-lg text-center">{message}</p>
        <div className="mt-4 flex justify-around">
          <button
            onClick={onConfirm}
            className="bg-primary text-white py-2 px-4 rounded-full"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-600 py-2 px-4 rounded-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
