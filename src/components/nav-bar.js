import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./login-button";
import LogoutButton from "./logout-button";

const MainNav = () => (
  <Nav className="mr-auto">
    <Nav.Link
      as={RouterNavLink}
      to="/"
      exact
      activeClassName="router-link-exact-active"
    >
      Home
    </Nav.Link>
    <Nav.Link
      as={RouterNavLink}
      to="/profile"
      exact
      activeClassName="router-link-exact-active"
    >
      Profile
    </Nav.Link>
    <Nav.Link
      as={RouterNavLink}
      to="/settings"
      exact
      activeClassName="router-link-exact-active"
    >
      Settings
    </Nav.Link>
  </Nav>
);

const AuthNav = () => {
  const {isAuthenticated} = useAuth0();

  return (
    <Nav className="justify-content-end">
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </Nav> 
  );
};

const NavBar = () => {
  const {isAuthenticated} = useAuth0();
  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand as={RouterNavLink} className="logo" to="/" />
        {isAuthenticated ? <MainNav /> : " "}
        { <AuthNav /> }
      </Container>
    </Navbar>
  );
};

export default NavBar;
