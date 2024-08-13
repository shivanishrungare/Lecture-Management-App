import React, { useState, useEffect } from 'react'
import { GenericTable } from './GenericTable';
import { fetchApprovedUsers, fetchPendingUsers, fetchRejectedUsers } from './fetchData';
import { UserRegButtons } from './UserRegButtons';

const usersColumns = [
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'role', label: 'Role' },
  { id: 'email', label: 'Email' },
  { id: 'userName', label: 'UserName' },
  { id: 'status', label: 'Status' },
];

export const UserRegTable = () => {
  const [activeTable, setActiveTable] = useState('Pending Requests');

  const handleButtonClick = (component) => {
    setActiveTable(component);
  };

  useEffect(() => {
    setActiveTable('Pending Requests');
  }, []);

  const renderComponent = () => {
    switch (activeTable) {
      case 'Pending Requests':
        return <GenericTable columns={usersColumns} fetchData={fetchPendingUsers} />;
      case 'Approved Requests':
        return <GenericTable columns={usersColumns} fetchData={fetchApprovedUsers} />;
      case 'Rejected Requests':
        return <GenericTable columns={usersColumns} fetchData={fetchRejectedUsers} />;
      default:
        return <GenericTable columns={usersColumns} fetchData={fetchPendingUsers} />;
    }
  };

  return (
    <div className='admin-page-actions'>
      <h1 className="font-face page-subtitle">User Registrations</h1>
       <UserRegButtons onButtonClick={handleButtonClick} initialActiveButton={activeTable} />
          <div className="admin-table">
            {renderComponent()}
          </div>
    </div>
  )
}




