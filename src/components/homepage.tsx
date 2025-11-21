import { Link, NavLink } from "react-router-dom"



const homepage=()=>{

  return (
    <><div className="simple-sidebar">
          <h3 className="title">HealthCare Portal</h3>

          <ul className="menu">
              <li><Link to="/homepage">Home</Link></li>
              <li><Link to="/login">Medical Records</Link></li>
              <li><Link to="/about">Patient Medical History</Link></li>
              <li><Link to="/about">Patient Profile</Link></li>
              <li><Link to="/about">User Profile</Link></li>
          </ul>
    </div>
    
    <div className="request-window">

    <div className="request-box">
      <h3 className="reuqst-box-text">Access Patient Record</h3>

      <label className="reuqst-box-text">Enter Consent ID</label>
      <input className="input-field" name="consent_id" placeholder=" " />

      <button className="send-btn">Request Access</button>
    </div>


    </div></>

  );


}

export default homepage