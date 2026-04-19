import React from 'react';
import SuccessMessage from './SucessMessage';
import ErrorMessage from './ErrorMessage';
import { useNavigate } from 'react-router-dom';
import { sendOTP,verifyOTP } from '../apis/loginOTP';

export default function ForgotPassword() {

  const [email,setEmail] = React.useState();
  const [otp,setOTP] = React.useState();
  const [error,setError] = React.useState();
  const [successMessage,setSuccessMessage] = React.useState();
  const [errorMessage,setErrorMessage] = React.useState();
  const [timeLeft,setTimeLeft] = React.useState(0);
  const [isOtpSent,setIsOtpSent] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(()=>{
    let timer;
    if(timeLeft > 0){
        timer = setInterval(()=>{
            setTimeLeft((prev)=> prev-1);
        },1000);
    }

    return ()=>clearInterval(timer);

  },[timeLeft])

   const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

  const handleSendOTP = async (e) => {
      e.preventDefault();

      if(!email){
        setErrorMessage("Email ID is required");
        setSuccessMessage("");
        return;
      }

        if(!validateEmail(email)){
            setSuccessMessage("");
            setErrorMessage("Invalid Email ID!");
            return;
        }

      try{
        const data = await sendOTP(email);
        console.log(data,"login otp response");

        if(data.email === email){
            setSuccessMessage("OTP sent Sucessfully!");
            setErrorMessage("");
            setIsOtpSent(true);
            setTimeLeft(data.expires_in)
        }
        else if(data.email!==email){
            console.log("testing");
            setSuccessMessage("");
            setErrorMessage("An account with this Email ID doesn't exist!");
        }
        else{
            setSuccessMessage("");
            setErrorMessage("Invalid Email ID!");
        }

      }catch(error){
        setError("LoginOTP Failed");
      }
  }

  const handleVerifyOTP = async (e)=>{
    e.preventDefault();

    const data = await verifyOTP(email,otp);
    sessionStorage.setItem("token",data.token);

    setTimeout(()=>{
      successMessage("OTP verfied sucessfully")
      navigate('/admin/dashboard');
    },2000)
  }
  return (
    <div className="login-container">
    
          {/* LEFT PANEL */}
    
          <div className="login-left">
            <div className="left-text">
              <h1>
                Be a Part of <br/>
                Something <span>Amazing</span>
              </h1>
            </div>
          </div>
    
    
          {/* RIGHT PANEL */}
    
          <div className="login-right">
    
            <div className="login-box">
                <SuccessMessage message={successMessage} />
                <ErrorMessage message={errorMessage} />
              <h2>Forgot Password</h2>
              <p className="subtitle">
                Enter your registered email address 
              </p>
    
              <form>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter Email ID"
                  onChange={(e)=>setEmail(e.target.value)}
                  value={email}
                />
    
                <label>OTP</label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  onChange={(e)=>setOTP(e.target.value)}
                  value={otp}
                />
    
                {/* <div className="remember">
                  <input type="checkbox"/>
                  <span>Remember me</span>
                </div> */}
                {isOtpSent && timeLeft > 0 && (
                    <p style={{"color": "green", "fontSize": "14px"}}>
                      OTP expires is: {timeLeft} seconds. 
                    </p>
                )}

                {isOtpSent && timeLeft=== 0 && (
                   <p style={{"color":"red", "fontSize": "14px"}}>
                    OTP Expired! Please request again.
                   </p>
                )}
    
                {/* <button type="submit" disabled={isOtpSent && timeLeft===0}> 
                  Submit OTP
                </button> */}

                {!isOtpSent ? (
                  <button onClick={handleSendOTP}>
                    Submit OTP
                  </button>
                ) : (
                  <button onClick={handleVerifyOTP}>
                    Verify OTP
                  </button>
                )}
    
              </form>
    
              {error && <p className="error">{error}</p>}
    
    
            </div>
    
          </div>
    
        </div>
    
  )
}

