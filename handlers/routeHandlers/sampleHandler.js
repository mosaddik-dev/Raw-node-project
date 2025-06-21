/*
 * Title: Sample Handler
 * Description: Sample Handler
 * Author: Mosaddik Billah
 * Email: mosaddikdev@gmail.com
 * Domain: https://mosaddikbillah.wixsquad.com/
 * Date: 28/01/2025
 */

//____________________________________--

// module scaffolding
const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
  callback(200, {
    message: "this is a sample url",
  });
};

module.exports = handler;
