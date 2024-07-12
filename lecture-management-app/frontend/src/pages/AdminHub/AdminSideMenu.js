import React from 'react'
import './AdminSideMenu.css'

export const AdminSideMenu = () => {
  return (
    <div>
        <div className='admin-side-menu'>
            <p className='font-face adminHub'>Admin Hub</p>
        <div className='side-menu-links'>
            <a className='font-face'>Events and Holidays</a>
            <a className='font-face'>Courses and modules</a>
            <a className='font-face'>User registrations</a>
        </div>
        </div>      
    </div>
  )
}

