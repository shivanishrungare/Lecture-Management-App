import React from 'react'
import logo from '../../assets/logo4.png'
import './Navbar.css'

export const Navbar = () => {
  return (
  <div className='navbar'>
    <header>
      <nav>
        <img src={logo} width='auto' height='50px' alt='logo'/>
        <div className='navbar-buttons'>
          <button className='font-face login'>Login</button>
          <button className='font-face register'>Register</button>
        </div>
      </nav>
    </header>
  </div>
  )
}



