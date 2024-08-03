import React from "react";
import { GenericTable } from './GenericTable';
import { fetchPendingUsers } from './fetchData';
// import { fetchApprovedUsers } from "./fetchData";
// import { fetchRejectedUsers } from "./fetchData";

const usersColumns = [
  { id: 'firstName', label: 'first Name' },
  { id: 'lastName', label: 'last Name' },
  { id: 'role', label: 'role' },
  { id: 'email', label: 'email' },
  { id: 'userName', label: 'userName' },
  { id: 'status', label: 'status' },
]

export const UserRegTable = () => {
  return <GenericTable columns={usersColumns} fetchData={fetchPendingUsers}/>
}


