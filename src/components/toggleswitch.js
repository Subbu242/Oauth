import React, { Fragment } from "react";
import { useState,useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ToggleSwitch = ({ label }) => { 
  const { user } = useAuth0();
  let tab = "" ;
  if(user.email!=null)
  {
      fetch("http://localhost:8080/api/v1/btn/subhusubhash24@gmail.com",{
        method:"GET",
        })
        .then((response )=> {
            return response.json()
          })
        .then((objectData) => {
            console.log(objectData)
            objectData.map((r)=>{
                    tab += r
                });
          });
  }
        // if(val!=null)
        // {
        //   checked=JSON.stringyfy(val);
        // }
  let [checked, setChecked] = useState(true); 
  // useEffect(() => {
  //     const data=window.localStorage.getItem("checked");
  //     if(data!=null) setChecked(JSON.parse(data))
  //   }, []);
  // useEffect(() => {
  //   window.localStorage.setItem("checked",JSON.stringify(checked));
  // }, [checked]);
  //  localStorage.getItem("checked");
    const HandleChange = (event) => { 
      
      setChecked(event.target.checked); 
      if(checked===true)
      {
        fetch("http://localhost:8080/api/v1/Users",{
        method:"POST",
        body:JSON.stringify({email:user.email, btn:checked}),
        headers:{"Content-Type":"application/json"}
        }).then(()=>{console.log("User turned ON MFA")})
        // localStorage.setItem("checked", true);
      }
      else{
        // fetch("http://localhost:8080/api/v1/Users/125",{
        // method:"DELETE",
        // }).then(()=>{console.log("Delete successful")})
        fetch("http://localhost:8080/api/v1/Users/subhusubhash24@gmail.com",{
        method:"PUT",
        body:JSON.stringify({email:user.email, btn:checked}),
        headers:{"Content-Type":"application/json"}
        }).then(()=>{console.log("User turned OFF MFA")})
        
        // localStorage.setItem("checked", false);       
      }
    }
    return (
        <Fragment>
            <h6><center>MULTI-FACTOR AUTHENTICATION</center></h6>
        <div className="container">
          {label}{" "}
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