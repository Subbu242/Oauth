import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./login-button";
import LogoutButton from "./logout-button";
import { Container, Nav, Navbar } from "react-bootstrap";
import contentData from "../utils/content-data";
import { Col, Row } from "react-bootstrap";


const Content = () => {
  const {isAuthenticated} = useAuth0();
  return (
  <div className="next-steps my-5" >
    <h2 className="my-5 text-center">
      {isAuthenticated ? "WELCOME" : "MULTI FACTOR AUTHENTICATION"}
      </h2>
    
  </div>
  );
  
  };
export default Content;
