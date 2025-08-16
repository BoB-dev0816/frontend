import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loginStatus = authService.isLoggedIn();
    const token = authService.getToken();
    const userEmail = authService.getUserEmail();
    
    console.log('로그인 상태 확인:', {
      isLoggedIn: loginStatus,
      hasToken: !!token,
      userEmail: userEmail
    });
    
    setIsLoggedIn(loginStatus);
    if (loginStatus && userEmail) {
      setUser({ email: userEmail });
    }
  }, []);

  const login = (userInfo) => {
    setIsLoggedIn(true);
    setUser(userInfo);
  };

  const logout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setUser(null);
  };

  const value = {
    isLoggedIn,
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};