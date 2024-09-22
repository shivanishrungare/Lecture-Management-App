import React, { useState } from 'react';
import { NavbarUser } from '../../components/NavigationBar/NavbarUser';
import { SideBar } from '../../components/SideBarMenu/SideBar';
import { AdminSideMenu } from '../../components/SideMenu/AdminSideMenu';
import { Outlet } from 'react-router-dom'; 

export const AdminHub = () => {
  const [activeComponent, setActiveComponent] = useState('Events and Holidays');

  const handleMenuClick = (component) => {
    setActiveComponent(component);  // You can use this variable to conditionally render components or add logic
  };

  return (
    <div className='admin-main-container'>
      <NavbarUser />
      <div className='admin-body'>
        <SideBar />
        <AdminSideMenu onMenuClick={handleMenuClick} />
        
        {/* Conditionally render content based on activeComponent */}
        <div className="admin-content-area">
          {activeComponent === 'Events and Holidays' ? (
            <Outlet />
          ) : (
            <p>Selected component: {activeComponent}</p>
          )}
        </div>
      </div>
    </div>
  );
};
