"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const verifyToken_1 = require("../../middlewares/verifyToken");
const service_1 = require("./service");
const githubProvider_1 = require("./githubProvider");
const userRepositoryMongoose_1 = require("../../repositories/userRepositoryMongoose");
exports.authRouter = (0, express_1.Router)();
function factory() {
    return new controller_1.AuthController(new service_1.AuthService(new userRepositoryMongoose_1.UserRepositoryMongoose()), new githubProvider_1.GithubProvider());
}
exports.authRouter.post("/register", (req, res, next) => {
    factory().register(req, res, next);
});
exports.authRouter.post("/login", (req, res, next) => {
    factory().login(req, res, next);
});
exports.authRouter.post("/logout", verifyToken_1.verifyToken, (req, res, next) => {
    factory().logout(req, res, next);
});
exports.authRouter.get("/github", (req, res, next) => {
    factory().getGithubUrl(req, res, next);
});
exports.authRouter.get("/github/callback", (req, res, next) => {
    factory().githubCallback(req, res, next);
});
