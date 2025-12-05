import React from "react";

const PatientHistory = () => {
  const historyData = [
    { date: "2025-11-01", doctor: "Dr. Smith", diagnosis: "Flu", notes: "Rest & hydration" },
    { date: "2025-10-15", doctor: "Dr. Lee", diagnosis: "Allergy", notes: "Prescribed antihistamine" },
    { date: "2025-09-20", doctor: "Dr. Patel", diagnosis: "Fracture", notes: "Cast applied" },
  ];

  return (
    <div className="request-box history-box">
      <h3 className="reuqst-box-text">My Previous Medical History</h3>
      <table className="old-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Doctor</th>
            <th>Diagnosis</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {historyData.map((record, index) => (
            <tr key={index}>
              <td>{record.date}</td>
              <td>{record.doctor}</td>
              <td>{record.diagnosis}</td>
              <td>{record.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientHistory;
