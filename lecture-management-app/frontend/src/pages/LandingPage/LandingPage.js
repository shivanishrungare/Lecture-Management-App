import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../services/api/auth';
import { Header } from '../../components/NavigationBar/Header';
import landingPageImg from '../../assets/image01.png';
import './LandingPage.css';

export const LandingPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home'); // Redirect to home if already logged in
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className='landing-page'>
      <Header />
      <div className='landing-page-elements'>
        <div className='landing-page-content'>
          <h1 className='font-face'>Collaborate, plan and manage <br/>
          lectures using LPMSync</h1>
          <h2 className='font-face'>The best alternative to the traditional excel planning method and time-consuming processes</h2>
          <p className='font-face'>An efficient platform that will make your lecture planning and overall management process easy and simple</p>
        </div>
        <div>
          <img src={landingPageImg} width='600px' height='500px' alt='Illustration'/>
        </div>
      </div>
    </div>
  );
};
