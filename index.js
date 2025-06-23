// /*
//  * Title: Project Initial file
//  * Description: Initial file to start the node server and workers
//  * Author: Mosaddik Billah
//  * Date: 21 oct 2024
//  */

// dependencies
// const http = require("http");
// const { handleResReq } = require("./helpers/handleReqRes");
const environment = require("./helpers/environment");
const server = require("./lib/server");
const workers = require("./lib/worker");

// app object - module scaffolding
const app = {};

app.init = () => {
  // start the server
  server.init();
  // start the worker
  workers.init()
};

app.init();

// export the app
module.exports = app;
