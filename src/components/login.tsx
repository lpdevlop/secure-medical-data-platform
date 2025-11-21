import { useState } from 'react';
import '../App.css'
import apiService from "../apis/apiservice";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

interface DecodedToken {
  uuid: string;
  sub?: string;
  role?: string;
}

interface UserProfilePayload {
  id: string;
}

const LoginSignup = () =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setUser] = useState('');
  const navigate=useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await apiService.login({ email: email, password: password });
      const token = response.data.data.token;
      localStorage.setItem('authToken', token);

      const decoded: DecodedToken = jwtDecode(token);
      const userData: UserProfilePayload = { id: decoded.sub! };

      const profileResponse = await apiService.getUserProfile(userData);
      const profile = profileResponse.data.userprofile;
     // setUser(profile);

   //   if (onLogin) onLogin(token);
      navigate('/homepage');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password.');
    }
  };


return (
<div className='items-center '>

    <div className='login-panel'>    
    <div className='left-panel'>
    <h1 className="system-title">Secure Portal to Store Patient Medical Records</h1>
          <p className="system-description">
            A secure platform for managing patient records,
            medical history, and health analytics.
          </p>

    <div className='signup-button'>
        <button>SignUp</button>
        </div>

    </div>
    <div className="right-panel">
        
        <div className="Header">
            <div className="text front-s ">Login</div>
        </div>
        
        <div className='userinput-box'>
        <input name="username" />
        <input name="password" type="password" />
        </div>

        <div className='login-button'>
        <button>Login</button>
        </div>
    </div>
 </div>
</div>
        )
}

export default LoginSignup;


