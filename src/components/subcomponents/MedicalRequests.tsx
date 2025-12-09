import { useEffect, useState } from "react";
import "../../cssfiles/MedicalRequests.css";
import { jwtDecode } from "jwt-decode";
import apiservice from "../../apis/apiservice";

interface JwtPayload {
  sub: string;
  role?: string;
  exp: number;
}

interface PatientRecord {
  medicalId: string;
  patientId: string;
  createdAt: string;
    name: string;
  accessExpires: string;
  status: boolean;
  
}

const MedicalRequests = () => {
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

  const handleAccess = (medicalId: string) => {
    console.log("Accessing record:", medicalId);
    // TODO: navigate or call an API
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="main-body">
      <div className="request-box" style={{ width: "700px" }}>
        <h3>Medical Records</h3>

        <table className="old-table">
          <thead>
            <tr>
              <th>Record Name</th>
              <th>Patient ID</th>
              <th>Status</th>
              <th>Expired Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((req) => (
              <tr key={req.medicalId}>
                <td>{req.name}</td>
                <td>{req.patientId}</td>
                <td>{req.status ? "Granted" : "Pending"}</td>
                <td>{req.accessExpires}</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => handleAccess(req.medicalId)}
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
