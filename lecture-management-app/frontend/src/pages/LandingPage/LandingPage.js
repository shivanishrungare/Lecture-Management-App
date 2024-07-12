import React from 'react'
import { Navbar } from "../../components/NavigationBar/Navbar"
import  landingPageImg from "../../assets/landingPageImg.png"
import './LandingPage.css'

export const LandingPage = () => {
  return (
    <div className='landing-page'>
      <Navbar/>
      <div className='landing-page-elements'>
        <div className='landing-page-content'>
          <h1 className='font-face'>Collaborate, plan and manage <br/>
          lectures using LPMSync</h1>
          <h2 className='font-face'>The best alternative to the traditional excel planning method and time consuming processes</h2>
          <p className='font-face'>An efficient platform that will make your lecture planning and overall management process easy and simple</p>
        </div>
        <div>
          <img src={landingPageImg} width='600px' height='500px' alt='Illustration'/>
        </div>
      </div>
    </div>
  )
}


