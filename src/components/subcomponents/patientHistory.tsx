import React, { useEffect, useState } from "react";
import "../../cssfiles/medicalhistory.css";
import apiservice from "../../apis/apiservice";
import { jwtDecode } from "jwt-decode";

interface MedicalHistoryRecord {
  medicalId: string;
  patientId: string;
  createdAt: string;       
  accessExpires: string;    
  status: boolean;          
}

interface JwtPayload {
  sub: string; 
  role?: string;
  exp: number;
}
interface PatientHistoryProps {
  doctorId: string; 
}
const PatientHistory = () => {

  const [historyData, setHistoryData] = useState<MedicalHistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const decoded: JwtPayload = jwtDecode(token);
        const doctorId = decoded.sub;

        const response = await apiservice.requestHistory(doctorId); 

        setHistoryData(response.data);
      } catch (err) {
        console.error("Failed to fetch medical history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalHistory();
  }, []);

  return (
    <div className="request-box history-box">
      <h3 className="reuqst-box-text">Patient Previous Medical History</h3>
      <table className="old-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Patient ID</th>
            <th>Expired Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {historyData.map((record, index) => (
            <tr key={index}>
              <td>{record.medicalId}</td>
              <td>{record.patientId}</td>
              <td>{record.accessExpires}</td>
              <td>
                <button
                  className="view-btn"
                >
                  View 
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
