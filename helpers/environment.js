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
  secretKey: "skdfksljfoseieueolkfsm",
};

environment.production = {
  port: 5000,
  envName: "production",
  secretKey: "sejiewoifldmiekdsmeokl",
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
