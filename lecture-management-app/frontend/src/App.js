import React from 'react'
import { Courses } from './pages/AdminHub/Courses/Courses';
import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route exact path="/courses" element={<Courses/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

