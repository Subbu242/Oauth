const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const { resolve } = require("path");

require("dotenv").config({
  path: resolve(process.cwd(), "src", "server", ".env"),
});

const app = express();

const port = process.env.API_PORT;
const appOrigin = process.env.APP_ORIGIN;
const audience = process.env.AUTH0_AUDIENCE;
const issuer = process.env.AUTH0_ISSUER;

if (!issuer || !audience) {
  throw new Error("Please make sure that .env is in place and populated");
}

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${issuer}.well-known/jwks.json`,
  }),

  audience: audience,
  issuer: issuer,
  algorithms: ["RS256"],
});

app.get("/api/public-message", (req, res) => {
  res.send({
    msg: "The API doesn't require an access token to share this message.",
  });
});

app.get("/api/private-message", checkJwt, (req, res) => {
  res.send({
    msg: "The API successfully validated your access token.",
  });
});

app.listen(port, () => console.log(`API Server listening on port ${port}`));


// const express = require("express");
// const bodyParser = require('body-parser');
// const cors = require("cors");
 
// const app = express();
 
// app.use(cors());
// // parse application/json
// app.use(bodyParser.json());
  
// //create database connection
// const conn = mysql.createConnection({
//   host: 'localhost',
//   user: 'postgres',
//   password: 'Subhash22',
//   database: 'Users'
// });
 
// //connect to database
// conn.connect((err) =>{
//   if(err) throw err;
//   console.log('Mysql Connected...');
// });
 
 
// //add new user
// app.post('/store-data',(req, res) => {
//   let data = {name: req.body.name};
//   let sql = "INSERT INTO users SET ?";
//   let query = conn.query(sql, data,(err, results) => {
//     if(err) throw err;
//     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
//   });
// });
 
// app.listen(8080, () => {
//   console.log("Server running successfully on 3000");
// });
