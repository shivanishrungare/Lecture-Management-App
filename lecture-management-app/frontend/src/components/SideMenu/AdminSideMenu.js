import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SideMenu.css';

export const AdminSideMenu = ({ onMenuClick }) => {
  const [activeLink, setActiveLink] = useState('Events and Holidays');

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    onMenuClick(linkName);
  };

  useEffect(() => {
    onMenuClick(activeLink);
  }, [activeLink, onMenuClick]);

  return (
    <div>
      <div className='side-menu-container'>
        <p className='font-face page-title'>Admin Hub</p>
        <div className='side-menu-links'>
          <Link
            to="/admin/events"
            onClick={() => handleLinkClick('Events and Holidays')}
            className={`font-face admin-link-events ${activeLink === 'Events and Holidays' ? 'active' : ''}`}
          >
            Events and Holidays
          </Link>
          <Link
            to="/admin/courses"
            onClick={() => handleLinkClick('Courses and Modules')}
            className={`font-face admin-link-courses ${activeLink === 'Courses and Modules' ? 'active' : ''}`}
          >
            Courses and Modules
          </Link>
          <Link
            to="/admin/registrations" 
            onClick={() => handleLinkClick('User Registrations')}
            className={`font-face admin-link-users ${activeLink === 'User Registrations' ? 'active' : ''}`}
          >
            User Registrations
          </Link>
        </div>
      </div>
    </div>
  );
};
