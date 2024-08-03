import React from 'react'
import logo from '../../assets/logo4.png'
import notification from '../../assets/icons/notification.svg'
import './NavbarUser.css'
import { useContext } from 'react'
import { AuthContext } from '../../services/api/auth'
import { useNavigate } from 'react-router-dom'


export const NavbarUser = () => {
  const { logout, initials } = useContext(AuthContext);
  console.log('User initials:', initials);
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
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
          {initials ? (
          <button className='profile' onClick={handleLogout}>
          SS
          </button>) : (
            <button className='profile' onClick={handleLogout}>Logout</button>
          )}
        </div>
      </nav>
    </header>
  </div>
  )
}

