// /*
//  * Title: Uptime Monitoring Application
//  * Description: A RESTFul API to monitor up or down time of user defined links
//  * Author: Mosaddik Billah
//  * Date: 21 oct 2024
//  */

// dependencies
const http = require("http");
const { handleResReq } = require("./helpers/handleReqRes");
const environment = require("./helpers/environment");
const data = require("./lib/data");

// app object - module scaffolding
const app = {};

// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environment.port, () => {
    console.log(`listening to port ${environment.port}`);
  });
};

// handle Request Response
app.handleReqRes = handleResReq;

// start the server
app.createServer();
