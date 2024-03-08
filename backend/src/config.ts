import dotenv from "dotenv";

type GithubConfig = {
  clientId?: string;
  clientSecret?: string;
};

type Config = {
  frontendUrl: string;
  port: number;
  databaseURL?: string;
  jwtAccessTokenSecret?: string;
  github: GithubConfig;
};

export let config: Config | null = null;

export function loadConfig() {
  dotenv.config();

  config = {
    frontendUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : "https://authentication-app-frontend-five.vercel.app",
    port: process.env.PORT ? parseInt(process.env.PORT) : 5000,
    databaseURL:
      process.env.NODE_ENV === "development"
        ? "mongodb://127.0.0.1:27017"
        : process.env.DB_URL,
    jwtAccessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
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
