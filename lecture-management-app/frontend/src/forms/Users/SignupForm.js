import React, { useState } from 'react';
import planImg from '../../assets/image02.png';
import logoImg from '../../assets/logoImg.png';
import close from '../../assets/icons/close.svg';
import axios from 'axios';
import './UserForm.css';
import { ModalPopUp } from '../../utils/ModalPopUp/ModalPopUp';
import { SignUpSuccess } from '../../utils/ModalPopUp/SignUpSuccess';

export const SignupForm = ({ onRequestClose, switchToLogin }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const openModal = (type) => {
    setModalType(type);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalType('');
  };

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    role: '',
    title: '',
    email: '',
    userName: '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordConfirmChange = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      passwordConfirm: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (userData.password !== userData.passwordConfirm) {
      setError('Passwords do not match.');
      return;
    }

    if (userData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/users/register`, {
        firstName: userData.firstName,  
        lastName: userData.lastName,
        role: userData.role,
        title: userData.title,
        email: userData.email,
        userName: userData.userName,  // Ensure this matches server-side field name
        password: userData.password,
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      const { token } = response.data;

      // Store the token (you can use localStorage or cookies as per your security requirements)
      localStorage.setItem('token', token);

      // Open the success modal
      openModal('SignUpSuccess');

      // Clear form data
      setUserData({
        firstName: '',
        lastName: '',
        role: '',
        title: '',
        email: '',
        userName: '',
        password: '',
        passwordConfirm: '',
      });
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className='user-form-container'>
      <div className='user-form-content'>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className='user-form-row'>
            <div className='font-face user-form-group'>
              <label className='user-form-title'>Create Account</label>
              <div className='user-form-row-inputs'>
                <select
                  className="input-field"
                  name="role"
                  value={userData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Choose user role</option>
                  <option value="Admin">Admin</option>
                  <option value="Professor">Professor</option>
                </select>
                <select
                  className="input-field"
                  name="title"
                  value={userData.title}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Choose title</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Dr.">Dr.</option>
                  <option value="Miss.">Miss.</option>
                </select>
              </div>
              <div className='user-form-row-inputs'>
                <input
                  type="text"
                  className="font-face input-field"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                  placeholder="Enter firstname"
                  required
                />
                <input
                  type="text"
                  className="font-face input-field"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                  placeholder="Enter lastname"
                  required
                />
              </div>
              <div className="user-form-row-inputs">
                <input
                  type="email"
                  className="font-face input-field"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
                <input
                  type="text"
                  className="font-face input-field"
                  name="userName"
                  value={userData.userName}
                  onChange={handleChange}
                  placeholder="Create username"
                  required
                />
              </div>
              <div className="user-form-row-inputs">
                <input
                  type="password"
                  className="font-face input-field"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  required
                />
                <input
                  type="password"
                  className="font-face input-field"
                  value={userData.passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                  placeholder="Confirm password"
                  required
                />
              </div>
              <button type="submit" className="font-face signup">Register</button>
              <div className='register-container'>
                <label className="font-face">Already have an account?</label>
                <a href="#" className="font-face register-link" onClick={switchToLogin}>Login</a>
              </div>
            </div>
          </div>
        </form>
        <div className='user-form-images'>
          <img src={logoImg} alt='logo-img' width='auto' height='60px'/>
          <img src={planImg} alt='plan-img' width='auto' height='300px'/>
        </div>
      </div> 
      <div>
        <button className='user-form-close-button' onClick={onRequestClose}>
          <img src={close} alt='close-img' width='24px' height='24px'/>
        </button>
      </div> 
      <ModalPopUp isOpen={modalIsOpen} onRequestClose={closeModal}>
        {modalType === 'SignUpSuccess' && <SignUpSuccess onRequestClose={closeModal}/>}
      </ModalPopUp>
    </div>
  );
};
