import { verifyToken } from "../middlewares/authJWT.js";
import {
  getUserInfo,
  updateUserInfo,
} from "../controllers/user.controllers.js";
import { BadRequest } from "../errors.js";

/**
 * @param {import('express').Express} app
 */
export function userRoutes(app) {
  app.get("/user", verifyToken, async (req, res) => {
    const userInfo = await getUserInfo(req.userId);
    if (!userInfo) {
      throw new BadRequest(`no user with id ${req.userId}`);
    }
    res.send(userInfo);
  });
  app.put("/user", verifyToken, async (req, res) => {
    console.log("Update");
    const newToken = await updateUserInfo(req.userId, req.body);
    if (!newToken) {
      throw new BadRequest(`no user with id ${req.userId}`);
    }
    res.send({
      accessToken: newToken,
    });
  });
}
