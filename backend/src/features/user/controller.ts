import { NextFunction, Request, Response } from "express";

import { NoUserWithIdError } from "../../errors";
import { validateUpdateUserDTO } from "./validateUpdateUserDTO";
import { UserService } from "./service";

export class UserController {
  constructor(private userService: UserService) {}

  async getUserInfo(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.userId) {
        throw new Error("No user id");
      }
      const userInfo = await this.userService.getUserInfo(req.userId);
      if (!userInfo) {
        throw new NoUserWithIdError(req.userId);
      }
      res.send(userInfo);
    } catch (e) {
      next(e);
    }
  }

  async updateUserInfo(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.userId) {
        throw new Error("No user id");
      }
      const updateBody = validateUpdateUserDTO(req.body);
      const updatedUser = await this.userService.updateUserInfo(
        req.userId,
        updateBody
      );
      if (!updatedUser) {
        throw new NoUserWithIdError(req.userId);
      }
      res.send(updatedUser);
    } catch (e) {
      next(e);
    }
  }
}
