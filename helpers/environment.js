/*
 * Title: Environments
 * Description: Handle All Environment releted things
 * Author: Mosaddik Billah
 * Email: mosaddikdev@gmail.com
 * Domain: https://mosaddik.vercel.app/
 * Date: 17/06/2025
 */

// dependencies

// module scaffolding
const environment = {};

environment.staging = {
  port: 3000,
  envName: "staging",
  secretKey: "12345",
  maxChecks: 5,
  twilio: {
    fromPhone: "+17164775944",
    accountSid: "ACb874fde3bd9d4ccbe54bbf848532d3a1",
    authToken: "09d84ea6bf61eca2ed5b16f07525ae5f",
  },
};

environment.production = {
  port: 5000,
  envName: "production",
  secretKey: "123456",
  maxChecks: 5,
  twilio: {
    fromPhone: "+17164775944",
    accountSid: "ACb874fde3bd9d4ccbe54bbf848532d3a1",
    authToken: "09d84ea6bf61eca2ed5b16f07525ae5f",
  },
};

// determine which environment was passed
const currentEnvironment =
  typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

// export corresponding environment object
const environmentToExport =
  typeof environment[currentEnvironment] === "object"
    ? environment[currentEnvironment]
    : environment.staging;

// export module
module.exports = environmentToExport;
