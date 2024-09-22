import React from 'react';
import { NavbarUser } from './NavbarUser';
import { Navbar } from './Navbar';
import { AuthContext } from '../../services/api/auth';
import { useContext } from 'react';

export const Header = () => {
const { isLoggedIn } = useContext(AuthContext);

  return (
    <div>
      {isLoggedIn ? (
        <NavbarUser /> 
      ) : (
        <Navbar /> 
      )}
    </div>
  );
};



