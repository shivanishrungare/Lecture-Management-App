
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null); 
  const [initials, setInitials] = useState(''); 
 

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); 
    const userInitials= localStorage.getItem('initials');
    if (token && userRole && userInitials) {
      setIsLoggedIn(true);
      setRole(userRole);
      setInitials(userInitials);
    }
  }, []);

  const login = (token, userRole, userInitials) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    localStorage.setItem('initials', userInitials);
    setIsLoggedIn(true);
    setRole(userRole);
    setInitials(userInitials);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('initials');
    setIsLoggedIn(false);
    setRole(null);
    setInitials('');
  };


  return (
    <AuthContext.Provider value={{ isLoggedIn, role, initials, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
