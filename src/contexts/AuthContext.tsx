import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => boolean;
  logout: () => void;
  resetPassword: (email: string, newPassword: string) => boolean;
  verifyEmail: (email: string) => boolean;
}

interface StoredUser {
  email: string;
  password: string;
  id: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Get stored users from localStorage
const getStoredUsers = (): { [email: string]: StoredUser } => {
  const storedUsers = localStorage.getItem('users');
  return storedUsers ? JSON.parse(storedUsers) : {};
};

// Get stored current user from localStorage
const getStoredCurrentUser = (): User | null => {
  const storedUser = localStorage.getItem('currentUser');
  return storedUser ? JSON.parse(storedUser) : null;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<{ [email: string]: StoredUser }>(getStoredUsers());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getStoredCurrentUser());
  const [user, setUser] = useState<User | null>(getStoredCurrentUser());

  // Persist users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // Persist current user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  const login = (email: string, password: string) => {
    const userExists = users[email];
    if (userExists && userExists.password === password) {
      setIsAuthenticated(true);
      setUser({ id: userExists.id, email });
      return true;
    }
    return false;
  };

  const signup = (email: string, password: string) => {
    if (users[email]) {
      return false; // User already exists
    }
    
    const userId = Math.random().toString(36).substr(2, 9);
    const newUser = { email, password, id: userId };
    
    setUsers(prevUsers => ({
      ...prevUsers,
      [email]: newUser
    }));
    
    return true;
  };

  const verifyEmail = (email: string) => {
    return !!users[email];
  };

  const resetPassword = (email: string, newPassword: string) => {
    const userExists = users[email];
    if (!userExists) {
      return false;
    }

    setUsers(prevUsers => ({
      ...prevUsers,
      [email]: {
        ...prevUsers[email],
        password: newPassword
      }
    }));

    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      signup, 
      logout, 
      resetPassword,
      verifyEmail 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}