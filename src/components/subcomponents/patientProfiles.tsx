import React from "react";
import "../../cssfiles/patientprofile.css"; 

const PatientProfiles = () => {
  const userData = [
    { id: "U101", name: "Dr. Smith", role: "Doctor", email: "smith@hospital.com", status: true },
    { id: "U102", name: "Dr. Lee", role: "Doctor", email: "lee@hospital.com", status: false },
    { id: "U103", name: "Alice Johnson", role: "Patient", email: "alice@gmail.com", status: true },
  ];

  return (
    <div className="request-box history-box">
      <h3 className="reuqst-box-text">User Profiles</h3>
      <table className="old-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.email}</td>
              <td>{user.status ? "Active" : "Inactive"}</td>
              <td>
                <button
                  className="view-btn"
                  disabled={!user.status}
                >
                  {user.status ? "View" : "Activate"}
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
