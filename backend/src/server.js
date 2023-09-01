import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { authRoutes } from "./routes/auth.routes.js";
import { userRoutes } from "./routes/user.routes.js";

const app = express();
const PORT = 3000;

dotenv.config();

const corsOptions = {
  methods: "GET,PUT,POST",
  origin: process.env.NODE_ENV === "development" ? "http://localhost:5173" : "",
};

app.use(cors(corsOptions));
app.use(express.json());

authRoutes(app);
userRoutes(app);

const server = app.listen(PORT, () => {
  console.log(`INFO: Listening on port ${PORT}...`);
});
