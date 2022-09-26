// import { useAuth0 } from "@auth0/auth0-react";
// import React, { useState } from "react";
// import { Button, ButtonGroup, Container } from "react-bootstrap";
// import Highlight from "../components/highlight";

// export const ExternalApi = () => {
//   const { user, isAuthenticated } = useAuth0();
//   fetch("http://localhost:8080/api/v1/Users",{
//     method:"POST",
//    body:JSON.stringify({email:user.email, username:user.name}),
//     headers:{"Content-Type":"application/json"}
//   }).then(()=>{console.log("new user added")})

//   return (
//   isAuthenticated && (
//     <Container className="mb-5">
//       <div className="next-steps my-5">
//     <label for="a">Multi Factor Authentication:</label> 
//   </div>
//     </Container>
//   )
//   );
        
// };

// export default ExternalApi;
