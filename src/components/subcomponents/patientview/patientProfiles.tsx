import React, { useEffect, useState } from "react";
import "../../../cssfiles/patientprofile.css";
import apiservice from "../../../apis/apiservice";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;   // doctorId
  role?: string;
  exp: number;
}

interface PatientProfile {
  patientSecureId: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;

  accessGranted: boolean;
  accessExpiresAt: string;
}


const PatientProfiles = () => {
  const [loading, setLoading] = useState(true);
const [profiles, setProfiles] = useState<PatientProfile[]>([]);

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("Token missing");
          return;
        }

        const decoded: JwtPayload = jwtDecode(token);
        const doctorId = decoded.sub;

        const response = await apiservice.getGrantedProfiles(doctorId);

        setProfiles(response.data);
      } catch (e) {
        console.error("Failed loading patient profiles:", e);
      } finally {
        setLoading(false);
      }
    };

    loadProfiles();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="request-box history-box">
      <h3 className="reuqst-box-text">User Profiles</h3>

      <table className="old-table">
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Name</th>
            <th>Expired Time</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {profiles.map((user, index) => (
            <tr key={index}>
              <td>{user.patientSecureId}</td>
              <td>{user.fullName}</td>
              <td>{user.accessExpiresAt}</td>
              <td>{user.email}</td>
              <td>{user.accessGranted ? "Active" : "Expired"}</td>
              <td>
                <button className="view-btn" disabled={!user.accessGranted}>
                  {user.accessGranted ? "View" : "Expired"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default PatientProfiles;
