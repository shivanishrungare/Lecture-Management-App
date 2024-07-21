import React from 'react';
import { Courses } from './pages/AdminHub/Courses/Courses';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { Home } from "./pages/Home/Home";
import { AdminEvents } from './pages/AdminHub/Events/AdminEvents';
import { StatusPage } from './pages/Status/StatusPage';
import { LecturePlanForm } from './forms/LecturePlan/LecturePlanForm';
import {ProtectedRoute} from './services/api/ProtectedRoute'
import './App.css'
import { AuthProvider } from './services/api/auth';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/courses" element={<Courses/>}/>
        <Route exact path="/admin"  element={<ProtectedRoute element={AdminEvents} allowedRoles={['Admin']}/>}/>
        <Route exact path="/board" element={<StatusPage/>}/>
        <Route exact path="/event" element={<LecturePlanForm/>}/>
      </Routes>
      </BrowserRouter> 
    </div>
  )
}

export default App

