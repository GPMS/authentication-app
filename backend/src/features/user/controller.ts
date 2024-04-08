import { Request, Response } from "express";

import { BadRequest } from "../../errors";
import { UserSchema } from "../models/user";
import { userService } from "./userService";

export const userController = {
  getUserInfo: async (req: Request, res: Response) => {
    if (!req.userId) {
      throw new Error("No user id");
    }
    const userInfo = await userService.getUserInfo(req.userId);
    if (!userInfo) {
      throw new BadRequest(`no user with id ${req.userId}`);
    }
    res.send(userInfo);
  },
  updateUserInfo: async (req: Request, res: Response) => {
    console.log("Update");
    const updateBody = UserSchema.partial().safeParse(req.body);
    if (!updateBody.success) {
      const issues = updateBody.error.issues.map((issue) => issue.message);
      throw new BadRequest(issues.join("; "));
    }
    if (!req.userId) {
      throw new Error("No user id");
    }
    if (!(await userService.updateUserInfo(req.userId, updateBody.data))) {
      throw new BadRequest(`no user with id ${req.userId}`);
    }
    res.send();
  },
};
