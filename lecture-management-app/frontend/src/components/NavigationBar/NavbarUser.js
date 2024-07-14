import React from 'react'
import logo from '../../assets/logo4.png'
import notification from '../../assets/icons/notification.svg'
import profile from '../../assets/icons/profile.svg'
import './NavbarUser.css'

export const NavbarUser = () => {
  return (
    <div className='navbar-user'>
    <header>
      <nav>
        <img src={logo} width='auto' height='45px' alt='logo'/>
        <div className='navbar-user-buttons'>
          <button><img src={notification} alt='notification' width='25px' height='25px'/></button>
          <button><img src={profile} alt='profile' width='30px' height='30px'/></button>
        </div>
      </nav>
    </header>
  </div>
  )
}

