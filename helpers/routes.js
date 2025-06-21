/*
 * Title: Routes
 * Description: Application Routes
 * Author: Mosaddik Billah
 * Email: mosaddikdev@gmail.com
 * Domain: https://mosaddikbillah.wixsquad.com/
 * Date: 28 jan 25
 */

//____________________________________

// dependencies
const { sampleHandler } = require("./../handlers/routeHandlers/sampleHandler");
const { userHandler } = require("./../handlers/routeHandlers/userHandler");
const { tokenHandler } = require("./../handlers/routeHandlers/tokenHandler");

const routes = {
  sample: sampleHandler,
  user: userHandler,
  token: tokenHandler,
};

module.exports = routes;
