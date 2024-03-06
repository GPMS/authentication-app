import { Express } from "express";
import { verifyToken } from "../middlewares/authJWT";
import { getUserInfo, updateUserInfo } from "../controllers/user.controllers";
import { BadRequest } from "../errors";

export function userRoutes(app: Express) {
  app.get("/user", verifyToken, async (req, res) => {
    if (!req.userId) {
      throw new Error("No user id");
    }
    const userInfo = await getUserInfo(req.userId);
    if (!userInfo) {
      throw new BadRequest(`no user with id ${req.userId}`);
    }
    res.send(userInfo);
  });
  app.put("/user", verifyToken, async (req, res) => {
    console.log("Update");
    if (!req.userId) {
      throw new Error("No user id");
    }
    const newToken = await updateUserInfo(req.userId, req.body);
    if (!newToken) {
      throw new BadRequest(`no user with id ${req.userId}`);
    }
    res.send({
      accessToken: newToken,
    });
  });
}
