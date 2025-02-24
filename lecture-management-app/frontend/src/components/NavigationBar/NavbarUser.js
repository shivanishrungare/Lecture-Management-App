import React from 'react';
import logo from '../../assets/logo4.png';
import notification from '../../assets/icons/notification.svg';
import './NavbarUser.css';
import { useContext } from 'react';
import { AuthContext } from '../../services/api/auth';
import { useNavigate } from 'react-router-dom';
import { Avatar, Tooltip } from '@mui/material';
import { NavLink } from 'react-router-dom';

function getColorByInitial(initial) {
  const colors = [
    '#F44336', '#E91E63', '#9C27B0', '#3F51B5', '#009688', '#00BCD4',
    '#4CAF50', '#FFC107', '#FF9800', '#FF5722', '#795548', '#607D8B',
  ];
  const index = initial.charCodeAt(0) % colors.length;
  return colors[index];
}

export const NavbarUser = () => {
  const { logout, initials } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout();
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className='navbar-user'>
      <header>
        <nav>
        <NavLink to='/home'><img src={logo} width='auto' height='45px' alt='logo'/></NavLink>
          <div className='navbar-user-buttons'>
            <button><img src={notification} alt='notification' width='25px' height='25px'/></button>
            {initials ? (
              <Tooltip title="Logout">
              <button className='profile' onClick={handleLogout}>
                <Avatar 
                  sx={{ 
                    width: 30, 
                    height: 30, 
                    fontSize: '12px', 
                    fontWeight: 400, 
                    border: '1px solid #DF4807', 
                    bgcolor: getColorByInitial(initials.charAt(0)) 
                  }}
                >
                  {initials}
                </Avatar>
              </button>
              </Tooltip>
            ) : (
            <button className='profile' >Logout</button>  
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};
