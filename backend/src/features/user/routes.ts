import { Router } from "express";

import { verifyToken } from "../../middlewares/verifyToken";
import { UserController } from "./controller";
import { UserService } from "./service";
import { UserRepositoryMongoose } from "../../repositories/userRepositoryMongoose";

export const userRouter = Router();

function factory() {
  return new UserController(new UserService(new UserRepositoryMongoose()));
}

userRouter.get("/", verifyToken, (req, res, next) => {
  factory().getUserInfo(req, res, next);
});
userRouter.put("/", verifyToken, (req, res, next) => {
  factory().updateUserInfo(req, res, next);
});
