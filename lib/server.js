// /*
//  * Title: Server Library
//  * Description: server releted files
//  * Author: Mosaddik Billah
//  * Date: 21 oct 2024
//  */

// dependencies
const http = require("http");
const { handleResReq } = require("./../helpers/handleReqRes");
const environment = require("./../helpers/environment");
// const data = require("./lib/data");

// server object - module scaffolding
const server = {};

// create server
server.createServer = () => {
  const createServerVariable = http.createServer(server.handleReqRes);
  createServerVariable.listen(environment.port, () => {
    console.log(`listening to port ${environment.port}`);
  });
};

// handle Request Response
server.handleReqRes = handleResReq;

// start the server
server.init = () => {
  server.createServer();
};

// export
module.exports = server;
