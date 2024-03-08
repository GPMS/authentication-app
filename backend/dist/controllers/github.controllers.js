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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.githubOauth = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const user_1 = require("../models/user");
const util_1 = require("../util");
function githubOauth(code) {
    return __awaiter(this, void 0, void 0, function* () {
        // Exchange the code for an access token
        const { data } = yield axios_1.default.post("https://github.com/login/oauth/access_token", {
            client_id: config_1.config === null || config_1.config === void 0 ? void 0 : config_1.config.github.clientId,
            client_secret: config_1.config === null || config_1.config === void 0 ? void 0 : config_1.config.github.clientSecret,
            code: code,
        }, {
            headers: {
                Accept: "application/json",
            },
        });
        const accessToken = data.access_token;
        // Get user email using the access token
        const userResponse = yield axios_1.default.get("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const githubEmail = userResponse.data.email;
        // Create new user if it doesn't already exist
        let user = yield user_1.User.findOne({ email: githubEmail }).exec();
        if (!user) {
            user = yield user_1.User.create({ email: githubEmail, provider: "github" });
        }
        return (0, util_1.generateToken)(user.id);
    });
}
exports.githubOauth = githubOauth;
