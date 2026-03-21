// pages/Dashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../styles/Dashboard.css"

export default function Dashboard() {

  const[showDropDown,setShowDropDown] = React.useState(false);
  const navigate = useNavigate();

  const handlelogout = ()=>{
    sessionStorage.removeItem('token');
    navigate('/admin/login');
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">

        {/* NAVBAR */}
        <div className="navbar">
          <h2 className="logo">Dashboard</h2>

          <div
            className="profile"
            onClick={(e) => {
              e.stopPropagation();
              setShowDropDown(!showDropDown);
            }}
          >
            <img src="/profile.jpg" alt="" className="profile-img" />

            {showDropDown && (
              <div className="dropdown">
                <ul>
                  <li onClick={() => navigate("/admin/profile")}>
                    My Profile
                  </li>
                  <li onClick={handlelogout}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="content">
          <h1>Welcome to Dashboard</h1>
        </div>

      </div>
    </div>
  );
}