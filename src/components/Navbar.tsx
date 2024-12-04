import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Search, Menu, X, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { products } from '../data/products';

const categories = [
  'Electronics',
  'Fashion',
  'Books',
  'Sports',
];

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { items } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Get all products for search
  const allProducts = Object.values(products).flat();

  // Filter suggestions based on search query
  const suggestions = searchQuery
    ? allProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5) // Limit to 5 suggestions
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (productId: number) => {
    navigate(`/product/${productId}`);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/?category=${encodeURIComponent(category)}`);
    setShowMobileMenu(false);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-gray-900">
      {/* Main Navbar */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16 gap-4">
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
              <ShoppingCart className="h-8 w-8 text-yellow-400" />
              <span className="font-bold text-xl text-yellow-400">V-SHOPPING</span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-3xl relative" ref={searchRef}>
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Search products..."
                    className="w-full px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setShowSuggestions(false);
                      }}
                      className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-1 rounded-r-lg"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </form>

              {/* Search Suggestions */}
              {showSuggestions && searchQuery && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
                  {suggestions.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSuggestionClick(product.id)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-3 border-b last:border-b-0"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                      <span className="text-green-600 font-medium">
                        ${product.price}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-6">
              {isAuthenticated ? (
                <>
                  <Link to="/orders" className="hidden md:flex items-center space-x-1 hover:text-yellow-400">
                    <Package className="h-5 w-5" />
                    <span>Your Orders</span>
                  </Link>
                  <Link to="/cart" className="relative group">
                    <div className="flex items-center">
                      <ShoppingCart className="h-6 w-6" />
                      <div className="ml-1 hidden md:block">
                        <div className="text-xs">Cart</div>
                        <div className="text-yellow-400 font-bold">{totalItems} items</div>
                      </div>
                    </div>
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                  <button
                    onClick={logout}
                    className="hidden md:flex items-center space-x-1 hover:text-yellow-400"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="hidden md:flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="flex items-center space-x-1 hover:text-yellow-400"
                  >
                    <User className="h-5 w-5" />
                    <div>
                      <div className="text-xs">Hello, Sign in</div>
                      <div className="font-bold">Account & Lists</div>
                    </div>
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-md hover:bg-yellow-500 font-medium"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-gray-800 text-white">
          <div className="px-4 py-2">
            {!isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  to="/login"
                  className="block py-2 hover:text-yellow-400"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block py-2 hover:text-yellow-400"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <>
                <Link
                  to="/orders"
                  className="block py-2 hover:text-yellow-400"
                >
                  Your Orders
                </Link>
                <button
                  onClick={logout}
                  className="block py-2 hover:text-yellow-400 w-full text-left"
                >
                  Logout
                </button>
              </>
            )}
            <div className="border-t border-gray-700 my-2"></div>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="block w-full text-left py-2 hover:text-yellow-400"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Categories Bar */}
      <div className="bg-gray-800 text-white hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-10 space-x-6">
            <button className="flex items-center space-x-1 hover:text-yellow-400">
              <Menu className="h-5 w-5" />
              <span>All</span>
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="text-sm hover:text-yellow-400"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}