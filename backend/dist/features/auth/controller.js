"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.COOKIE_NAME = void 0;
const errors_1 = require("../../errors");
const config_1 = require("../../config");
const service_1 = require("./service");
const githubProvider_1 = require("./githubProvider");
const validateAuthDTO_1 = require("./validateAuthDTO");
exports.COOKIE_NAME = "token";
const githubProvider = new githubProvider_1.GithubProvider();
exports.authController = {
    register: async (req, res) => {
        const { email, password } = (0, validateAuthDTO_1.validateAuthDTO)(req.body);
        const token = await service_1.authService.register(email, password);
        if (!token) {
            throw new errors_1.Conflict(`User with email ${email} already exists`);
        }
        res.cookie(exports.COOKIE_NAME, token, { httpOnly: true });
        res.status(201).send({
            accessToken: token,
        });
    },
    login: async (req, res) => {
        console.info("Login");
        const { email, password } = (0, validateAuthDTO_1.validateAuthDTO)(req.body);
        const token = await service_1.authService.login(email, password);
        if (!token) {
            throw new errors_1.Forbidden("Invalid email or password");
        }
        res.cookie(exports.COOKIE_NAME, token, { httpOnly: true });
        res.send({
            accessToken: token,
        });
    },
    logout: (_, res) => {
        res.clearCookie(exports.COOKIE_NAME);
        res.send();
    },
    getGithubUrl: (_, res) => {
        const redirectUrl = githubProvider.generateUrl();
        res.send({ url: redirectUrl });
    },
    githubCallback: async (req, res) => {
        const code = req.query.code;
        if (!code) {
            throw new errors_1.BadRequest("Error during GitHub authentication");
        }
        const token = await service_1.authService.loginWithService(code, githubProvider);
        res.redirect(`${config_1.config.frontendUrl}/user?token=${token}`);
    },
};
