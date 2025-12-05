
import { useState } from 'react';
import '../App.css'

const Medicalrecord = () => {

  const records = [
    { id: "P1001", name: "Blood Report", type: "Lab Report" },
    { id: "P1002", name: "X-Ray Scan", type: "Radiology" },
    { id: "P1003", name: "Prescription", type: "Doctor Notes" },
  ];


    return (
   <div className="old-box">
      <h3>Patient Medical Records</h3>

      <table className="old-table">
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Record Name</th>
            <th>Record Type</th>
            <th>View</th>
          </tr>
        </thead>

        <tbody>
          {records.map((rec, index) => (
            <tr key={index}>
              <td>{rec.id}</td>
              <td>{rec.name}</td>
              <td>{rec.type}</td>
              <td>
                <button className="view-btn">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )







}

export default Medicalrecord;
