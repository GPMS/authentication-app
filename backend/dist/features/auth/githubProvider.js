"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubProvider = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../../config");
class GithubProvider {
    generateUrl() {
        return new URL(`https://github.com/login/oauth/authorize?client_id=${config_1.config.github.clientId}`);
    }
    async getAccessToken(code) {
        const { data } = await axios_1.default.post("https://github.com/login/oauth/access_token", {
            client_id: config_1.config.github.clientId,
            client_secret: config_1.config.github.clientSecret,
            code: code,
        }, {
            headers: {
                Accept: "application/json",
            },
        });
        return data.access_token;
    }
    async getUserInfo(accessToken) {
        const userResponse = await axios_1.default.get("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return userResponse.data;
    }
}
exports.GithubProvider = GithubProvider;
