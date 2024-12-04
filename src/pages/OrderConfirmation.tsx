import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function OrderConfirmation() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const orderNumber = location.state?.orderId;

  if (!isAuthenticated || !orderNumber) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank you for your order!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Your order has been confirmed and will be shipped soon.
          </p>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-600 mb-2">Order Number:</p>
            <p className="text-2xl font-bold text-gray-900">{orderNumber}</p>
          </div>
          <div className="flex justify-center space-x-4">
            <Link
              to="/"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              Continue Shopping
            </Link>
            <Link
              to="/orders"
              className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}