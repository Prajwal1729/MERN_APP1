import React from "react";
// import { useEffect } from "react";
import { useState } from "react";
 import { accountApi } from "../apis/accountApi";
import { useNavigate } from "react-router-dom";
import SuccessMessage from "./SucessMessage";
import ErrorMessage from "./ErrorMessage";

export default function CreateAccount(){

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmpassword,setConfirmPassword] = useState("");
  const [error,setError] = useState("");
  const [successMessage,setSuccessMessage] = useState("");
  const [errorMessage,setErrorMessage] = useState("");
  const navigate = useNavigate();

   const validatePassword = (password) => {
        const regex = /^(?=(?:.*\d){2,})(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{11,}$/;
        return regex.test(password);
    };

    // Validate email format
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };


  const handleCreateAccount = async(e)=>{
    e.preventDefault();

      if (password !== confirmpassword) {
        setErrorMessage("Passwords do not match");
        return;
      }

        if(!email && !password && !confirmpassword) {
          setErrorMessage("Below Credentials are Required!")
          setSuccessMessage("");
          return;
        }

        if(!email){
          setErrorMessage("Email ID is required!");
          setSuccessMessage("");
          return;
        }

        if(!password){
          setErrorMessage("Passowrd is required!");
          setSuccessMessage("");
          return;
        }

        if (!validatePassword(password)) {
          setSuccessMessage("");
          setErrorMessage("Password must be at least 11 characters.");
          return;
        }

        if(!validateEmail(email)){
          setSuccessMessage("");
          setErrorMessage("Invalid Email ID!");
          return;
        }
        
      try{
        const data = await accountApi(email,password,confirmpassword);
        console.log(data);

        if(data?.existing_user){
           if(data?.existing_user === email){
            setErrorMessage("User Already Exist!");
            setSuccessMessage("");
            return;
           }
        }
        else{
          setSuccessMessage("Account Created Successfully!");
          setErrorMessage("");
          sessionStorage.setItem("token", data.token);
          setTimeout(() => {
            navigate("/admin/login");
          }, 1000);
        }

      }catch(err){
        setError("Account Creation failed.")
      }
  }

    return(

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
          <h2>Create an Account</h2>
          {/* <p className="subtitle">
            Enter your credentials to access your account
          </p> */}

          <form onSubmit={handleCreateAccount}>

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

            <label>Confirm Password</label>
            <input type="password" 
            placeholder=""
            onChange={(e)=>setConfirmPassword(e.target.value)}
            value={confirmpassword}
            />

            <button type="submit">
              Create Account
            </button>

          </form>

          {error && <p className="error">{error}</p>}

          <p className="signin">
            Already a member? <span style={{color: "blue", cursor: "pointer"}} onClick={() => navigate("/admin/login")}>Sign In</span>
          </p>

        </div>

      </div>

       </div>

    );
};