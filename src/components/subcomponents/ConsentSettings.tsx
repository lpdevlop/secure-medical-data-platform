import React, { useState } from "react";
import "../../cssfiles/ConsentSettings.css";

const ConsentSettings = () => {
  const [consents, setConsents] = useState([
    { id: 1, doctor: "Dr. John Smith", status: "Pending", age: 35, grantedAt: null },
    { id: 2, doctor: "Dr. Emily Brown", status: "Granted", age: 42, grantedAt: "2025-11-01 10:30" },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  
  const handleGrantClick = (id:number) => {
    setSelectedId(id);
    setShowPopup(true);
  };

  const confirmGrant = () => {
    const timestamp = new Date().toLocaleString();
    setConsents(consents.map(c =>
      c.id === selectedId
        ? { ...c, status: "Granted", grantedAt: timestamp }
        : c
    ));
    setShowPopup(false);
    setSelectedId(null);
  };

  const cancelGrant = () => {
    setShowPopup(false);
    setSelectedId(null);
  };

  const handleRevoke = (id: number) => {
    setConsents(consents.map(c =>
      c.id === id
        ? { ...c, status: "Revoked", grantedAt: null }
        : c
    ));
  };

  return (
    <div className="consent-box">
      <h3>Consent Settings</h3>
      <table className="consent-table">
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Age</th>
            <th>Status</th>
            <th>Consent Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {consents.map((c) => (
            <tr key={c.id}>
              <td>{c.doctor}</td>
              <td>{c.age}</td>
              <td>{c.status}</td>
              <td>{c.grantedAt || "-"}</td>
              <td>
                {c.status === "Pending" ? (
                  <>
                    <button className="btn-action" onClick={() => handleGrantClick(c.id)}>Grant</button>
                    <button className="btn-action" onClick={() => handleRevoke(c.id)}>Revoke</button>
                  </>
                ) : (
                  <span>{c.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Consent Agreement</h3>
            <p>
              By granting access, you allow the doctor to view your medical records.
              Please read and confirm your consent.
            </p>
            <button className="btn-action" onClick={confirmGrant}>I Agree</button>
            <button className="btn-action" onClick={cancelGrant}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsentSettings;
