"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const utils_1 = require("../../utils");
const user_1 = require("../models/user");
class UserService {
    constructor() { }
    async getUserInfo(userId) {
        let user = await user_1.UserModel.findById(userId)
            .select({ _id: 0, __v: 0 })
            .exec();
        return user;
    }
    async updateUserInfo(userId, newUserInfo) {
        if (newUserInfo.password) {
            newUserInfo.password = await (0, utils_1.hashPassword)(newUserInfo.password);
        }
        const updatedUser = await user_1.UserModel.findByIdAndUpdate(userId, {
            $set: newUserInfo,
        }, { returnDocument: "after" }).exec();
        return updatedUser != null;
    }
}
exports.UserService = UserService;
