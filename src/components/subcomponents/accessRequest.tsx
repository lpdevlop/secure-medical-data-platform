import { useEffect, useState } from "react";
import apiservice from "../../apis/apiservice";
import { jwtDecode } from "jwt-decode";


export interface AccessRequestPayload{
      patientSecureId:string;
      reason:string;
      doctorId:string;

}


const HomeBody = () => {
  console.log("HomeBody component is rendering");

const [patientSecureId, setPatientId] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [reason, setReason] = useState("Access request from doctor");

  useEffect(() => {

    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      try {
        const decoded: { sub: string; role?: string; exp: number } = jwtDecode(accessToken);
        console.log("User ID:", decoded.sub);
        console.log("Role:", decoded.role);

        setDoctorId(decoded.sub); 
      } catch (err) {
        console.error("Failed to decode token:", err);
      }
    }
  }, []);

const handleRequestAccess = async () => {
  if (!patientSecureId.trim()) {
    alert("Please enter a valid Patient ID.");
    return;
  }

  try {
    const payload: AccessRequestPayload = {
      patientSecureId,
      reason,
      doctorId,
    };

    const response = await apiservice.requestAccess(payload);

    if (response.data) {
      alert("Access request sent successfully!");
      setResponseMsg("Request sent successfully!");
    } else {
      alert("Access request failed. Try again.");
      setResponseMsg("Request failed");
    }
  } catch (error) {
    console.error("Error requesting access:", error);
    alert("Something went wrong. Try again.");
    setResponseMsg("Error occurred");
  }
};

  return (
    <div className="request-box">
            <h3 className="reuqst-box-text">Access Patient Record</h3>
            <label className="reuqst-box-text">Enter Patient ID</label>
        <input
        className="input-field"
        value={patientSecureId}
        onChange={(e) => setPatientId(e.target.value)}
        placeholder=""
      />
            <button className="send-btn" onClick={handleRequestAccess}>Request Access</button>
    </div>
  );

};

export default HomeBody;
