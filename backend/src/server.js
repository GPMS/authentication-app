import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { authRoutes } from "./routes/auth.routes.js";
import { userRoutes } from "./routes/user.routes.js";

const app = express();
const PORT = 3000;

dotenv.config();

app.use(cors());
app.use(express.json());

authRoutes(app);
userRoutes(app);

const server = app.listen(PORT, () => {
  console.log(`INFO: Listening on port ${PORT}...`);
});
