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
exports.userController = void 0;
const errors_1 = require("../errors");
const user_1 = require("../database/models/user");
const userService_1 = require("../services/userService");
exports.userController = {
    getUserInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.userId) {
            throw new Error("No user id");
        }
        const userInfo = yield userService_1.userService.getUserInfo(req.userId);
        if (!userInfo) {
            throw new errors_1.BadRequest(`no user with id ${req.userId}`);
        }
        res.send(userInfo);
    }),
    updateUserInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Update");
        const updateBody = user_1.UserSchema.partial().safeParse(req.body);
        if (!updateBody.success) {
            const issues = updateBody.error.issues.map((issue) => issue.message);
            throw new errors_1.BadRequest(issues.join("; "));
        }
        if (!req.userId) {
            throw new Error("No user id");
        }
        if (!(yield userService_1.userService.updateUserInfo(req.userId, updateBody.data))) {
            throw new errors_1.BadRequest(`no user with id ${req.userId}`);
        }
        res.send();
    }),
};
