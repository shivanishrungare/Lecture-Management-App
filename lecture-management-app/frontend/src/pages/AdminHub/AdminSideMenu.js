import React from 'react'
import './AdminSideMenu.css'

export const AdminSideMenu = () => {
  return (
    <div>
        <div className='admin-side-menu'>
            <p className='font-face adminHub'>Admin Hub</p>
        <div className='side-menu-links'>
            <a className='font-face admin-links'>Events and Holidays</a>
            <a className='font-face admin-links'>Courses and modules</a>
            <a className='font-face admin-links'>User registrations</a>
        </div>
        </div>      
    </div>
  )
}

