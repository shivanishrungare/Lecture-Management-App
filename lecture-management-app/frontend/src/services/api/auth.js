
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null); 
  // const [user, setUser] = useState(null); 
 

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); 
    // const userData = localStorage.getItem('user');
    // localStorage.setItem('user', JSON.stringify(userData));
    if (token && userRole) {
      setIsLoggedIn(true);
      setRole(userRole);
      // setUser(userData);
    }
  }, []);

  const login = (token, userRole) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    // localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setRole(userRole);
    // setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // localStorage.removeItem('user');
    setIsLoggedIn(false);
    setRole(null);
    // setUser(null);
    // setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
