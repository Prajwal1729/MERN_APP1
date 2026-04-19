import React from "react";
import { loginApi } from "../apis/loginApi";
import { useNavigate } from "react-router-dom";
import SuccessMessage from "./SucessMessage";
import ErrorMessage from "./ErrorMessage";

export default function Login() {

  const [email,setEmail] = React.useState("");
  const [password,setPassword] = React.useState("");
  const [error,setError] = React.useState("")
  const [successMessage,setSuccessMessage] = React.useState("");
  const [errorMessage,setErrorMessage] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!email && !password){
      setErrorMessage("Email and Password is Required!");
      setSuccessMessage("");
      return;
    }
    if(!email){
      setErrorMessage("Email is Required!");
      setSuccessMessage("");
      return;
    }
    if(!password){
      setErrorMessage("Password is Required!");
      setSuccessMessage("");
      return;
    }

    try{
      const data = await loginApi(email,password);
       //console.log(data,"logindata");
       if(data?.token){
         setSuccessMessage("LoggedIn Succesfully!");
         setErrorMessage("");
         sessionStorage.setItem('token',data.token);
         setTimeout(()=>{
           navigate('/admin/dashboard')
         },2000)
       }
       else{
        setErrorMessage("Invalid Credentials!");
        setSuccessMessage("");
       }

    }catch(error){
      setError("Login Failed")
    }
  };

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
          <h2>Login</h2>
          <p className="subtitle">
            Enter your credentials to access your account
          </p>

          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              placeholder=""
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
            />

            <label>Password</label>
            <input
              type="password"
              placeholder=""
              onChange={(e)=>setPassword(e.target.value)}
              password={password}
            />

            {/* <div className="remember">
              <input type="checkbox"/>
              <span>Remember me</span>
            </div> */}

            <button type="submit">
              Login
            </button>

          </form>

          {error && <p className="error">{error}</p>}

          <p className="signup">
            Not a member? <span style={{color: "blue", cursor: "pointer"}} onClick={() => navigate("/admin/createaccount")}>Create an Account</span>
          </p>

           <p className="forgot-password">
            Login with OTP <span style={{color:"blue",cursor:"pointer"}} onClick={()=>navigate('/loginotp')}>Login OTP</span>
          </p>

        </div>

      </div>

    </div>

  );
}