import React, { useState } from 'react';
import { NavbarUser } from '../../components/NavigationBar/NavbarUser';
import { SideBar } from '../../components/SideBarMenu/SideBar';
import { AdminSideMenu } from '../../components/SideMenu/AdminSideMenu';
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routes

export const AdminHub = () => {
  const [activeComponent, setActiveComponent] = useState('Events and Holidays');

  const handleMenuClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className='admin-main-container'>
      <NavbarUser />
      <div className='admin-body'>
        <SideBar />
        <AdminSideMenu onMenuClick={handleMenuClick} />
        <div className="admin-content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
