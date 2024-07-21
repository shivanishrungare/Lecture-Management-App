import React from 'react'
import logo from '../../assets/logo4.png'
import notification from '../../assets/icons/notification.svg'
import './NavbarUser.css'
import { useContext } from 'react'
import { AuthContext } from '../../services/api/auth'
import { useNavigate } from 'react-router-dom'
import {NameInitialsAvatar} from 'react-name-initials-avatar';


export const NavbarUser = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      console.log('Logout button clicked');
      logout();
      navigate('/')
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className='navbar-user'>
    <header>
      <nav>
        <img src={logo} width='auto' height='45px' alt='logo'/>
        <div className='navbar-user-buttons'>
          <button><img src={notification} alt='notification' width='25px' height='25px'/></button>
          <button onClick={handleLogout}><NameInitialsAvatar name="S S" size='30px' borderWidth='1px' textSize='14px' textWeight="300"
          textColor='white' bgColor='#DF4807' borderColor='#DF4807'/></button>
        </div>
      </nav>
    </header>
  </div>
  )
}

