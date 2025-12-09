import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import LoginPage from "./components/login";
import HomePage from "./components/homepage";
import PatientMedicalRecord from "./components/patientHomePage";
import AuditLogList from './components/AuditLogList';
import SignUp from './components/SignUp';

function App() {

  return (
    <Router>
      <Routes>
          <Route path='/' element={<LoginPage/>}></Route>
          <Route path='/homepage' element={<HomePage/>}></Route>
          <Route path='/patienthomepage' element={<PatientMedicalRecord/>}></Route>
          <Route path="/audit-logs" element={<AuditLogList />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </Router>    
  )
}

export default App
