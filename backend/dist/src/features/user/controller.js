"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const errors_1 = require("../../errors");
const validateUpdateUserDTO_1 = require("./validateUpdateUserDTO");
class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async getUserInfo(req, res, next) {
        try {
            if (!req.userId) {
                throw new Error("No user id");
            }
            const userInfo = await this.userService.getUserInfo(req.userId);
            if (!userInfo) {
                throw new errors_1.BadRequest(`no user with id ${req.userId}`);
            }
            res.send(userInfo);
        }
        catch (e) {
            next(e);
        }
    }
    async updateUserInfo(req, res, next) {
        try {
            if (!req.userId) {
                throw new Error("No user id");
            }
            const updateBody = (0, validateUpdateUserDTO_1.validateUpdateUserDTO)(req.body);
            const updatedUser = await this.userService.updateUserInfo(req.userId, updateBody);
            if (!updatedUser) {
                throw new errors_1.BadRequest(`no user with id ${req.userId}`);
            }
            res.send(updatedUser);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.UserController = UserController;
