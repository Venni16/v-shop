import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { CartItem } from './CartContext';
import { format } from 'date-fns';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'processing' | 'shipped' | 'delivered';
  shippingAddress: {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => void;
  getOrders: () => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const getStoredOrders = (): { [userId: string]: Order[] } => {
  const storedOrders = localStorage.getItem('userOrders');
  return storedOrders ? JSON.parse(storedOrders) : {};
};

export function OrderProvider({ children }: { children: ReactNode }) {
  const [userOrders, setUserOrders] = useState<{ [userId: string]: Order[] }>(getStoredOrders());
  const { user } = useAuth();

  useEffect(() => {
    localStorage.setItem('userOrders', JSON.stringify(userOrders));
  }, [userOrders]);

  const orders = user ? userOrders[user.id] || [] : [];

  const addOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>) => {
    if (!user) return;

    const newOrder: Order = {
      ...orderData,
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      status: 'processing'
    };

    setUserOrders(current => ({
      ...current,
      [user.id]: [...(current[user.id] || []), newOrder]
    }));

    return newOrder;
  };

  const getOrders = () => orders;

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}