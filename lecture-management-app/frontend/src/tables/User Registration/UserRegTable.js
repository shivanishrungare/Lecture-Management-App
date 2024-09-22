import React, { useState } from 'react';
import axios from 'axios';
import { UserGenericTable } from './UserGenericTable';
import { fetchApprovedUsers, fetchPendingUsers, fetchRejectedUsers } from '../fetchData';
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

  const approveUser = async (ids) => {
    try {
      await Promise.all(
        ids.map(async (id) => {
          await axios.put(`${process.env.REACT_APP_API_URL}/api/users/approve/${id}`, { status: 'approved' });
        })
      );
      window.location.reload(); 
    } catch (error) {
      console.error('Error approving users:', error);
    }
  };


  const rejectUser = async (ids) => {
    try {
      await Promise.all(
        ids.map(async (id) => {
          await axios.put(`${process.env.REACT_APP_API_URL}/api/users/reject/${id}`, { status: 'rejected' });
        })
      );
      window.location.reload(); 
    } catch (error) {
      console.error('Error rejecting users:', error);
    }
  };

  const revertUser = async (ids) => {
    try {
      await Promise.all(
        ids.map(async (id) => {
          await axios.put(`${process.env.REACT_APP_API_URL}/api/users/revert/${id}`, { status: 'pending' });
        })
      );
      window.location.reload(); 
    } catch (error) {
      console.error('Error reverting users to pending:', error);
    }
  };


  const deleteUser = async (ids) => {
    try {
      await Promise.all(
        ids.map(async (id) => {
          await axios.delete(`${process.env.REACT_APP_API_URL}/api/users/id/${id}`);
        })
      );
      window.location.reload();
    } catch (error) {
      console.error('Error deleting users:', error);
    }
  };

  const renderComponent = () => {
    switch (activeTable) {
      case 'Pending Requests':
        return (
          <UserGenericTable
            columns={usersColumns}
            fetchData={fetchPendingUsers}
            activeTable={activeTable}
            onApprove={approveUser}
            onReject={rejectUser}
          />
        );
      case 'Approved Requests':
        return (
          <UserGenericTable
            columns={usersColumns}
            fetchData={fetchApprovedUsers}
            activeTable={activeTable}
            onRevert={revertUser}
            onDelete={deleteUser}
          />
        );
      case 'Rejected Requests':
        return (
          <UserGenericTable
            columns={usersColumns}
            fetchData={fetchRejectedUsers}
            activeTable={activeTable}
            onRevert={revertUser}
            onDelete={deleteUser}
          />
        );
      default:
        return <UserGenericTable columns={usersColumns} fetchData={fetchPendingUsers} />;
    }
  };

  return (
    <div className='admin-page-actions'>
      <h1 className="font-face page-subtitle">User Registrations</h1>
      <UserRegButtons onButtonClick={handleButtonClick} initialActiveButton={activeTable} />
      <div className="admin-table">{renderComponent()}</div>
    </div>
  );
};
