import React from "react";
import { Route } from "react-router-dom";
import {Button} from "react-bootstrap";
import {BrowserRouter as Router, Link} from 'react-router-dom';
import { Home } from "../views";
import { useAuth0 } from "@auth0/auth0-react";
import OtpCodePage from "../views";

 export const GetOtp = () => {    
//     const { user } = useAuth0();
//     const url = user.email;
    fetch("http://localhost:8080/api/v1/otp/subhusubhash24@gmail.com",{
      method:"GET"
    }).then(()=>{console.log("Retreived OTP")})

    return(
        <Route path="/" exact component={Home} />
    )
    }


const OtpSubmit = () => {
    return (
        <Router>
            <Link to="/otpcpage">
                <Button
                //onClick={() => handleSubmit}
                //onSubmit={handleSubmit}
                onClick={GetOtp}
                id = "qsLoginBtn"
                variant = "primary"
                className = "btn-margin"
                >
                    Submit
                </Button>
            </Link>
        </Router>    
    );
};

export default OtpSubmit;