import React, { useState } from 'react';
import { signInWithEmail } from '../config/auth';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg'
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../store/loadingReducer';

interface ErrorProp {
  code: string
  message: string
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [error, setError] = useState<ErrorProp | null>(null);
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(startLoading());
    try {
      await signInWithEmail(email, password)
      navigate('/')
    } catch (err) {
      if (err && typeof err === 'object' && 'message' in err) {
        setError(err as ErrorProp);
      } else {
        setError({ code: 'unknown', message: 'An unknown error occurred' });
      }
    }
    dispatch(stopLoading());

  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 font-title">
      <div className="w-full max-w-sm sm:max-w-md space-y-8 bg-[#f7f7f7] p-6 sm:p-8 rounded shadow-lg">
        <img src={Logo} />

        <form onSubmit={handleSubmit} className="mt-2 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />

            {
              error && error?.message ? <span className='text-red-400 text-xs mt-8'>{error?.message}</span> : null
            }
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a
            href="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
