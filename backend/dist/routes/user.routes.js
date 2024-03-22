"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const authJWT_1 = require("../middlewares/authJWT");
const user_controllers_1 = require("../controllers/user.controllers");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get("/", authJWT_1.verifyToken, user_controllers_1.userController.getUserInfo);
exports.userRouter.put("/", authJWT_1.verifyToken, user_controllers_1.userController.updateUserInfo);
