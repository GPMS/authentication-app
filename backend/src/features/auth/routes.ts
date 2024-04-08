import { Router } from "express";

import { AuthController } from "./controller";
import { verifyToken } from "../../middlewares/verifyToken";
import { AuthService } from "./service";
import { GithubProvider } from "./githubProvider";

export const authRouter = Router();

function factory() {
  return new AuthController(new AuthService(), new GithubProvider());
}

authRouter.post("/register", (req, res, next) => {
  factory().register(req, res, next);
});
authRouter.post("/login", (req, res, next) => {
  factory().login(req, res, next);
});
authRouter.post("/logout", verifyToken, (req, res, next) => {
  factory().logout(req, res, next);
});

authRouter.get("/github", (req, res, next) => {
  factory().getGithubUrl(req, res, next);
});
authRouter.get("/github/callback", (req, res, next) => {
  factory().githubCallback(req, res, next);
});
