"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const utils_1 = require("../../utils");
class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getUserInfo(userId) {
        let user = await this.userRepository.findById(userId);
        return user;
    }
    async updateUserInfo(userId, newUserInfo) {
        if (newUserInfo.password) {
            newUserInfo.password = await (0, utils_1.hashPassword)(newUserInfo.password);
        }
        const updatedUser = await this.userRepository.update(userId, newUserInfo);
        return updatedUser;
    }
}
exports.UserService = UserService;
