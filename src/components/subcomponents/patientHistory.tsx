import React from "react";
import "../../cssfiles/medicalhistory.css";

const PatientHistory = () => {
  // Sample patient history data
  const historyData = [
    { date: "2025-11-01", patientId: "P101", time: "10:30 AM", status: true },
    { date: "2025-10-15", patientId: "P102", time: "02:15 PM", status: false },
    { date: "2025-09-20", patientId: "P103", time: "11:00 AM", status: true },
  ];

  return (
    <div className="request-box history-box">
      <h3 className="reuqst-box-text">Patient Previous Medical History</h3>
      <table className="old-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Patient ID</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {historyData.map((record, index) => (
            <tr key={index}>
              <td>{record.date}</td>
              <td>{record.patientId}</td>
              <td>{record.time}</td>
              <td>{record.status ? "Granted" : "Pending"}</td>
              <td>
                <button
                  className="view-btn"
                  disabled={!record.status}
                >
                  {record.status ? "View" : "Access"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientHistory;
