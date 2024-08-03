import React, { useState } from 'react';
import { NavbarUser } from '../../components/NavigationBar/NavbarUser';
import { SideBar } from '../../components/SideBarMenu/SideBar';
import { AdminSideMenu } from '../../components/SideMenu/AdminSideMenu';
import { AdminEvents } from './Events/AdminEvents';
import { AdminCourses } from './Courses/AdminCourses';
import { UserRegistrations } from './UserRegistrations/UserRegistrations';

export const AdminHub = () => {
  const [activeComponent, setActiveComponent] = useState('Events and Holidays');

  const handleMenuClick = (component) => {
    setActiveComponent(component);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Events and Holidays':
        return <AdminEvents />;
      case 'Courses and Modules':
        return <AdminCourses />;
      case 'User Registrations':
        return <UserRegistrations />;
      default:
        return <AdminEvents />;
    }
  };

  return (
    <div className='admin-main-container'>
      <NavbarUser />
      <div className='admin-body'>
        <SideBar />
        <AdminSideMenu onMenuClick={handleMenuClick} />
        <div className="admin-content-area">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};
