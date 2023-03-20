import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

const Auth0ProviderWithHistory = ({ children }) => {
  const { user } = useAuth0();
  // let em=user.email;
  // const [checked, setChecked] = useState(true);
  // const [loading, setLoading] = useState(false);
  
  
  // useEffect(() => {
  //   fetch("http://localhost:8080/api/v1/btn/subhusubhash24@gmail.com", {  //getting button value from database
  //     method: "GET",
  //   }).then((res) => res.json())
  //     .then(data => {
  //       if(data)
  //       {
  //         setChecked(data);
  //       }
  //       else 
  //       {
  //         setChecked(false);
  //       }
  //       setLoading(true);
  //     })
  // }, []);

  // console.log(checked);
  const history = useHistory();
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
  // let redirect = checked ? `http://localhost:3000/otpview` : `http://localhost:3000`;
  // console.log(redirect);
  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  // if (loading return loading)
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      // redirectUri={`http://localhost:3000/otpview`}
      redirectUri={`${window.location.origin}/redirecting`}
      // redirectUri={redirect}
      onRedirectCallback={onRedirectCallback}
      audience={audience}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;