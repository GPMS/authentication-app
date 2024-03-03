import {
  login,
  register,
  COOKIE_NAME,
} from "../controllers/auth.controllers.js";
import { verifyToken } from "../middlewares/authJWT.js";
import { BadRequest, Forbidden, Conflict } from "../errors.js";

/**
 * @param {import('express').Express} app
 */
export function authRoutes(app) {
  app.post("/auth/register", async (req, res) => {
    console.info("Register");
    const { email, password } = req.body;
    if (!password || !email) {
      throw new BadRequest("No email or password provided");
    }
    const token = await register(email, password);
    if (!token) {
      throw new Conflict(`User with email ${email} already exists`);
    }
    res.cookie(COOKIE_NAME, token, { httpOnly: true });
    res.status(201).send({
      accessToken: token,
    });
  });
  app.post("/auth/login", async (req, res) => {
    console.info("Login");
    const { email, password } = req.body;
    if (!password || !email) {
      throw new BadRequest("No email or password provided");
    }
    const token = await login(email, password);
    if (!token) {
      throw new Forbidden("Invalid email or password");
    }
    res.cookie(COOKIE_NAME, token, { httpOnly: true });
    res.send({
      accessToken: token,
    });
  });
  app.post("/auth/logout", verifyToken, (_, res) => {
    res.clearCookie(COOKIE_NAME);
    res.send();
  });
}
