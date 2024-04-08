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
exports.GithubService = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../../config");
class GithubService {
    generateUrl() {
        return new URL(`https://github.com/login/oauth/authorize?client_id=${config_1.config.github.clientId}`);
    }
    getAccessToken(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield axios_1.default.post("https://github.com/login/oauth/access_token", {
                client_id: config_1.config.github.clientId,
                client_secret: config_1.config.github.clientSecret,
                code: code,
            }, {
                headers: {
                    Accept: "application/json",
                },
            });
            return data.access_token;
        });
    }
    getUserInfo(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const userResponse = yield axios_1.default.get("https://api.github.com/user", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return userResponse.data;
        });
    }
}
exports.GithubService = GithubService;
