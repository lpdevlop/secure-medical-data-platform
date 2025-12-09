import React, { useEffect, useState } from "react";
import apiservice from "../apis/apiservice";

interface Log {
  id: number;
  secureId: string;
  action: string;
  encryptedData: string;
  createdAt: string;
  previousHash: string;
  currentHash: string;
}

export default function AuditLogList() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    apiservice
      .getAllAuditLogs()
      .then((res) => {
        setLogs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to load audit logs");
        setLoading(false);
      });
  }, []);

  const loadSingleLog = (id: number) => {
    setLoading(true);
    apiservice
      .getAuditLog(id)
      .then((res) => {
        setSelectedLog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Error loading log details");
        setLoading(false);
      });
  };

  return (
    <div style={{ padding: 20, color: "black" }}>
      <h2>Audit Log Records</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Scrollable Table Container */}
      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          border: "1px solid #ccc",
          borderRadius: 6,
          marginTop: 20,
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
            color: "black",
            background: "white",
          }}
        >
          <thead>
            <tr style={{ background: "#eaeaea" }}>
              <th style={{ padding: 6, border: "1px solid #ccc" }}>ID</th>
              <th style={{ padding: 6, border: "1px solid #ccc" }}>Secure ID</th>
              <th style={{ padding: 6, border: "1px solid #ccc" }}>Action</th>
              <th style={{ padding: 6, border: "1px solid #ccc" }}>Created At</th>
              <th style={{ padding: 6, border: "1px solid #ccc" }}>View</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td style={{ padding: 6, border: "1px solid #ccc" }}>{log.id}</td>
                <td style={{ padding: 6, border: "1px solid #ccc" }}>{log.secureId}</td>
                <td style={{ padding: 6, border: "1px solid #ccc" }}>{log.action}</td>
                <td style={{ padding: 6, border: "1px solid #ccc" }}>
                  {new Date(log.createdAt).toLocaleString()}
                </td>
                <td style={{ padding: 6, border: "1px solid #ccc" }}>
                  <button
                    style={{
                      padding: "4px 8px",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                    onClick={() => loadSingleLog(log.id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected Log Details */}
      {selectedLog && (
        <div
          style={{
            marginTop: 30,
            padding: 20,
            border: "1px solid #ccc",
            borderRadius: 8,
            background: "#fff",
            color: "black",
          }}
        >
          <h3>Log Details (ID: {selectedLog.id})</h3>

          <p><strong>Secure ID:</strong> {selectedLog.secureId}</p>
          <p><strong>Action:</strong> {selectedLog.action}</p>

          <p><strong>Decrypted Data:</strong></p>
          <pre
            style={{
              background: "#f6f6f6",
              padding: 10,
              borderRadius: 5,
              maxHeight: 250,
              overflow: "auto",
              color: "black",
              fontSize: "13px",
            }}
          >
            {selectedLog.encryptedData}
          </pre>

          <p><strong>Created At:</strong> {new Date(selectedLog.createdAt).toLocaleString()}</p>
          <p><strong>Previous Hash:</strong> {selectedLog.previousHash}</p>
          <p><strong>Current Hash:</strong> {selectedLog.currentHash}</p>

          <button
            style={{
              marginTop: 15,
              padding: "6px 10px",
              cursor: "pointer",
            }}
            onClick={() => setSelectedLog(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
