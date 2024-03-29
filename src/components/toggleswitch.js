import React, { Fragment } from "react";
import { useState,useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ToggleSwitch = ({ label }) => { 
  const { user } = useAuth0();  
  let email=user.email;
  let [checked, setChecked] = useState(null);
      fetch(`http://localhost:8080/api/v1/btn/${email}`,{   //getting button value from database
        method:"GET",
        }).then((res) => res.json()) 
        .then(data => {
          if (data!=null) {              
            setChecked(data); 
          }
          else
          {
            setChecked(false);
          }
        })  
   
  // useEffect(() => {
  //     const data=window.localStorage.getItem("checked");
  //     if(data!=null) setChecked(JSON.parse(data))
  //   }, []);
  // useEffect(() => {
  //   window.localStorage.setItem("checked",JSON.stringify(checked));
  // }, [checked]);
  //  localStorage.getItem("checked");
    const HandleChange = () => { 
      setChecked(!checked); 
      if(checked===true)
      {
        fetch(`http://localhost:8080/api/v1/User/${email}`,{
        method:"PUT",
        body:JSON.stringify({email:user.email, btn:!checked}),
        headers:{"Content-Type":"application/json"}
        }).then(()=>{console.log("User turned OFF MFA")})
        // localStorage.setItem("checked", true);
      }
      else{
        // fetch("http://localhost:8080/api/v1/Users/125",{
        // method:"DELETE",
        // }).then(()=>{console.log("Delete successful")})
        fetch(`http://localhost:8080/api/v1/User/${email}`,{
        method:"PUT",
        body:JSON.stringify({email:user.email, btn:!checked}),
        headers:{"Content-Type":"application/json"}
        }).then(()=>{console.log("User turned ON MFA")})
        
        // localStorage.setItem("checked", false);       
      }
    }
    return (
        <Fragment>
            <h2 style={{color:"darkblue"}}><center><b>MULTIFACTOR AUTHENTICATION</b></center></h2>
        <div className="container">
          {label }{" "}
          <div className="toggle-switch">  
            <input type="checkbox" className="checkbox" 
                   name={label} id={label} onChange={HandleChange} checked={checked}  />
            <label className="label" htmlFor={label}>
              <span className="inner" />
              <span className="switch" />
            </label>
          </div>
        </div>
        </Fragment>
       
      );
}
export default ToggleSwitch;