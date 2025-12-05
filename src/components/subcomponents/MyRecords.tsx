import React, { useState } from "react";
import "../../cssfiles/MyRecords.css"; 

const MyRecords = () => {
  const [records] = useState([
    { id: 1, doctor: "Dr. John Smith", type: "Blood Test", date: "2025-11-01" },
    { id: 2, doctor: "Dr. Emily Brown", type: "X-Ray", date: "2025-10-15" },
  ]);

  return (
    <div className="records-container">
      <h3 className="records-title">My Medical Records</h3>
      <table className="records-table">
        <thead>
          <tr>
            <th>Record ID</th>
            <th>Doctor</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec) => (
            <tr key={rec.id}>
              <td>{rec.id}</td>
              <td>{rec.doctor}</td>
              <td>{rec.type}</td>
              <td>{rec.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyRecords;
