import React from "react";
import { Route, Switch,Redirect,withRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import {  Footer, Loading } from "./components";
import { Home, ExternalApi } from "./views";
import OTP from "./components/otpview";
import Profile from "./views/profile";
import ProtectedRoute from "./components/protected-route";
import "./app.css";
import Settings from "./views/settings";
import RedirecttUrl from "./views/Redirecting"


const App = () => {
  const {isLoading} = useAuth0();
  if(isLoading){
    return <Loading />;
  }
  return (
    <div id="app" className="d-flex flex-column h-100" style={{backgroundImage: `url("https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/norfolk-va-virginiaoduold-dominion-universitydarden-college-of-education-dave-lynch.jpg")`,backgroundSize:"cover" }}>
      {/* <NavBar /> */}
      <Container className="flex-grow-1 mt-5">
        <Switch>
          <Route path="/" exact component={Home} />  
          {/* <Route path="/otpcpage" component={OtpCodePage} /> */}
          <Route path="/redirecting" component={RedirecttUrl} />
          <Route path="/otpview" component={OTP} />
          <ProtectedRoute path="/profile" component={Profile} />
          {/* <ProtectedRoute path="/external-api" component={ExternalApi} /> */}
          <ProtectedRoute path="/settings" component={Settings} />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
