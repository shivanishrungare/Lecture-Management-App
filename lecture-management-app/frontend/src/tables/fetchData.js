import axios from 'axios';

export const fetchCourses = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/courses`);
  return response.data.map(course => ({
    id: course._id,
    studyProgram: course.studyProgram,
    moduleName: course.moduleName,
    creditPoints: course.creditPoints,
    language: course.language,
    moduleDetails: course.moduleDetails,
  }));
};

export const fetchEvents = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/events`);
  return response.data.map(event => ({
    id: event._id,
    startDate: event.startDate, 
    endDate: event.endDate, 
    startTime: event.startTime, 
    endTime: event.endTime, 
    eventDetails: event.eventDetails, 
    eventType: event.eventType,
    status: event.status,
  }));
}; 

export const fetchPendingUsers = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/pendingUsers`);
  const users = response.data.users;
  return users.map(pendingUser => ({
    id: pendingUser._id,
    firstName: pendingUser.firstName, 
    lastName : pendingUser.lastName, 
    role: pendingUser.role,  
    email: pendingUser.email, 
    userName: pendingUser.userName, 
    status: pendingUser.status,
  }));
}; 

export const fetchApprovedUsers = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/approvedUsers`);
  const users = response.data.users;
  return users.map(approvedUser => ({
    id: approvedUser._id,
    firstName: approvedUser.firstName, 
    lastName : approvedUser.lastName, 
    role: approvedUser.role,  
    email: approvedUser.email, 
    userName: approvedUser.userName, 
    status: approvedUser.status,
  }));
};

export const fetchRejectedUsers = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/rejectedUsers`);
  const users = response.data.users;
  return users.map(rejectedUser => ({
    id: rejectedUser._id,
    firstName: rejectedUser.firstName, 
    lastName : rejectedUser.lastName, 
    role: rejectedUser.role,  
    email: rejectedUser.email, 
    userName: rejectedUser.userName, 
    status: rejectedUser.status,
  }));
};

