/*
 * Title: Handle Request Response
 * Description: handle request and response
 * Author: Mosaddik Billah
 * Email: mosaddikdev@gmail.com
 * Domain: https://mosaddikbillah.wixsquad.com/
 * Date: 28 jan 2025
 */

// dependencies
const url = require("url");
const { StringDecoder } = require("string_decoder");
const { parseJSON } = require("./utilities");
const routes = require("./routes");
const {
  notFoundHandler,
} = require("../handlers/routeHandlers/notFoundHandler");

// module scaffolding
const handler = {};

handler.handleResReq = (req, res) => {
  // request handling
  // get the url and parse it
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.query;
  const headerObject = req.headers;

  const requestProperties = {
    parsedUrl,
    path,
    trimmedPath,
    method,
    queryStringObject,
    headerObject,
  };

  const decoder = new StringDecoder("utf-8");
  let realData = "";

  const chosenHandler = routes[trimmedPath]
    ? routes[trimmedPath]
    : notFoundHandler;

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });

  req.on("end", () => {
    realData += decoder.end();

    requestProperties.body = parseJSON(realData);

    chosenHandler(requestProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === "number" ? statusCode : 500;
      payload = typeof payload === "object" ? payload : {};

      const payloadString = JSON.stringify(payload);

      // return the final response
      // res.writeHead(200, );
      res.setHeader("Content-Type", "Application/json");
      res.writeHead(statusCode, { "Content-Type": "application/json" });
      res.end(payloadString);
    });

    // response handle
    // res.end("Hello Programmer!");
  });
};

module.exports = handler;
