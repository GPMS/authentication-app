import { Request, Response } from "express";

import { BadRequest } from "../../errors";
import { userService } from "./userService";
import { validateUpdateUserDTO } from "./validateUpdateUserDTO";

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
    if (!req.userId) {
      throw new Error("No user id");
    }
    const updateBody = validateUpdateUserDTO(req.body);
    if (!userService.updateUserInfo(req.userId, updateBody)) {
      throw new BadRequest(`no user with id ${req.userId}`);
    }
    res.send();
  },
};
