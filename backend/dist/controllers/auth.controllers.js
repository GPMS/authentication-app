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
exports.login = exports.register = exports.COOKIE_NAME = void 0;
const util_1 = require("../util");
const user_1 = require("../database/models/user");
exports.COOKIE_NAME = "token";
function register(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield user_1.User.findOne({ email }).exec()) {
            return null;
        }
        const hashedPassword = yield (0, util_1.hashPassword)(password);
        const createdUser = yield user_1.User.create({
            email,
            password: hashedPassword,
            provider: "local",
        });
        return (0, util_1.generateToken)(createdUser.id);
    });
}
exports.register = register;
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.User.findOne({ email }).select("+password").exec();
        if (!user || !(yield (0, util_1.verifyPassword)(password, user.password))) {
            return null;
        }
        return (0, util_1.generateToken)(user.id);
    });
}
exports.login = login;
