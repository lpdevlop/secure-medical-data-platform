import React, { useState, useEffect } from "react";
import "../../../cssfiles/ConsentSettings.css";
import apiservice from "../../../apis/apiservice";
import { jwtDecode } from "jwt-decode";

interface Consent {
  id: string;
  doctor: string;
  doctorId: number;
  age: number;
  status: "PENDING" | "GRANTED" | "REVOKED";
  grantedAt: string | null;
  requestedAt:string
  isRevoked: boolean; 
}

interface JwtPayload {
  sub: string;
  role?: string;
  exp: number;
}

const ConsentSettings = () => {
  const [consents, setConsents] = useState<Consent[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const patientId = (() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    const decoded: JwtPayload = jwtDecode(token);
    return decoded.sub;
  })();

  // Load active consents from backend
  useEffect(() => {
    loadActiveConsents();
  }, []);

  const loadActiveConsents = async () => {
    try {
      const response = await apiservice.getActiveConsents();
      const data = response.data;

      const mapped: Consent[] = data.map((dto: any) => ({
        id: dto.id,
        doctor: dto.doctorName,
        doctorId: dto.doctorId,
        age: dto.age ?? 0, // if backend adds age later
        status: dto.status,
        requestedAt: dto.requestedAt ? new Date(dto.requestedAt).toLocaleString() : null,
        isRevoked: dto.isRevoked ?? false  
      }));

      setConsents(mapped);
    } catch (err) {
      console.error("Error loading consents:", err);
    }
  };

  const handleGrantClick = (id: string) => {
    setSelectedId(id);
    setShowPopup(true);
  };

  const confirmGrant = async () => {
    if (!selectedId || !patientId) return;

    const consent = consents.find(c => c.id === selectedId);
    if (!consent) return;

    try {
      const payload = {
        itemId: selectedId,
        patientId,
        doctorId: consent.doctorId,
        expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
      };

      await apiservice.grantAccess(payload);
      loadActiveConsents();
    } catch (err) {
      console.error("Failed to grant access:", err);
    } finally {
      setShowPopup(false);
      setSelectedId(null);
    }
  };

  const handleRevoke = async (id: string) => {
    if (!patientId) return;

    const consent = consents.find(c => c.id === id);
    if (!consent) return;

    try {
      await apiservice.revokeConsent({
        itemId:id,
        patientId,
        doctorId: consent.doctorId
      });

      loadActiveConsents();
    } catch (err) {
      console.error("Failed to revoke:", err);
    }
  };

  return (
    <div className="consent-box">
      <h3>Consent Settings</h3>
      <table className="consent-table">
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Status</th>
            <th>Created Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {consents.map(c => (
            <tr key={c.id}>
              <td>{c.doctor}</td>
              <td>{c.status}</td>
              <td>{c.requestedAt || "-"}</td>
     <td>
  {c.isRevoked ? (
    <span style={{ color: "gray" }}>Revoked</span>
  ) : c.status === "PENDING" ? (
    <>
      <button onClick={() => handleGrantClick(c.id)}>Grant</button>
      <button onClick={() => handleRevoke(c.id)}>Revoke</button>
    </>
  ) : c.status === "GRANTED" ? (
    <button onClick={() => handleRevoke(c.id)}>Revoke</button>
  ) : null}
</td>

            </tr>
          ))}
        </tbody>
      </table>

      {/* Consent Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Consent Agreement</h3>
            <p>By granting access, you allow the doctor to view your medical records.</p>
            <button onClick={confirmGrant}>I Agree</button>
            <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsentSettings;
