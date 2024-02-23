import { login, logout, register } from "../controllers/auth.controllers.js";
import { verifyToken } from "../middlewares/authJWT.js";

/**
 * @param {import('express').Express} app
 */
export function authRoutes(app) {
  app.post("/auth/register", register);
  app.post("/auth/login", login);
  app.post("/auth/logout", verifyToken, logout);
}
