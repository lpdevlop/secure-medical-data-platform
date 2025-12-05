import { Link } from "react-router-dom";
import { useState } from "react";

const PatientHomePage = () => {

  // Sample dummy requests (replace with API later)
  const [requests, setRequests] = useState([
    { id: 1, doctor: "Dr. John Smith", reason: "Needs to review your medical history", status: "Pending" },
    { id: 2, doctor: "Dr. Emily Brown", reason: "Follow-up appointment data access", status: "Pending" }
  ]);

  const handleApprove = (id: number) => {
    setRequests(req => req.map(r => r.id === id ? { ...r, status: "Approved" } : r));
  };

  const handleReject = (id: number) => {
    setRequests(req => req.map(r => r.id === id ? { ...r, status: "Rejected" } : r));
  };

  return (
    <>
      {/* Sidebar */}
      <div className="simple-sidebar">
        <h3 className="title">HealthCare Portal</h3>

        <ul className="menu">
          <li><Link to="/patient/home">Home</Link></li>
          <li><Link to="/patient/records">My Records</Link></li>
          <li><Link to="/patient/profile">My Profile</Link></li>
          <li><Link to="/patient/consent">Consent Settings</Link></li>
        </ul>
      </div>

      {/* Main Window */}
      <div className="request-window">

        <div className="request-box" style={{ width: "450px" }}>
          <h3 className="reuqst-box-text">Doctor Access Requests</h3>

          {requests.map(req => (
            <div key={req.id} className="old-box" style={{ textAlign: "left" }}>
              <strong>Doctor:</strong> {req.doctor} <br />
              <strong>Reason:</strong> {req.reason} <br />
              <strong>Status:</strong> {req.status} <br /><br />

              {req.status === "Pending" && (
                <div style={{ display: "flex", gap: "10px" }}>
                  <button className="send-btn" onClick={() => handleApprove(req.id)}>Approve</button>
                  <button className="send-btn" onClick={() => handleReject(req.id)}>Reject</button>
                </div>
              )}
            </div>
          ))}

        </div>

      </div>
    </>
  );
};

export default PatientHomePage;
