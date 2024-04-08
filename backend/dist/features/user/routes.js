"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const verifyToken_1 = require("../../middlewares/verifyToken");
const controller_1 = require("./controller");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get("/", verifyToken_1.verifyToken, controller_1.userController.getUserInfo);
exports.userRouter.put("/", verifyToken_1.verifyToken, controller_1.userController.updateUserInfo);
