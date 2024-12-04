import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Truck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  const handleRemove = (id: number, name: string) => {
    removeFromCart(id);
    toast.success(`${name} removed from cart`);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <img
            src="https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=500&q=80"
            alt="Empty Cart"
            className="w-64 h-64 object-cover mx-auto rounded-lg mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-4">Add some products to your cart to see them here.</p>
          <a
            href="/"
            className="inline-block bg-yellow-400 text-gray-900 px-6 py-2 rounded-md hover:bg-yellow-500 font-medium"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-grow">
            <div className="bg-white rounded-lg shadow-md">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-6 border-b border-gray-200 last:border-0"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-md"
                    />
                    <div className="flex-grow ml-6">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-green-600 text-sm mt-1">In Stock</p>
                      <p className="text-sm text-gray-500 mt-1">Eligible for FREE Prime Delivery</p>
                      <div className="flex items-center mt-4 space-x-4">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 border-x">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemove(item.id, item.name)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center text-green-600 mb-4">
                <Truck className="h-5 w-5 mr-2" />
                <span className="text-sm">Your order is eligible for FREE Prime Delivery</span>
              </div>
              
              <div className="text-lg mb-4">
                Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items):
                <span className="font-bold"> ${total.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-3 px-4 rounded-md font-medium mb-3"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={handleCheckout}
                className="w-full bg-orange-400 hover:bg-orange-500 text-white py-3 px-4 rounded-md font-medium"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}