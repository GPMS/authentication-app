import dotenv from "dotenv";

/**
 * @typedef {Object} Config
 * @property {boolean | undefined} isDev
 * @property {integer | undefined} port
 * @property {string | undefined} databaseURL
 * @property {string | undefined} jwtAccessTokenSecret
 */

/**
 * @type {Config}
 */
export let config = null;

export function loadConfig() {
  dotenv.config();

  config = {
    isDev: process.env.NODE_ENV === "development",
    port: process.env.PORT ? parseInt(process.env.PORT) : 5000,
    databaseURL: process.env.DB_URL ?? "mongodb://127.0.0.1:27017",
    jwtAccessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  };

  // Check if all environmental variables are defined
  const undefinedVariables = [];
  for (const [key, value] of Object.entries(config)) {
    if (typeof value === "undefined") {
      undefinedVariables.push(key);
    }
  }
  if (undefinedVariables.length) {
    throw new Error(
      `Environmental variables not defined: ${undefinedVariables.join(",")}`
    );
  }
}
