"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const authJWT_1 = require("../middlewares/authJWT");
const user_controllers_1 = require("../controllers/user.controllers");
const errors_1 = require("../errors");
const user_1 = require("../models/user");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get("/", authJWT_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.userId) {
        throw new Error("No user id");
    }
    const userInfo = yield (0, user_controllers_1.getUserInfo)(req.userId);
    if (!userInfo) {
        throw new errors_1.BadRequest(`no user with id ${req.userId}`);
    }
    res.send(userInfo);
}));
exports.userRouter.put("/", authJWT_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Update");
    const updateBody = user_1.UserSchema.partial().safeParse(req.body);
    if (!updateBody.success) {
        const issues = updateBody.error.issues.map((issue) => issue.message);
        throw new errors_1.BadRequest(issues.join("; "));
    }
    if (!req.userId) {
        throw new Error("No user id");
    }
    if (!(yield (0, user_controllers_1.updateUserInfo)(req.userId, updateBody.data))) {
        throw new errors_1.BadRequest(`no user with id ${req.userId}`);
    }
    res.send();
}));
