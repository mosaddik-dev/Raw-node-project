/*
 * Title: Not Found Handler
 * Description: 404 Not Found Handler
 * Author: Mosaddik Billah
 * Email: mosaddikdev@gmail.com
 * Domain: https://mosaddikbillah.wixsquad.com/
 * Date: 28/
 *
 * 01/2025
 */

//____________________________________

// module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
  callback(404, {
    message: "Your requested url was not found!",
  });
};

module.exports = handler;
