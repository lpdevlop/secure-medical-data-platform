import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../apis/apiservice";
import "../cssfiles/SignUp.css";
interface SignUpProps {
  closePopup: () => void; // declare the prop
}

const SignUp: React.FC<SignUpProps> = ({ closePopup }) => {
  const [form, setForm] = useState({
    fullName: "",
    nic: "",
    password: "",
    role: "PATIENT",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    address: "",
    emergencyContact: "",
    consentGiven: false,
  });
  const [error, setError] = useState("");

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const target = e.target as any; 
  const { name, type, value, checked } = target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.consentGiven) {
      setError("You must provide consent to sign up.");
      return;
    }

    try {
      await apiService.getSignUp(form);
      closePopup(); 
    } catch (err) {
      console.error(err);
      setError("Failed to signup. Please check your data.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nic"
          placeholder="National ID"
          value={form.nic}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
          required
        />
        <select name="gender" value={form.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>
        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={form.contactNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="emergencyContact"
          placeholder="Emergency Contact"
          value={form.emergencyContact}
          onChange={handleChange}
          required
        />

        <div className="role-selection">
          <label>
            <input
              type="radio"
              name="role"
              value="DOCTOR"
              checked={form.role === "DOCTOR"}
              onChange={handleChange}
            />{" "}
            Doctor
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="PATIENT"
              checked={form.role === "PATIENT"}
              onChange={handleChange}
            />{" "}
            Patient
          </label>
        </div>
{form.role === "DOCTOR" && (
  <div className="consent-section">
    <h4>Doctor Consent</h4>
    <p>
      By signing up as a doctor, I agree to handle patient data responsibly,
      follow privacy regulations, and access medical records only for authorized
      purposes related to patient care.
    </p>
    <label className="consent-checkbox">
      <input
        type="checkbox"
        name="consentGiven"
        checked={form.consentGiven}
        onChange={handleChange}
      />{" "}
      I have read and agree to the above terms.
    </label>
  </div>
)}

   {form.role === "PATIENT" && (
  <div className="consent-section">
    <h4>Patient Consent</h4>
    <p>
      By signing up, I hereby give my informed consent to allow authorized doctors
      and healthcare providers to access my medical records for the purpose of
      treatment, diagnosis, and care management. I understand that my data will
      be handled according to privacy regulations and will be used only by
      authorized personnel.
    </p>
    <label className="consent-checkbox">
      <input
        type="checkbox"
        name="consentGiven"
        checked={form.consentGiven}
        onChange={handleChange}
      />{" "}
      I have read and agree to the above terms.
    </label>
  </div>
)}

        {error && <p className="error">{error}</p>}

        <button type="submit">Sign Up</button>
      </form>

      
    </div>
  );
};

export default SignUp;
