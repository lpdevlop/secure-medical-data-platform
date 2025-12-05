const HomeBody = () => {
  return (
    <div className="request-box">
            <h3 className="reuqst-box-text">Access Patient Record</h3>
            <label className="reuqst-box-text">Enter Patient ID</label>
            <input className="input-field" name="consent_id" placeholder=" " />
            <button className="send-btn">Request Access</button>
    </div>
  );
};

export default HomeBody;
