import { useState } from "react";
import { Link } from "react-router-dom";
import MedicalRequests from "./subcomponents/MedicalRequests";
import HomeBody from "./subcomponents/accessRequest"; 
import PatientHistory from "./subcomponents/patientHistory"
import  PatientProfiles  from "./subcomponents/patientProfiles";
const HomePage = () => {
  const [activeComponent, setActiveComponent] = useState("home"); 

  return (
    <div className="home-container">

      <div className="simple-sidebar">
        <h3 className="title">HealthCare Portal</h3>
        <ul className="menu">
          <li>
            <Link 
              to="#" 
              onClick={(e) => { e.preventDefault(); setActiveComponent("home"); }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="#" 
              onClick={(e) => { e.preventDefault(); setActiveComponent("medical"); }}
            >
              Medical Records
            </Link>
          </li>
          <li>
           <Link 
              to="#" 
              onClick={(e) => { e.preventDefault(); setActiveComponent("medicalhistory"); }}
            >
              Medical History
            </Link>          </li>
          <li>
            <Link 
              to="#" 
              onClick={(e) => { e.preventDefault(); setActiveComponent("patientProfiles"); }}
            >
              Patient Profiles
            </Link>
          </li>
          <li>
            <Link to="/user">User Profile</Link>
          </li>
        </ul>
      </div>

      <div className="request-window">
        {activeComponent === "home" && <HomeBody />}
        {activeComponent === "medical" && <MedicalRequests />}
        {activeComponent === "medicalhistory" && <PatientHistory />}
        {activeComponent === "patientProfiles" && <PatientProfiles />}
      </div>
    </div>
  );
};

export default HomePage;
