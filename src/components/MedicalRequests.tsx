import { useState } from "react";
import "../cssfiles/MedicalRequests.css"
const MedicalRequests = () => {
  // Sample data, replace with API call later
  const [requests, setRequests] = useState([
    { id: 1, patient: "John Doe", record: "Blood Test", status: "Pending" ,time:"33.33"},
    { id: 2, patient: "Mary Smith", record: "X-Ray Chest", status: "Approved",time:"43.33" },
    { id: 3, patient: "Kevin Brown", record: "Prescription History", status: "Denied",time:"65.33" },
  ]);

  // Handler to simulate Access click
  const handleAccess = (request: { id?: number; patient: any; record: any; status: any; }) => {
    if (request.status === "Approved") {
      alert(`Accessing ${request.record} for ${request.patient}`);
    } else {
      alert(`Access denied. Request status: ${request.status}`);
    }
  };

  return (
    <div className="main-body">
      <div className="request-box" style={{ width: "700px" }}>
        <h3>Medical Records</h3>

        <table className="old-table">
          <thead>
            <tr>
              <th>Patient Id</th>
              <th>Record</th>
              <th>Status</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.patient}</td>
                <td>{req.record}</td>
                <td>{req.status}</td>
                <td>{req.time}</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => handleAccess(req)}
                    disabled={req.status !== "Approved"}
                  >
                    Access
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicalRequests;
