import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import NavBar from "../components/nav-bar";
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
    
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <NavBar />
        <div style={{backgroundColor:"aqua",opacity:"0.8"}}>
        <img src={user.picture} alt={user.name} />
        {/* <h2>{user.name}</h2> */}
        <h2>{user.email}</h2>
        </div>
      </div>
    )
  );
};

export default Profile;
