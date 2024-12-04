import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useOrders } from '../contexts/OrderContext';
import { CreditCard, Truck, Shield, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

interface DeliveryAddress {
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

interface PaymentMethod {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const [step, setStep] = useState<'address' | 'payment' | 'review'>('address');
  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'express'>('standard');
  
  const [address, setAddress] = useState<DeliveryAddress>({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });

  const [payment, setPayment] = useState<PaymentMethod>({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('review');
  };

  const handlePlaceOrder = () => {
    if (!user) return;

    const order = {
      userId: user.id,
      items: items,
      total: total + (deliverySpeed === 'express' ? 14.99 : 4.99),
      shippingAddress: address
    };

    const newOrder = addOrder(order);
    clearCart();
    navigate('/order-confirmation', { state: { orderId: newOrder?.id } });
    toast.success('Order placed successfully!');
  };

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + (deliverySpeed === 'express' ? 2 : 5));

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div className={`flex items-center ${step === 'address' ? 'text-blue-600' : 'text-gray-500'}`}>
              <MapPin className="h-6 w-6" />
              <span className="ml-2">Address</span>
            </div>
            <div className="w-16 h-1 mx-4 bg-gray-300" />
            <div className={`flex items-center ${step === 'payment' ? 'text-blue-600' : 'text-gray-500'}`}>
              <CreditCard className="h-6 w-6" />
              <span className="ml-2">Payment</span>
            </div>
            <div className="w-16 h-1 mx-4 bg-gray-300" />
            <div className={`flex items-center ${step === 'review' ? 'text-blue-600' : 'text-gray-500'}`}>
              <Shield className="h-6 w-6" />
              <span className="ml-2">Review</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-grow">
            {step === 'address' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                <form onSubmit={handleAddressSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      required
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
                    <input
                      type="text"
                      required
                      value={address.addressLine1}
                      onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
                    <input
                      type="text"
                      value={address.addressLine2}
                      onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">City</label>
                      <input
                        type="text"
                        required
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">State</label>
                      <input
                        type="text"
                        required
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                      <input
                        type="text"
                        required
                        value={address.zipCode}
                        onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="tel"
                        required
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {step === 'payment' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Card Number</label>
                    <input
                      type="text"
                      required
                      maxLength={16}
                      value={payment.cardNumber}
                      onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name on Card</label>
                    <input
                      type="text"
                      required
                      value={payment.cardName}
                      onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={payment.expiry}
                        onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">CVV</label>
                      <input
                        type="text"
                        required
                        maxLength={3}
                        value={payment.cvv}
                        onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  >
                    Continue to Review
                  </button>
                </form>
              </div>
            )}

            {step === 'review' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Review Order</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Shipping Address</h3>
                    <p className="text-gray-600">
                      {address.fullName}<br />
                      {address.addressLine1}<br />
                      {address.addressLine2 && <>{address.addressLine2}<br /></>}
                      {address.city}, {address.state} {address.zipCode}<br />
                      Phone: {address.phone}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Payment Method</h3>
                    <p className="text-gray-600">
                      Card ending in {payment.cardNumber.slice(-4)}<br />
                      Expiry: {payment.expiry}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Delivery Option</h3>
                    <p className="text-gray-600">
                      {deliverySpeed === 'express' ? 'Express Delivery' : 'Standard Delivery'}<br />
                      Estimated delivery: {deliveryDate.toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Items ({items.length}):</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span>{deliverySpeed === 'express' ? '$14.99' : '$4.99'}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span>Total:</span>
                  <span>${(total + (deliverySpeed === 'express' ? 14.99 : 4.99)).toFixed(2)}</span>
                </div>

                {/* Delivery Options */}
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Delivery Options</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={deliverySpeed === 'standard'}
                        onChange={() => setDeliverySpeed('standard')}
                        className="text-blue-600"
                      />
                      <span className="ml-2">
                        <span className="font-medium">Standard Delivery</span>
                        <br />
                        <span className="text-sm text-gray-500">5-7 business days ($4.99)</span>
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={deliverySpeed === 'express'}
                        onChange={() => setDeliverySpeed('express')}
                        className="text-blue-600"
                      />
                      <span className="ml-2">
                        <span className="font-medium">Express Delivery</span>
                        <br />
                        <span className="text-sm text-gray-500">2-3 business days ($14.99)</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}