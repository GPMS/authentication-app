import { Router } from "express";

import { authController } from "../controllers/auth.controllers";
import { verifyToken } from "../middlewares/authJWT";

export const authRouter = Router();

authRouter.post("register", authController.register);
authRouter.post("login", authController.login);
authRouter.post("logout", verifyToken, authController.logout);

authRouter.get("github", authController.getGithubUrl);
authRouter.get("github/callback", authController.githubCallback);
