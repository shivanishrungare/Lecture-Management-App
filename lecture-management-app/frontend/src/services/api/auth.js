import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null); 
  const [initials, setInitials] = useState(''); 
  const [status, setStatus] = useState('pending');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); 
    const userInitials = localStorage.getItem('initials');
    const approvalStatus = localStorage.getItem('status');
    const loginUserId = localStorage.getItem('userId');

    if (token && userRole && userInitials && approvalStatus && loginUserId) { 
      setIsLoggedIn(true);
      setRole(userRole);
      setInitials(userInitials);
      setStatus(approvalStatus);
      setUserId(loginUserId);
    }
  }, []);

  const login = (token, userRole, userInitials, approvalStatus, loginUserId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    localStorage.setItem('initials', userInitials);
    localStorage.setItem('status', approvalStatus);
    localStorage.setItem('userId', loginUserId);

    setIsLoggedIn(true);
    setRole(userRole);
    setInitials(userInitials);
    setStatus(approvalStatus);
    setUserId(loginUserId);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('initials');
    localStorage.removeItem('status');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setRole(null);
    setInitials('');
    setStatus('pending');
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, initials, userId, status, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
