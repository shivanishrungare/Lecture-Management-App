import React from 'react';
import { Courses } from './pages/AdminHub/Courses/Courses';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { Home } from "./pages/Home/Home";
import { AdminEvents } from './pages/AdminHub/Events/AdminEvents';
import './App.css'
import { StatusPage } from './pages/Status/StatusPage';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/courses" element={<Courses/>}/>
        <Route exact path="/admin" element={<AdminEvents/>}/>
        <Route exact path="/board" element={<StatusPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

