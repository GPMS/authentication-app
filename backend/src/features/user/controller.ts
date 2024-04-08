import { NextFunction, Request, Response } from "express";

import { BadRequest } from "../../errors";
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
        throw new BadRequest(`no user with id ${req.userId}`);
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
      if (!this.userService.updateUserInfo(req.userId, updateBody)) {
        throw new BadRequest(`no user with id ${req.userId}`);
      }
      res.send();
    } catch (e) {
      next(e);
    }
  }
}
