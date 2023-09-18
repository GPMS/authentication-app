import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { authRoutes } from "./routes/auth.routes.js";
import { userRoutes } from "./routes/user.routes.js";
import { connectDB, disconnectDB } from "./db.js";

const app = express();
const PORT = 3000;
let shuttingDown = false;

dotenv.config();

const corsOptions = {
  methods: "GET,PUT,POST",
  origin: process.env.NODE_ENV === "development" ? "http://localhost:5173" : "",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use((_, resp, next) => {
  if (!shuttingDown) return next();

  resp.setHeader("Connection", "close");
  resp.send(503, "Server is in the process of shutting down");
});

authRoutes(app);
userRoutes(app);

await connectDB();
const server = app.listen(PORT, () => {
  console.log(`INFO: Listening on port ${PORT}...`);
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
