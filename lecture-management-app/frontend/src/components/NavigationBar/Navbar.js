import React from 'react'
import logo from '../../assets/logo4.png'
import { useState } from 'react';
import { ModalForm } from '../../forms'
import { LoginForm } from '../../forms/Users/LoginForm'
import { SignupForm } from '../../forms/Users/SignupForm'
import './Navbar.css'

export const Navbar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formType, setFormType] = useState('');

  const openModal = (type) => {
    setFormType(type);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFormType('');
  };

  return (
  <div className='navbar'>
    <header>
      <nav>
        <img src={logo} width='auto' height='45px' alt='logo'/>
        <div className='navbar-buttons'>
          <button className='font-face login' onClick={() => openModal('loginForm')}>Login</button>
          <button className='font-face register' onClick={() => openModal('signupForm')}>Register</button>
        </div>
      </nav>
      </header>
      <ModalForm isOpen={modalIsOpen} onRequestClose={closeModal}>
        {formType === 'loginForm' && <LoginForm onRequestClose={closeModal} switchToRegister={() => openModal('signupForm')}/>}
        {formType === 'signupForm' && <SignupForm onRequestClose={closeModal} switchToLogin={() => openModal('loginForm')}/>}
      </ModalForm>
  </div>
  )
}



