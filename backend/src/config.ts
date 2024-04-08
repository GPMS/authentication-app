import dotenv from "dotenv";
import z from "zod";

const configSchema = z.object({
  frontendUrl: z.string().url(),
  port: z.coerce.number(),
  databaseURL: z.string().url(),
  jwtAccessTokenSecret: z.string(),
  github: z.object({
    clientId: z.string(),
    clientSecret: z.string(),
  }),
});

dotenv.config();

export const config = configSchema.parse({
  frontendUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5173"
      : "https://authentication-app-frontend-five.vercel.app",
  port: process.env.PORT ?? 5000,
  databaseURL:
    process.env.NODE_ENV === "development"
      ? "mongodb://127.0.0.1:27017"
      : process.env.DB_URL,
  jwtAccessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  },
});
