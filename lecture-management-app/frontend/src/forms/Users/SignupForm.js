import React from 'react'
import planImg from '../../assets/image02.png'
import logoImg from '../../assets/logoImg.png'
import close from '../../assets/icons/close.svg'
import axios from 'axios'
import { useState } from 'react'
import './UserForm.css'
import { ModalPopUp } from '../../components/ModalPopUp/ModalPopUp'
import { SignUpSuccess } from '../../components/ModalPopUp/SignUpSuccess'

export const SignupForm = ({onRequestClose, switchToLogin}) => {
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
      const response = await axios.post(`http://localhost:5000/api/users/signup`, userData);
      alert('Registration successful!');
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
                  <option value="" disabled>
                    Choose user role
                  </option>
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
                  <option value="" disabled>
                    Choose title
                  </option>
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
                      <button type='signup' className='font-face signup' onClick={() => openModal('SignUpSuccess')}>Register</button>
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
            <button className='user-form-close-button' onClick={onRequestClose}><img src={close} alt='logo-img' width='24px' height='24px'/></button>
        </div> 
         <ModalPopUp isOpen={modalIsOpen} onRequestClose={closeModal}>
         {modalType === 'SignUpSuccess' && <SignUpSuccess onRequestClose={closeModal}/>}
         </ModalPopUp>
    </div>
  )
}


