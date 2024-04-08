import { Router } from "express";

import { verifyToken } from "../../middlewares/verifyToken";
import { userController } from "./controller";

export const userRouter = Router();

userRouter.get("/", verifyToken, userController.getUserInfo);
userRouter.put("/", verifyToken, userController.updateUserInfo);
