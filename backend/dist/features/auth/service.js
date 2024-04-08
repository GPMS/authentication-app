"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const utils_1 = require("../../utils");
const user_1 = require("../models/user");
class AuthService {
    constructor() { }
    async register(email, password) {
        if (await user_1.UserModel.findOne({ email }).exec()) {
            return null;
        }
        const hashedPassword = await (0, utils_1.hashPassword)(password);
        const createdUser = await user_1.UserModel.create({
            email,
            password: hashedPassword,
            provider: "local",
        });
        return (0, utils_1.generateToken)(createdUser.id);
    }
    async login(email, password) {
        const user = await user_1.UserModel.findOne({ email }).select("+password").exec();
        if (!user || typeof user.password === "undefined") {
            return null;
        }
        if (!(await (0, utils_1.verifyPassword)(password, user.password))) {
            return null;
        }
        return (0, utils_1.generateToken)(user.id);
    }
    async loginWithService(code, oauthProvider) {
        const accessToken = await oauthProvider.getAccessToken(code);
        const { name, email, avatar_url: photo, bio, } = await oauthProvider.getUserInfo(accessToken);
        // Create new user if it doesn't already exist
        let user = await user_1.UserModel.findOne({ email }).exec();
        if (!user) {
            user = await user_1.UserModel.create({
                email,
                provider: "github",
                name,
                photo,
                bio,
            });
            console.info(`GitHub Oauth: Created new user`);
        }
        return (0, utils_1.generateToken)(user.id);
    }
}
exports.AuthService = AuthService;
