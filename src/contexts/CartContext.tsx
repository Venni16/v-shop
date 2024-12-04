import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface UserCart {
  [userId: string]: CartItem[];
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Get stored carts from localStorage
const getStoredCarts = (): UserCart => {
  const storedCarts = localStorage.getItem('userCarts');
  return storedCarts ? JSON.parse(storedCarts) : {};
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [userCarts, setUserCarts] = useState<UserCart>(getStoredCarts());
  const { user } = useAuth();

  // Persist carts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userCarts', JSON.stringify(userCarts));
  }, [userCarts]);

  // Get current user's cart items
  const items = user ? userCarts[user.id] || [] : [];

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    if (!user) return;

    setUserCarts(currentCarts => {
      const userCart = currentCarts[user.id] || [];
      const existingItem = userCart.find(item => item.id === product.id);
      
      const updatedUserCart = existingItem
        ? userCart.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...userCart, { ...product, quantity: 1 }];

      return {
        ...currentCarts,
        [user.id]: updatedUserCart
      };
    });
  };

  const removeFromCart = (id: number) => {
    if (!user) return;

    setUserCarts(currentCarts => ({
      ...currentCarts,
      [user.id]: (currentCarts[user.id] || []).filter(item => item.id !== id)
    }));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (!user) return;

    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setUserCarts(currentCarts => ({
      ...currentCarts,
      [user.id]: (currentCarts[user.id] || []).map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    }));
  };

  const clearCart = () => {
    if (!user) return;
    
    setUserCarts(currentCarts => ({
      ...currentCarts,
      [user.id]: []
    }));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}