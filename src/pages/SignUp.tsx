import React, {  useState } from 'react';
import { resendConfirmationEmail, signUpWithEmail } from '../config/auth';
import { useNavigate } from 'react-router-dom';
import ConfirmEmailModal from '../components/ConfirmEmail';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log({ email, password });
    try {
      await signUpWithEmail(email, password)
      setIsModalOpen(true)
    } catch (error) {
      alert(error)
    }


    // navigate('/')
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleResend = async () => {
    try {
      await resendConfirmationEmail(email); // Replace `userEmail` with the user's email address
      alert('Confirmation email resent successfully!');
    } catch (err) {
      alert('Failed to resend confirmation email. Please try again later.');
    }
  };

  const proceed = () => {
    navigate('/login')
  }



  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Create a password"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
          >
            Sign Up
          </button>
        </form>
      </div>


      <ConfirmEmailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onResendEmail={handleResend}
        onConfirm={() => proceed()}
      />
    </div>
  );
};

export default SignUp;
