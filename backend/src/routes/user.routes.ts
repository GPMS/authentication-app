import { Router } from "express";

import { verifyToken } from "../middlewares/authJWT";
import { userController } from "../controllers/user.controllers";

export const userRouter = Router();

userRouter.get("/", verifyToken, userController.getUserInfo);
userRouter.put("/", verifyToken, userController.updateUserInfo);
