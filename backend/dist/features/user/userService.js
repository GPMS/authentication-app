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
exports.userService = void 0;
const utils_1 = require("../../utils");
const user_1 = require("../models/user");
exports.userService = {
    getUserInfo: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        let user = yield user_1.User.findById(userId).select({ _id: 0, __v: 0 }).exec();
        return user;
    }),
    updateUserInfo: (userId, newUserInfo) => __awaiter(void 0, void 0, void 0, function* () {
        if (newUserInfo.password) {
            newUserInfo.password = yield (0, utils_1.hashPassword)(newUserInfo.password);
        }
        const updatedUser = yield user_1.User.findByIdAndUpdate(userId, {
            $set: newUserInfo,
        }, { returnDocument: "after" }).exec();
        return updatedUser != null;
    }),
};
