import { useState } from 'react';
import '../App.css';
import apiService from "../apis/apiservice";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

interface DecodedToken {
  sub?: string;
  role?: string;
}

const LoginSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await apiService.login({
        nic: email,
        password: password
      });

      const { accessToken, refreshToken } = response.data;

      // Save tokens in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Decode JWT
      const decoded: DecodedToken = jwtDecode(accessToken);

      if (decoded.sub) localStorage.setItem("userId", decoded.sub);
      if (decoded.role) localStorage.setItem("role", decoded.role);

      // Redirect based on role
      if (decoded.role === "DOCTOR") {
        navigate("/homepage"); // Doctor dashboard
      } else if (decoded.role === "PATIENT") {
        navigate("/patienthomepage"); // Patient dashboard
      } else {
        setError("Unknown role. Cannot redirect.");
      }

    } catch (err) {
      console.error("Login error: ", err);
      setError("Invalid NIC or Password.");
    }
  };

  return (
    <div className="items-center">
      <div className="login-panel">
        <div className="left-panel">
          <h1 className="system-title">Secure Patient Records Portal</h1>
          <p className="system-description">
            A secure platform for managing patient records and medical history
          </p>
          <div className="signup-button">
            <button onClick={() => navigate('/signup')}>SignUp</button>
          </div>
        </div>

        <div className="right-panel">
          <div className="Header">
            <div className="text front-s" style={{ color: 'black' }}>Sign In</div>
          </div>

          <form onSubmit={handleLogin}>
            <div className="userinput-box">
              <input
                name="email"
                placeholder="National ID Card"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p style={{ color: "red", fontSize: 14 }}>{error}</p>}

            <div className="login-button">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
