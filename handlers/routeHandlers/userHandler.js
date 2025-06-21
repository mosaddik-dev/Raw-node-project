/*
 * Title: User Handler
 * Description:  handler to handle user releted routes
 * Author: Mosaddik Billah
 * Email: mosaddikdev@gmail.com
 * Domain: https://mosaddik.vercel.app/
 * Date: 17/06/2025
 */

// dependencies
const data = require("../../lib/data");
const { hash, parseJSON } = require("./../../helpers/utilities");
const tokenHandler = require("./tokenHandler");

// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._users[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};

handler._users = {};

handler._users.post = (requestProperties, callback) => {
  // firstname
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  // lastname
  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

  // phone
  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;

  // password
  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  // terms of service agreement
  const tosAgreement =
    typeof requestProperties.body.tosAgreement === "boolean" &&
    requestProperties.body.tosAgreement
      ? requestProperties.body.tosAgreement
      : false;
  {
    // condition
    if (firstName && lastName && phone && password && tosAgreement) {
      // // make sure that the user doesn't already exists.
      // data.read("users", phone, (err1, user) => {
      //   if (err1) {
      //     let userObject = {
      //       firstName,
      //       lastName,
      //       phone,
      //       password: hash(password),
      //       tosAgreement,
      //     };

      //     console.log("inside 2");

      //     // store the user to DB
      //     data.create("users", phone, userObject, (err2) => {
      //       if (!err2) {
      //         callback(200, {
      //           message: "User was created successfully!",
      //         });
      //       } else {
      //         callback(500, {
      //           error: "Could not create user!",
      //         });
      //       }
      //     });
      //   } else {
      //     callback(500, {
      //       error: "There was a problem in server side!",
      //     });
      //   }
      // });

      // make sure that the user doesn't already exists.
      data.read("users", phone, (err1, user) => {
        if (err1) {
          let userObject = {
            firstName,
            lastName,
            phone,
            password: hash(password),
            tosAgreement,
          };

          // store the user to DB
          data.create("users", phone, userObject, (err2) => {
            if (!err2) {
              callback(200, {
                message: "User was created successfully!",
              });
            } else {
              callback(500, {
                error: "Could not create user!",
              });
            }
          });
        } else {
          callback(400, {
            error: "User with this phone number already exists.",
          });
        }
      });
    } else {
      callback(400, {
        error: "You have a problem in your request.",
      });
    }
  }
};

handler._users.get = (requestProperties, callback) => {
  // check the phone number if valid
  const phone =
    typeof requestProperties.queryStringObject.phone === "string" &&
    requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone
      : false;

  if (phone) {
    // varify token
    let token =
      typeof requestProperties.headerObject.token === "string"
        ? requestProperties.headerObject.token
        : false;

    tokenHandler._token.varify(token, phone, (tokenId) => {
      if (tokenId) {
        // lookup the user
        data.read("users", phone, (err, u) => {
          const user = { ...parseJSON(u) };
          if (!err && user) {
            delete user.password;
            callback(200, user);
          } else {
            callback(404, {
              error: "Requested user was not found!",
            });
          }
        });
      } else {
        callback(403, {
          error: "Authentication failure!",
        });
      }
    });
  } else {
    callback(404, {
      error: "Requested user was not found!",
    });
  }
};

handler._users.put = (requestProperties, callback) => {
  // firstname
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  // lastname
  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

  // phone
  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;

  // password
  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  if (phone) {
    if (firstName || lastName || password) {
      // varify token
      let token =
        typeof requestProperties.headerObject.token === "string"
          ? requestProperties.headerObject.token
          : false;

      tokenHandler._token.varify(token, phone, (tokenId) => {
        if (tokenId) {
          // lookup the user
          data.read("users", phone, (err1, uData) => {
            const userData = { ...parseJSON(uData) };

            if (!err1 && userData) {
              if (firstName) {
                userData.firstName = firstName;
              }
              if (lastName) {
                userData.lastName = lastName;
              }
              if (password) {
                userData.password = hash(password);
              }

              // update to database
              data.update("users", phone, userData, (err2) => {
                if (!err2) {
                  callback(200, {
                    message: "User was updated successfully!",
                  });
                } else {
                  callback(500, {
                    error: "There was a problem in the server side!",
                  });
                }
              });
            } else {
              callback(400, {
                error: "You have a problem in your request!",
              });
            }
          });
        } else {
          callback(403, {
            error: "Authentication failure!",
          });
        }
      });
    } else {
      callback(400, {
        error: "You have a problem in your request!",
      });
    }
  } else {
    callback(400, {
      error: "Invalid phone number. please try again!",
    });
  }
};

handler._users.delete = (requestProperties, callback) => {
  // check the phone number if valid
  const phone =
    typeof requestProperties.queryStringObject.phone === "string" &&
    requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone
      : false;

  if (phone) {
    // varify token
    let token =
      typeof requestProperties.headerObject.token === "string"
        ? requestProperties.headerObject.token
        : false;

    tokenHandler._token.varify(token, phone, (tokenId) => {
      if (tokenId) {
        // lookup the user
        data.read("users", phone, (err1, userData) => {
          if (!err1 && userData) {
            data.delete("users", phone, (err2) => {
              if (!err2) {
                callback(200, {
                  error: "User was successfully deleted!",
                });
              } else {
                callback(500, {
                  error: "There was a server side error!",
                });
              }
            });
          } else {
            callback(500, {
              error: "There was a server side error!",
            });
          }
        });
      } else {
        callback(403, {
          error: "Authentication failure!",
        });
      }
    });
  } else {
    callback(400, {
      error: "There was a problem in your request!",
    });
  }
};

module.exports = handler;
