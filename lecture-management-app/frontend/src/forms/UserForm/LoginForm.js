import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import planImg from '../../assets/image02.png';
import logoImg from '../../assets/logoImg.png';
import close from '../../assets/icons/close.svg';
import { AuthContext } from '../../services/api/auth'; 
import './UserForm.css';


export const LoginForm = ({ onRequestClose, switchToRegister }) => {
    const { login } = useContext(AuthContext);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      userName: '',
      password: ''
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };

    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/api/users/login', 
          formData, {
          headers: { 'Content-Type': 'application/json' },
        });
       
        const { token, role, initials, status, userId } = response.data;
        console.log(response.data);
        if (status === 'approved') {
          login(token, role, initials, status,  userId);
          navigate('/home');
        } else if (status === 'pending') {
            setErrorMsg('Your registration approval is still pending. Please wait for the approval');
        } else {
            setErrorMsg('Your registration is rejected. You are not verified to login');
        }
      
      } catch (err) {
        if (!err?.response) {
          setErrorMsg('No response from server');
        } else if (err.response?.status === 400) {
          setErrorMsg('Missing username or password');
        } else if (err.response?.status === 401) {
          setErrorMsg('Unauthorized');
        } else {
          setErrorMsg('Login failed');
        }
      } finally {
        setFormData({
          userName: '',
          password: ''
        });
      }
    };

    return (
      <div className='user-form-container'>
        <div className='user-form-content'>
          <form onSubmit={handleSubmit}>
            <div className='user-form-row'>
              <div className='font-face user-form-group'>
                <label className='user-form-title'>Login</label>
                {errorMsg &&  <div style={{ color: 'red', marginBottom: '10px', fontSize: '12px' }}>{errorMsg}</div>}
                <input
                  type='text'
                  className='font-face login-input-field'
                  name='userName'
                  autoComplete='off'
                  value={ formData.userName }
                  onChange={handleChange}
                  placeholder='Enter username'
                  required
                />
                <input
                  type='password'
                  className='font-face login-input-field'
                  name='password'
                  autoComplete='off'
                  value={ formData.password }
                  onChange={ handleChange }
                  placeholder='Enter password'
                  required
                />
                <button type='submit' className='font-face login'>Login</button>
                <div className='form-group-check'>
                  <div className='form-checkbox'>
                    <input type="checkbox" />
                    <label className='font-face'>Remember me</label>
                  </div>
                  <div className='forgetPwd'>
                    <a href='#'>Forgot password?</a>
                  </div>
                </div>
                <div className='register-container'>
                  <label className="font-face register-question">Don't have an account?</label>
                  <a href="#" className="register-link" onClick={switchToRegister}>Register</a>
                </div>
              </div>
            </div>
          </form>
          <div className='user-form-images'>
            <img src={logoImg} alt='logo-img' width='auto' height='60px' />
            <img src={planImg} alt='plan-img' width='auto' height='300px' />
          </div>
        </div>
        <div>
          <button className='user-form-close-button' onClick={onRequestClose}>
            <img src={close} alt='close-img' width='24px' height='24px' />
          </button>
        </div>
      </div>
    );
};
