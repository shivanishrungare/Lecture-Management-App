import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { Home } from "./pages/Home/Home";
import { AdminHub } from './pages/AdminHub/AdminHub';
import { AdminEvents } from './pages/AdminHub/Events/AdminEvents';
import { AdminCourses } from './pages/AdminHub/Courses/AdminCourses';
import { UserRegistrations } from './pages/AdminHub/UserRegistrations/UserRegistrations';
import { StatusPage } from './pages/Status/StatusPage';
import { LecturePlan } from './pages/Planning/LecturePlan';
import { ProtectedRoute } from '../../frontend/src/services/api/ProtectedRoute';
import './App.css';
import Help from './pages/Help/Help';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} /> 
          <Route exact path="/home" element={<ProtectedRoute element={Home}/>} />
          <Route exact path="/admin" element={<ProtectedRoute element={AdminHub} allowedRoles={['Admin']} />} >
          <Route path="events" element={<AdminEvents />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="registrations" element={<UserRegistrations />} />
          </Route>
          <Route exact path="/board" element={<StatusPage />} />
          <Route exact path="/lecturePlan/:moduleId" element={<LecturePlan />} />
          <Route exact path="/help" element={<Help/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
