import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "express-async-errors";

import { config, loadConfig } from "./config";
import { authRoutes } from "./routes/auth.routes";
import { userRoutes } from "./routes/user.routes";
import { connectDB, disconnectDB } from "./db";
import { handleErrors } from "./middlewares/handleErrors";
import { Server } from "http";

let server: Server | null = null;

let shuttingDown = false;

function cleanup() {
  if (!server) return;
  shuttingDown = true;
  server.close(async () => {
    await disconnectDB();
    process.exit();
  });

  setTimeout(() => {
    console.error(
      "ERROR: Could not close connections in time, forcing shut down"
    );
    process.exit(1);
  }, 30 * 1000);
}

async function start() {
  console.info("INFO: Starting Express.js application");

  loadConfig();

  const app = express();

  app.use(
    cors({
      origin: config.isDev
        ? "http://localhost:5173"
        : "https://authentication-app-frontend-five.vercel.app",
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());

  app.use((_, res, next) => {
    if (!shuttingDown) return next();

    res.setHeader("Connection", "close");
    res.status(503).send("Server is in the process of shutting down");
  });

  app.get("/", (req, res) => {
    res.send({ message: "Welcome to my app" });
  });

  authRoutes(app);
  userRoutes(app);

  app.use(handleErrors);

  await connectDB();
  server = app.listen(config.port, () => {
    console.info(`INFO: Listening on port ${config.port}...`);
  });

  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);
}

start();
