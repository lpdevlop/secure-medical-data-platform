import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import apiservice from "../../../apis/apiservice";

interface JwtPayload {
  sub: string;
  role?: string;
  exp: number;
}


interface PatientRecord{
   medicalId: string;
  patientId: string;
  createdAt: string;       
  accessExpires: string;    
  status: boolean; 
}

const PatientRecords = () => {

  const PatientRecords = () => {
  const [records, setRecords] = useState<PatientRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const decoded: JwtPayload = jwtDecode(token);
        const patientId = decoded.sub;

        const response = await apiservice.requestRecord(patientId);
        setRecords(response.data);
      } catch (err) {
        console.error("Failed loading records:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

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
                <tr key={record.patientId}>
                  <td>{record.medicalId}</td>
                  <td>{record.accessExpires}</td>
                  <td>{record.createdAt}</td>
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
}
export default PatientRecords;
