import dotenv from "dotenv";

type Config = {
  isDev: boolean;
  port: number;
  databaseURL?: string;
  jwtAccessTokenSecret?: string;
};

export let config: Config | null = null;

export function loadConfig() {
  dotenv.config();

  config = {
    isDev: process.env.NODE_ENV === "development",
    port: process.env.PORT ? parseInt(process.env.PORT) : 5000,
    databaseURL:
      process.env.NODE_ENV === "development"
        ? "mongodb://127.0.0.1:27017"
        : process.env.DB_URL,
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
