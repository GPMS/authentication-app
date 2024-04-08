import { Router } from "express";

import { authController } from "./controller";
import { verifyToken } from "../../middlewares/verifyToken";

export const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/logout", verifyToken, authController.logout);

authRouter.get("/github", authController.getGithubUrl);
authRouter.get("/github/callback", authController.githubCallback);
