"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const errors_1 = require("../../errors");
const userService_1 = require("./userService");
const validateUpdateUserDTO_1 = require("./validateUpdateUserDTO");
exports.userController = {
    getUserInfo: async (req, res) => {
        if (!req.userId) {
            throw new Error("No user id");
        }
        const userInfo = await userService_1.userService.getUserInfo(req.userId);
        if (!userInfo) {
            throw new errors_1.BadRequest(`no user with id ${req.userId}`);
        }
        res.send(userInfo);
    },
    updateUserInfo: async (req, res) => {
        console.log("Update");
        if (!req.userId) {
            throw new Error("No user id");
        }
        const updateBody = (0, validateUpdateUserDTO_1.validateUpdateUserDTO)(req.body);
        if (!userService_1.userService.updateUserInfo(req.userId, updateBody)) {
            throw new errors_1.BadRequest(`no user with id ${req.userId}`);
        }
        res.send();
    },
};
