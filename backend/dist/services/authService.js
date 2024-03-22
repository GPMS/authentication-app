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
exports.authService = void 0;
const utils_1 = require("../utils");
const user_1 = require("../database/models/user");
exports.authService = {
    register: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        if (yield user_1.User.findOne({ email }).exec()) {
            return null;
        }
        const hashedPassword = yield (0, utils_1.hashPassword)(password);
        const createdUser = yield user_1.User.create({
            email,
            password: hashedPassword,
            provider: "local",
        });
        return (0, utils_1.generateToken)(createdUser.id);
    }),
    login: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.User.findOne({ email }).select("+password").exec();
        if (!user || !(yield (0, utils_1.verifyPassword)(password, user.password))) {
            return null;
        }
        return (0, utils_1.generateToken)(user.id);
    }),
    loginWithService: (code, oauthService) => __awaiter(void 0, void 0, void 0, function* () {
        const accessToken = yield oauthService.getAccessToken(code);
        const { name, email, avatar_url: photo, bio, } = yield oauthService.getUserInfo(accessToken);
        // Create new user if it doesn't already exist
        let user = yield user_1.User.findOne({ email }).exec();
        if (!user) {
            user = yield user_1.User.create({ email, provider: "github", name, photo, bio });
            console.info(`GitHub Oauth: Created new user`);
        }
        return (0, utils_1.generateToken)(user.id);
    }),
};
