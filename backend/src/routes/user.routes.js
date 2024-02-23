import { verifyToken } from "../middlewares/authJWT.js";
import {
  getUserInfo,
  updateUserInfo,
} from "../controllers/user.controllers.js";

/**
 * @param {import('express').Express} app
 */
export function userRoutes(app) {
  app.get("/user", verifyToken, getUserInfo);
  app.put("/user", verifyToken, updateUserInfo);
}
