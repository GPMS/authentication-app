"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authFactory = exports.authRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const verifyToken_1 = require("../../middlewares/verifyToken");
const githubProvider_1 = require("./githubProvider");
const service_1 = require("./service");
const userRepositoryMongoose_1 = require("../repositories/userRepositoryMongoose");
exports.authRouter = (0, express_1.Router)();
function authFactory() {
    return new controller_1.AuthController(new service_1.AuthService(new userRepositoryMongoose_1.UserRepositoryMongoose()), new githubProvider_1.GithubProvider());
}
exports.authFactory = authFactory;
exports.authRouter.post("/register", (req, res, next) => {
    authFactory().register(req, res, next);
});
exports.authRouter.post("/login", (req, res, next) => {
    authFactory().login(req, res, next);
});
exports.authRouter.post("/logout", verifyToken_1.verifyToken, (req, res, next) => {
    authFactory().logout(req, res, next);
});
exports.authRouter.get("/github", (req, res, next) => {
    authFactory().getGithubUrl(req, res, next);
});
exports.authRouter.get("/github/callback", (req, res, next) => {
    authFactory().githubCallback(req, res, next);
});
