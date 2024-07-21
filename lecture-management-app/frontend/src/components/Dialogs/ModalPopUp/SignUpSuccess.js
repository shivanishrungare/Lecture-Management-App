import React from 'react'
import success from '../../assets/icons/success.svg'
import './SuccessModal.css'


export const SignUpSuccess = ({onRequestClose}) => {
  return (
    <div className='success-modal-main'>
        <div className='success-modal'>
            <div className='success-modal-content'>
                <img src={success} alt='success' width='60px' height='60px'/>
                <h1 className='font-face modal-title'>Registration Successful</h1>
            </div>
            <div className='success-modal-message'>
                <p className='font-face'>Your account must be manually approved by admin <br/> 
                You will receive an email once your account is verified</p>
                <button className='modal-popup-button' onClick={onRequestClose}>Ok</button>
            </div>
        </div>     
    </div>
  )
}

