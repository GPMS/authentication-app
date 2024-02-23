import { login, register } from "../controllers/auth.controllers.js";

/**
 * @param {import('express').Express} app
 */
export function authRoutes(app) {
  app.post("/auth/register", register);
  app.post("/auth/login", login);
}
