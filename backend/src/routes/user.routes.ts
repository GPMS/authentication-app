import { Express, Router } from "express";
import { verifyToken } from "../middlewares/authJWT";
import { getUserInfo, updateUserInfo } from "../controllers/user.controllers";
import { BadRequest } from "../errors";
import { UserSchema } from "../database/models/user";

export const userRouter = Router();

userRouter.get("/", verifyToken, async (req, res) => {
  if (!req.userId) {
    throw new Error("No user id");
  }
  const userInfo = await getUserInfo(req.userId);
  if (!userInfo) {
    throw new BadRequest(`no user with id ${req.userId}`);
  }
  res.send(userInfo);
});

userRouter.put("/", verifyToken, async (req, res) => {
  console.log("Update");
  const updateBody = UserSchema.partial().safeParse(req.body);
  if (!updateBody.success) {
    const issues = updateBody.error.issues.map((issue) => issue.message);
    throw new BadRequest(issues.join("; "));
  }
  if (!req.userId) {
    throw new Error("No user id");
  }
  if (!(await updateUserInfo(req.userId, updateBody.data))) {
    throw new BadRequest(`no user with id ${req.userId}`);
  }
  res.send();
});
