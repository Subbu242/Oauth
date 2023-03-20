// import OtpInput from "react-otp-input";
// import { useRef } from "react";
import React, { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Home } from "../views";
import ProtectedRoute from "../components/protected-route";

const OtpView = () => {
  const History = useHistory();  
  const { user } = useAuth0();
  let email=user.email;
  var otp1;

  const [counter, setCounter] = React.useState(15);
  React.useEffect(() => {
    if(counter==0)
    {
      document.getElementById('resend').style.display="block";
      document.getElementById('timer').style.display="none";
    }
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);


  let [checked, setChecked] = useState(null);
  let [Pnum, setPnum] = useState(null);
  fetch(`http://localhost:8080/api/v1/btn/${email}`,{  //getting button value from database
    method:"GET",
    }).then((res) => res.json()) 
    .then(data => {
      if (data) {              
        checked=data; 
      }
      else
      {
        checked=false;
      }
      setChecked(checked);
    })

    // fetch(`http://localhost:8080/api/v1/phone/${email}`,{  //getting phone value from database
    // method:"GET",
    // }).then(data => {
    //   console.log(data);
    //   if (data) {              
    //     Pnum=data; 
    //   }
    //   else
    //   {
    //     Pnum=null;
    //   }
    //   setPnum(Pnum);
    // })
  // const handleOtp = () => {     
  //   document.getElementById('hide').style.display="block";
  useEffect(() => {
    // fetch("http://localhost:8080/api/v1/Users/phone",{
    //           method:"POST",
    //           body:JSON.stringify({email:user.email, btn:checked,phone:Pnum}),
    //           headers:{"Content-Type":"application/json"}
    //           }).then(()=>{console.log('OTP SENT')})


    fetch(`http://localhost:8080/api/v1/User/${email}`,{  
        method:"GET",
        }).then((res) => res.json()) 
        .then(data => {
          console.log(data);
          if (data) {              
            fetch(`http://localhost:8080/api/v1/Users/${email}`,{
             method:"PUT",
             body:JSON.stringify({email:user.email, btn:checked,phone:Pnum}),
             headers:{"Content-Type":"application/json"}
             }).then(()=>{console.log('OTP SENT')}) 
          }
          else {              
            fetch("http://localhost:8080/api/v1/Users",{
              method:"POST",
              body:JSON.stringify({email:user.email, btn:checked,phone:Pnum}),
              headers:{"Content-Type":"application/json"}
              }).then(()=>{console.log('OTP SENT')}) 
          }
        })
      }, []);    
  // };

  // let count=1;
  const HandleClick = () => { 

           otp1=document.getElementById('otp').value;
        fetch("http://localhost:8080/api/v1/Users/send",{
            method:"POST",
            body:JSON.stringify({email:user.email, otp:otp1}),
         headers:{"Content-Type":"application/json"}
          }).then((res) => res.json())
          .then(otp => {
            // if(count<3)
            // {
            if (otp) {              
            console.log(otp);
              // window.open("http://localhost:4040");
              History.push("/")
              
              alert('LOGIN SUCCESSFUL')
              // this.props.navigation.navigate('/')
            }
            else {              
            alert('INAVLID OTP')
              // count++;
            }
          // }
          // else{
          //   alert('ENTERED INAVLID OTP THRICE')
          //   document.getElementById('resend').style.display="block";
          // }
          })
    

  };
 
  const HandleResend = () => {
    // useEffect(() => { 
      // count=1;
      fetch(`http://localhost:8080/api/v1/Users/${email}`,{
        method:"PUT",
        body:JSON.stringify({email:user.email, btn:checked}),
        headers:{"Content-Type":"application/json"}
        }).then(()=>{console.log('OTP RESENT')}) 
            // }, []);        
};

  return (    
    <div className="App">
      <h1>OTP VERIFICATION</h1>
      <h6>Enter the received otp below</h6>
      {/* <button onClick={handleOtp}>Send OTP</button> */}
      <div className="mx-auto" id="hide" style={{width: "200"}}>
      {/* ,display:"none" */}
        <input type="text" id="otp" name="otp" placeholder="Enter otp" required />
        <button onClick={HandleClick}>Submit</button><br></br>
        <div id="timer">We can resend the OTP in: {counter}s</div>
        <button onClick={HandleResend} id="resend" style={{display:"none",marginLeft:"45%",marginTop:"5%",}}>Resend OTP</button>
      </div>
    </div>

  );
};


export default OtpView;