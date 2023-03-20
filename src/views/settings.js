import React from "react";
import ToggleSwitch from "../components/toggleswitch";
import NavBar from "../components/nav-bar";
export const Settings = () => {
  // const { user } = useAuth0();
  // fetch("http://localhost:8080/api/v1/Users",{
  //   method:"POST",
  //  body:JSON.stringify({email:user.email, username:user.nickname}),
  //   headers:{"Content-Type":"application/json"}
  // }).then(()=>{console.log("new user added")})

  return ( 
        <React.Fragment>
          <NavBar />
         <div style={{color:"darkblue"}}><b> <ToggleSwitch label = "Mode "/></b></div>
        </React.Fragment>
    
  );
};

export default Settings;