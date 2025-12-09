import React, { useEffect, useState } from "react";
import "../../../cssfiles/MyRecords.css";
import apiservice from "../../../apis/apiservice";
import type { MedicalHistoryRecord, MedicalRecordResponse } from "../../../apis/apiTypes";

const MyRecords = () => {
const [records, setRecords] = useState<MedicalHistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const patientId = localStorage.getItem("userId");

  useEffect(() => {
    if (!patientId) {
      setError("Patient ID not found.");
      setLoading(false);
      return;
    }

    apiservice.requestMyRecords(patientId)
      .then((res) => setRecords(res.data))
      .catch(() => setError("Failed to load medical records"))
      .finally(() => setLoading(false));
  }, [patientId]);

  if (loading) return <h3>Loading...</h3>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="records-container">
      <h3 className="records-title">My Medical Records</h3>

      <table className="records-table">
        <thead>
          <tr>
            <th>Medical ID</th>
            <th>Patient Name</th>
            <th>Created Time</th>
          </tr>
    
        </thead>

        <tbody>
          {records.map((rec) => (
            <tr key={rec.patientId}>
              <td>{rec.medicalId}</td>
              <td>{rec.name}</td>
              <td>{new Date(rec.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default MyRecords;
