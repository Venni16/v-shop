import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, ArrowLeft, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

type LoginState = 'login' | 'forgot' | 'otp' | 'reset';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [loginState, setLoginState] = useState<LoginState>('login');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { login, verifyEmail, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (login(email, password)) {
      toast.success('Successfully logged in!');
      navigate('/');
    } else {
      toast.error('Invalid email or password');
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!verifyEmail(email)) {
      toast.error('Email not found. Please check your email address.');
      return;
    }

    // Generate a 6-digit OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setIsEmailSent(true);

    // Simulate email sending
    const promise = new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast.promise(promise, {
      loading: 'Sending email...',
      success: <div>
        <p>OTP sent to {email}</p>
        <p className="text-sm text-gray-600 mt-1">For demo purposes, your OTP is: {newOtp}</p>
      </div>,
      error: 'Failed to send OTP'
    });

    setLoginState('otp');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      setLoginState('reset');
    } else {
      toast.error('Invalid OTP');
    }
  };

  const handleResendOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);

    // Simulate email sending
    const promise = new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast.promise(promise, {
      loading: 'Resending OTP...',
      success: <div>
        <p>New OTP sent to {email}</p>
        <p className="text-sm text-gray-600 mt-1">For demo purposes, your new OTP is: {newOtp}</p>
      </div>,
      error: 'Failed to resend OTP'
    });
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    
    if (resetPassword(email, newPassword)) {
      toast.success('Password reset successfully! Please login with your new password.');
      setLoginState('login');
      setPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsEmailSent(false);
    } else {
      toast.error('Failed to reset password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <LogIn className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {loginState === 'login' && 'Sign in to your account'}
          {loginState === 'forgot' && 'Reset your password'}
          {loginState === 'otp' && 'Enter OTP'}
          {loginState === 'reset' && 'Create new password'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {loginState === 'login' && (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <button
                    type="button"
                    onClick={() => setLoginState('forgot')}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          )}

          {loginState === 'forgot' && (
            <div>
              <button
                onClick={() => setLoginState('login')}
                className="mb-4 flex items-center text-sm text-indigo-600 hover:text-indigo-500"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to login
              </button>
              <form className="space-y-6" onSubmit={handleForgotPassword}>
                <div>
                  <label
                    htmlFor="reset-email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="reset-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Send OTP
                </button>
              </form>
            </div>
          )}

          {loginState === 'otp' && (
            <div>
              <button
                onClick={() => setLoginState('forgot')}
                className="mb-4 flex items-center text-sm text-indigo-600 hover:text-indigo-500"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </button>
              <form className="space-y-6" onSubmit={handleOtpSubmit}>
                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Enter OTP sent to {email}
                  </label>
                  <div className="mt-1">
                    <input
                      id="otp"
                      type="text"
                      required
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter 6-digit OTP"
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-4">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Verify OTP
                  </button>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    Didn't receive OTP? Click to resend
                  </button>
                </div>
              </form>
            </div>
          )}

          {loginState === 'reset' && (
            <div>
              <button
                onClick={() => setLoginState('otp')}
                className="mb-4 flex items-center text-sm text-indigo-600 hover:text-indigo-500"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </button>
              <form className="space-y-6" onSubmit={handlePasswordReset}>
                <div>
                  <label
                    htmlFor="new-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="new-password"
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter new password"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm New Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirm-password"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Reset Password
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}