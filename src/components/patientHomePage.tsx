import { useState } from "react";
import { Link } from "react-router-dom";
import PatientHomeBody from "./subcomponents/PatientHomeBody"; 
import MyRecords from "./subcomponents/patientview/MyRecords";
import PatientHistory from "./subcomponents/patientview/PatientHistoryPatientView";
import ConsentSettings from "./subcomponents/patientview/ConsentSettings";

const PatientHomePage = () => {
  const [activeComponent, setActiveComponent] = useState("home");

  return (
    <div className="home-container">

      <div className="simple-sidebar">
        <h3 className="title">HealthCare Portal - Patient</h3>
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
              onClick={(e) => { e.preventDefault(); setActiveComponent("records"); }}
            >
              My Records
            </Link>
          </li>
          <li>
            <Link 
              to="#" 
              onClick={(e) => { e.preventDefault(); setActiveComponent("history"); }}
            >
              My Medical History
            </Link>
          </li>
          <li>
            <Link 
              to="#" 
              onClick={(e) => { e.preventDefault(); setActiveComponent("consent"); }}
            >
              Consent Settings
            </Link>
          </li>
        </ul>
      </div>

      <div className="request-window">
        {activeComponent === "home" && <PatientHomeBody />}
        {activeComponent === "records" && <MyRecords />}
        {activeComponent === "history" && <PatientHistory />}
        {activeComponent === "consent" && <ConsentSettings />}
      </div>
    </div>
  );
};

export default PatientHomePage;
