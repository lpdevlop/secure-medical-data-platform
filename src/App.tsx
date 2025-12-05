import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import LoginPage from "./components/login";
import HomePage from "./components/homepage";
import Medicalrecord from "./components/medicalrecord";
import PatientMedicalRecord from "./components/patientHomePage";
import MedicalRequests from "./components/MedicalRequests";

function App() {

  return (
    <Router>
      <Routes>
          <Route path='/' element={<LoginPage/>}></Route>
          <Route path='/homepage' element={<HomePage/>}></Route>
          <Route path='/medicalrecord' element={<Medicalrecord/>}></Route>
          <Route path='/patienthomepage' element={<PatientMedicalRecord/>}></Route>
          <Route path='/medicalrequest' element={<MedicalRequests/>}></Route>
      </Routes>
    </Router>    
  )
}

export default App
