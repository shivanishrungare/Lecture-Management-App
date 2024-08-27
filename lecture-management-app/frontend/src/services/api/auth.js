
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null); 
  const [initials, setInitials] = useState(''); 
  const [status, setStatus] = useState('pending')
 

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); 
    const userInitials= localStorage.getItem('initials');
    const approvalStatus= localStorage.getItem('status')
    if (token && userRole && userInitials && approvalStatus) {
      setIsLoggedIn(true);
      setRole(userRole);
      setInitials(userInitials);
      setStatus(approvalStatus);
    }
  }, []);

  const login = (token, userRole, userInitials, approvalStatus) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    localStorage.setItem('initials', userInitials);
    localStorage.setItem('status', approvalStatus);
    setIsLoggedIn(true);
    setRole(userRole);
    setInitials(userInitials);
    setStatus(approvalStatus);
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
    <AuthContext.Provider value={{ isLoggedIn, role, initials, status, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
