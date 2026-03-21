// components/Sidebar.js
import "../styles/Sidebar.css";
import { leftMenu } from "../apis/Sidebar";
import React,{ useEffect } from "react";

export default function Sidebar() {

  const [leftmenu,setleftmenu] = React.useState([]);

  useEffect(()=>{
    const fetchmenu = async()=>{
      try{
        const data = await leftMenu();
        //console.log(data,"dataleft")
        setleftmenu(data);
      }catch(error){
        console.log(error);
      }
    };
    
    fetchmenu();
  },[]);
  return (
    <div className="sidebar">
      <h2>LifePilot AI</h2>
       {Array.isArray(leftmenu) &&
        leftmenu.map((item, index) => (
          <p key={index}>{item.name}</p>
        ))
      }
    </div>
  );
}