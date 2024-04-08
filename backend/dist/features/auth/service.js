"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const utils_1 = require("../../utils");
const user_1 = require("../models/user");
exports.authService = {
    register: async (email, password) => {
        if (await user_1.User.findOne({ email }).exec()) {
            return null;
        }
        const hashedPassword = await (0, utils_1.hashPassword)(password);
        const createdUser = await user_1.User.create({
            email,
            password: hashedPassword,
            provider: "local",
        });
        return (0, utils_1.generateToken)(createdUser.id);
    },
    login: async (email, password) => {
        const user = await user_1.User.findOne({ email }).select("+password").exec();
        if (!user || !(await (0, utils_1.verifyPassword)(password, user.password))) {
            return null;
        }
        return (0, utils_1.generateToken)(user.id);
    },
    loginWithService: async (code, oauthService) => {
        const accessToken = await oauthService.getAccessToken(code);
        const { name, email, avatar_url: photo, bio, } = await oauthService.getUserInfo(accessToken);
        // Create new user if it doesn't already exist
        let user = await user_1.User.findOne({ email }).exec();
        if (!user) {
            user = await user_1.User.create({ email, provider: "github", name, photo, bio });
            console.info(`GitHub Oauth: Created new user`);
        }
        return (0, utils_1.generateToken)(user.id);
    },
};
