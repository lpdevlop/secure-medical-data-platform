import { Link } from "react-router-dom";
import { useState } from "react";

const PatientRecords = () => {

  const [records] = useState([
    {
      id: 1,
      title: "General Checkup Report",
      date: "2025-01-12",
      doctor: "Dr. John Smith"
    },
    {
      id: 2,
      title: "Blood Test Results",
      date: "2025-01-20",
      doctor: "Dr. Emily Brown"
    },
    {
      id: 3,
      title: "X-Ray Chest",
      date: "2025-02-10",
      doctor: "Dr. Michael Johnson"
    }
  ]);

  return (
    <>
      <div className="simple-sidebar">
        <h3 className="title">HealthCare Portal</h3>

        <ul className="menu">
          <li><Link to="/patient/home">Home</Link></li>
          <li><Link to="/patient/records">My Records</Link></li>
          <li><Link to="/patient/profile">My Profile</Link></li>
          <li><Link to="/patient/consent">Consent Settings</Link></li>
        </ul>
      </div>

      <div className="request-window">

        <div className="request-box" style={{ width: "600px" }}>
          <h3 className="reuqst-box-text">My Medical Records</h3>

          <table className="old-table">
            <thead>
              <tr>
                <th>Record Title</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {records.map(record => (
                <tr key={record.id}>
                  <td>{record.title}</td>
                  <td>{record.date}</td>
                  <td>{record.doctor}</td>
                  <td>
                    <button className="view-btn">View</button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </>
  );
};

export default PatientRecords;
