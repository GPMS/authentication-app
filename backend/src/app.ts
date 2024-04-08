import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "express-async-errors";

import { config } from "./config";
import { authRouter } from "./features/auth/routes";
import { userRouter } from "./features/user/routes";
import { handleErrors } from "./middlewares/handleErrors";

console.info("INFO: Starting Express.js application");

export const app = express();

app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send({ message: "Welcome to my app" });
});

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use(handleErrors);
