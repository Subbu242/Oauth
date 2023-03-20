// import OtpInput from "react-otp-input";
// import { useRef } from "react";
import React, { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Home } from ".";
import ProtectedRoute from "../components/protected-route";

export const RedirecttUrl = () => {
  const History = useHistory();  
  const { user } = useAuth0();
  const [checked, setChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  let re='';
  
  const HandleMail = () => { 
  fetch(`http://localhost:8080/api/v1/User/${user.email}`,{  //getting users from database
    method:"GET",
//     body:JSON.stringify({email:user.email}),
//  headers:{"Content-Type":"application/json"}
  }).then((res) => res.json())
  .then(data => {
    console.log(data);
    if (data["message"]=="User not found for this id") {              
        console.log("First time");
        fetch("http://localhost:8080/api/v1/Users/withoutOtp",{
            method:"POST",
            body:JSON.stringify({email:user.email,btn:true}),
        headers:{"Content-Type":"application/json"}
        }).then((res) => res.json())
        .then(data => {
            if (data) {              
            console.log(data);
            History.push("otpview")
            }
            else {              
            alert('ERROR')
            }
        })        
    }
    else {       
      console.log("Second time");     
            fetch(`http://localhost:8080/api/v1/btn/${user.email}`, {  //getting button value from database
              method: "GET",
            }).then((res) => res.json())
              .then(data => {
                console.log(data);
                if(data)
                {
                  // setChecked(data);
                  History.push("otpview")
                }
                else 
                {
                  // setChecked(false);
                  History.push("/")
                }
                setLoading(true);
              })
              // if(loading && checked)
              // {
              //   console.log("right");
                // re = checked ? "otpview" : "/";
                
    
              //  loading && History.push({re})
              //   History.push("otpview") 
              // }
              // else
              // {
              //   History.push("/") 
              // }
    }
  });       
}  

// const HandleSms = () => { 
//   document.getElementById('hide').style.display="block";
//   document.getElementById('hi').style.display="block";
//   fetch(`http://localhost:8080/api/v1/User/${user.email}`,{  //getting users from database
//   method:"GET",
// //     body:JSON.stringify({email:user.email}),
// //  headers:{"Content-Type":"application/json"}
// }).then((res) => res.json())
// .then(data => {
//   console.log(data);
//   if (data["message"]=="User not found for this id") {              
//       console.log("First time");
//       fetch("http://localhost:8080/api/v1/Users/withoutOtp",{
//           method:"POST",
//           body:JSON.stringify({email:user.email,btn:true}),
//       headers:{"Content-Type":"application/json"}
//       }).then((res) => res.json())
//       .then(data => {
//           if (data) {              
//           console.log(data);
//           // History.push("otpview")
//           }
//           else {              
//           alert('ERROR')
//           }
//       })        
//   }
//   else {       
//     console.log("Second time");     
//           fetch(`http://localhost:8080/api/v1/btn/${user.email}`, {  //getting button value from database
//             method: "GET",
//           }).then((res) => res.json())
//             .then(data => {
//               console.log(data);
//               if(data)
//               {
//                 // setChecked(data);
//                 // History.push("otpview")
//               }
//               else 
//               {
//                 // setChecked(false);
//                 History.push("/")
//               }
//               setLoading(true);
//             })
//   }
// });
  
// }

// let val;
// const HandlePhone = () => { 
//   val= document.getElementById('hi').value;
//         fetch("http://localhost:8080/api/v1/phone",{
//             method:"POST",
//             body:JSON.stringify({email:user.email,btn:true,phone:val}),
//         headers:{"Content-Type":"application/json"}
//         }).then((res) => res.json())
//         .then(data => {
//             if (data) {              
//             console.log(data);
//             History.push("otpview")
//             }
//             else {              
//             alert('ERROR')
//             }
//         })
          
// }        
  return (    
    <div className="App">
      {/* <h1>LOADING....</h1>       */}
      {/* <button onClick={HandleSms}>SMS</button> */}
      <button onClick={HandleMail}>Mail</button><br></br>
      {/* <input type="text" placeholder="Enter you number" id="hide" style={{display:"none",marginLeft:"40%",marginTop:"5%",}}></input>
      <button onClick={HandlePhone} id="hi" style={{display:"none",marginLeft:"45%"}}>SUBMIT</button> */}
    </div>
  );
};


export default RedirecttUrl;