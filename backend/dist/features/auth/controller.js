"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = exports.COOKIE_NAME = void 0;
const errors_1 = require("../../errors");
const config_1 = require("../../config");
const validateAuthDTO_1 = require("./validateAuthDTO");
exports.COOKIE_NAME = "token";
class AuthController {
    authService;
    githubProvider;
    constructor(authService, githubProvider) {
        this.authService = authService;
        this.githubProvider = githubProvider;
    }
    async register(req, res, next) {
        try {
            console.info("Register");
            const { email, password } = (0, validateAuthDTO_1.validateAuthDTO)(req.body);
            const token = await this.authService.register(email, password);
            if (!token) {
                throw new errors_1.Conflict(`User with email ${email} already exists`);
            }
            res.cookie(exports.COOKIE_NAME, token, { httpOnly: true });
            res.status(201).send({
                accessToken: token,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            console.info("Login");
            const { email, password } = (0, validateAuthDTO_1.validateAuthDTO)(req.body);
            const token = await this.authService.login(email, password);
            if (!token) {
                throw new errors_1.Forbidden("Invalid email or password");
            }
            res.cookie(exports.COOKIE_NAME, token, { httpOnly: true });
            res.send({
                accessToken: token,
            });
        }
        catch (e) {
            next(e);
        }
    }
    logout(_, res, next) {
        try {
            res.clearCookie(exports.COOKIE_NAME);
            res.send();
        }
        catch (e) {
            next(e);
        }
    }
    getGithubUrl(_, res, next) {
        try {
            const redirectUrl = this.githubProvider.generateUrl();
            res.send({ url: redirectUrl });
        }
        catch (e) {
            next(e);
        }
    }
    async githubCallback(req, res, next) {
        try {
            const code = req.query.code;
            if (!code) {
                throw new errors_1.BadRequest("Error during GitHub authentication");
            }
            const token = await this.authService.loginWithService(code, this.githubProvider);
            res.redirect(`${config_1.config.frontendUrl}/user?token=${token}`);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.AuthController = AuthController;
