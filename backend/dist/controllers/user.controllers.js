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
exports.updateUserInfo = exports.getUserInfo = void 0;
const util_1 = require("../util");
const user_1 = require("../models/user");
function getUserInfo(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield user_1.User.findById(userId).select({ _id: 0, __v: 0 }).exec();
        return user;
    });
}
exports.getUserInfo = getUserInfo;
function updateUserInfo(userId, newUserInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        if (newUserInfo === null || newUserInfo === void 0 ? void 0 : newUserInfo.password) {
            newUserInfo.password = yield (0, util_1.hashPassword)(newUserInfo.password);
        }
        const updatedUser = yield user_1.User.findByIdAndUpdate(userId, {
            $set: newUserInfo,
        }, { returnDocument: "after" }).exec();
        if (!updatedUser) {
            return null;
        }
        return (0, util_1.generateToken)({ id: updatedUser.id });
    });
}
exports.updateUserInfo = updateUserInfo;
