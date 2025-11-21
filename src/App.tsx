import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import LoginPage from "./components/login";
import HomePage from "./components/homepage";
import Medicalrecord from "./components/medicalRecord";

function App() {

  return (
    <Router>
      <Routes>
          <Route path='/' element={<LoginPage/>}></Route>
          <Route path='/homepage' element={<HomePage/>}></Route>
          <Route path='/medicalrecord' element={<Medicalrecord/>}></Route>
      </Routes>
    </Router>    
  )
}

export default App
