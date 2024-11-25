import React from 'react';

interface ConfirmEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResendEmail: () => void;
  onConfirm: ()=>void
}

const ConfirmEmailModal: React.FC<ConfirmEmailModalProps> = ({
  isOpen,
  onClose,
  onResendEmail,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded shadow-lg text-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Confirm Your Email</h2>
        <p className="mt-4 text-gray-600">
          We have sent a confirmation email to the address you provided. Please check your inbox and click the link to activate your account.
        </p>
        <p className="mt-2 text-gray-600">
          If you haven't received the email, check your spam folder or click the button below to resend it.
        </p>

        <div className='gap-1 flex flex-col'>
          <button
            onClick={onResendEmail}
            className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Resend Confirmation Email
          </button>
          <button
          onClick={onConfirm}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
          >
            Okay, log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmailModal;
