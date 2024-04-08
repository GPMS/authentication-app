"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const verifyToken_1 = require("../../middlewares/verifyToken");
const controller_1 = require("./controller");
const service_1 = require("./service");
const userRepositoryMongoose_1 = require("../repositories/userRepositoryMongoose");
exports.userRouter = (0, express_1.Router)();
function factory() {
    return new controller_1.UserController(new service_1.UserService(new userRepositoryMongoose_1.UserRepositoryMongoose()));
}
exports.userRouter.get("/", verifyToken_1.verifyToken, (req, res, next) => {
    factory().getUserInfo(req, res, next);
});
exports.userRouter.put("/", verifyToken_1.verifyToken, (req, res, next) => {
    factory().updateUserInfo(req, res, next);
});
