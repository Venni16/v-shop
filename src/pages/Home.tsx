import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { products, Product } from '../data/products';

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating)
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-blue-500">{rating}</span>
    </div>
  );
};

export default function Home() {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState(false);

  const searchQuery = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category');

  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = (product: Product) => {
    if (!isAuthenticated) {
      toast.error('Please login to buy items');
      navigate('/login');
      return;
    }
    addToCart(product);
    navigate('/checkout');
  };

  const allProducts = Object.values(products).flat();

  const filteredProducts = searchQuery
    ? allProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categoryParam
    ? products[categoryParam as keyof typeof products] || allProducts
    : selectedCategory
    ? products[selectedCategory as keyof typeof products]
    : allProducts;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-6">
          {/* Hero Section */}
          <div className="bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80')] h-80 rounded-lg bg-cover bg-center flex items-center justify-center mb-8">
            <div className="text-white text-center">
              <h1 className="text-5xl font-bold mb-4">Welcome to V-SHOPPING</h1>
              <p className="text-xl">Discover Amazing Deals Today</p>
            </div>
          </div>

          {searchQuery && (
            <div className="text-gray-600">
              Showing results for "{searchQuery}" ({filteredProducts.length} items)
            </div>
          )}

          {/* Mobile Category Selector */}
          <div className="md:hidden">
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="w-full bg-white p-3 rounded-lg shadow flex justify-between items-center"
            >
              <span>{selectedCategory || categoryParam || 'All Categories'}</span>
              {showCategories ? <ChevronUp /> : <ChevronDown />}
            </button>
            {showCategories && (
              <div className="mt-2 bg-white rounded-lg shadow-lg">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setShowCategories(false);
                    navigate('/');
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  All Categories
                </button>
                {Object.keys(products).map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowCategories(false);
                      navigate(`/?category=${category}`);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Category Tabs */}
          <div className="hidden md:flex space-x-4 mb-6">
            <button
              onClick={() => {
                setSelectedCategory(null);
                navigate('/');
              }}
              className={`px-4 py-2 rounded-lg ${
                !selectedCategory && !categoryParam
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {Object.keys(products).map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  navigate(`/?category=${category}`);
                }}
                className={`px-4 py-2 rounded-lg ${
                  (selectedCategory === category || categoryParam === category)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No products found</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      {product.prime && (
                        <span className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-sm text-xs font-semibold">
                          Prime
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 hover:text-blue-500">
                        {product.name}
                      </h3>
                      <div className="mt-1">
                        <RatingStars rating={product.rating} />
                        <span className="text-sm text-gray-500">
                          ({product.reviews.toLocaleString()})
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="text-xs">$</span>
                        <span className="text-2xl font-bold">{Math.floor(product.price)}</span>
                        <span className="text-sm">
                          {(product.price % 1).toFixed(2).substring(1)}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                      {product.prime && (
                        <p className="mt-2 text-sm text-gray-600">
                          FREE Prime Delivery
                        </p>
                      )}
                    </div>
                  </Link>
                  <div className="p-4 pt-0">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-sm font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    >
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => handleBuyNow(product)}
                      className="mt-2 w-full bg-orange-400 hover:bg-orange-500 text-white text-sm font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}