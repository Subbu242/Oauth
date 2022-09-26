import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { NavBar, Footer, Loading } from "./components";
import { Home, ExternalApi } from "./views";
import {OtpCodePage} from "./views";
import Profile from "./views/profile";
import ProtectedRoute from "./components/protected-route";
import "./app.css";
import Settings from "./views/settings";
// import ToggleSwitch from "./components/toggleswitch";

const App = () => {
  const {isLoading} = useAuth0();
  // const { checked } = ToggleSwitch();
  if(isLoading){
    return <Loading />;
  }
  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <Container className="flex-grow-1 mt-5">
        <Switch>
          <Route path="/" exact component={Home} />  
          {/* if(checked===true)   
          {      */}
          <Route path="/otpcpage" component={OtpCodePage} />
          {/* }  */}
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
