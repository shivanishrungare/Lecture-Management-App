import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { Home } from "./pages/Home/Home";
import { AdminHub } from './pages/AdminHub/AdminHub';
import { StatusPage } from './pages/Status/StatusPage';
import { ProtectedRoute } from '../../frontend/src/services/api/ProtectedRoute';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/admin" element={<ProtectedRoute element={AdminHub} allowedRoles={['Admin']} />} />
          <Route exact path="/board" element={<StatusPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
