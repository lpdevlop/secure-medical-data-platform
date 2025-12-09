import React, { useEffect, useState } from "react";
import "../../../cssfiles/MyRecords.css";
import apiservice from "../../../apis/apiservice";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string; // patientId
  role?: string;
  exp: number;
}

interface MedicalRecordResponse {
  patientId: string;
  name: string;
  medicalId: string; // UUID as string
  type: string;
  date:string
  accessExpires: string; // ISO string from Instant
}

const MyRecords = () => {
  const [records, setRecords] = useState<MedicalRecordResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const decoded: JwtPayload = jwtDecode(token);
        const patientId = decoded.sub;

        const response = await apiservice.getPatientHistory(patientId);

        // Map the Instant field to readable date
        const formattedRecords: MedicalRecordResponse[] = response.data.map((rec: any) => ({
          ...rec,
          accessExpires: new Date(rec.accessExpires).toLocaleString(),
          medicalId: rec.medicalId,
        }));

        setRecords(formattedRecords);
      } catch (err) {
        console.error("Failed to fetch medical records:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="records-container">
      <h3 className="records-title">My Prescription History</h3>
      <table className="records-table">
        <thead>
          <tr>
            <th>Record ID</th>
            <th>Name</th>
            <th>Created Time</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec) => (
            <tr key={rec.medicalId}>
              <td>{rec.medicalId}</td>
              <td>{rec.name}</td>
                            <td>{rec.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyRecords;
