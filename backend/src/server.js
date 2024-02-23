import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { authRoutes } from "./routes/auth.routes.js";
import { userRoutes } from "./routes/user.routes.js";
import { connectDB, disconnectDB } from "./db.js";

console.info("INFO: Starting Express.js application");

const app = express();
const PORT = 5000;
let shuttingDown = false;

dotenv.config();

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use((_, resp, next) => {
  if (!shuttingDown) return next();

  resp.setHeader("Connection", "close");
  resp.send(503, "Server is in the process of shutting down");
});

app.get("/", (req, res) => {
  res.send({ message: "Welcome to my app" });
});

authRoutes(app);
userRoutes(app);

await connectDB();
const server = app.listen(PORT, () => {
  console.info(`INFO: Listening on port ${PORT}...`);
});

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

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
