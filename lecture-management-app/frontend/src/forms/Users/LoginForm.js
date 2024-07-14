import React from 'react'
import planImg from '../../assets/image02.png'
import logoImg from '../../assets/logoImg.png'
import close from '../../assets/icons/close.svg'
import './UserForm.css'
import { Link } from 'react-router-dom'

export const LoginForm = ({onRequestClose, switchToRegister}) => {
  return (
    <div className='user-form-container'>
        <div className='user-form-content'>
        <form>
            <div className='user-form-row'>
                <div className='font-face user-form-group'>
                      <label className='user-form-title'>Login</label>
                      <input type='text' className='font-face login-input-field' placeholder='Enter username' />
                      <input type='text' className='font-face login-input-field' placeholder='Enter password' />
                      <Link to='/board'><button type='login' className='font-face login'>Login</button></Link>
                    <div className='form-group-check'>
                    <div className='form-checkbox' >
                      <input type="checkbox"/>
                    <label className='font-face'>Remember me</label>
                    </div>
                    <div className='forgetPwd'>
                      <a>Forgot password?</a>
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
            <img src={logoImg} alt='logo-img' width='auto' height='60px'/>
            <img src={planImg} alt='plan-img' width='auto' height='300px'/>
        </div>
      </div>
      <div>
            <button className='user-form-close-button' onClick={onRequestClose}><img src={close} alt='logo-img' width='24px' height='24px'/></button>
        </div>
    </div>
  )
}

