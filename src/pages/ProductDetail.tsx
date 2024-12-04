import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Star, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { products, Product } from '../data/products';

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < Math.floor(rating)
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-2 text-lg text-blue-500">{rating}</span>
    </div>
  );
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const allProducts = Object.values(products).flat();
  const product = allProducts.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      toast.error('Please login to buy items');
      navigate('/login');
      return;
    }
    // Add buy now logic here
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2">
              <div className="relative h-96 md:h-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.prime && (
                  <span className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-sm text-sm font-semibold">
                    Prime
                  </span>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center mb-4">
                  <RatingStars rating={product.rating} />
                  <span className="ml-2 text-gray-600">
                    ({product.reviews.toLocaleString()} reviews)
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-4">
                  <span className="text-lg">$</span>
                  {Math.floor(product.price)}
                  <span className="text-xl">
                    {(product.price % 1).toFixed(2).substring(1)}
                  </span>
                </div>
                <p className="text-gray-600 text-lg mb-6">{product.description}</p>
                {product.prime && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <p className="text-green-600 font-medium">
                      FREE Prime Delivery
                    </p>
                    <p className="text-sm text-gray-600">
                      Get it by tomorrow if you order within 6 hours
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="w-full bg-orange-400 hover:bg-orange-500 text-white font-medium py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}