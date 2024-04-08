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
exports.authController = exports.COOKIE_NAME = void 0;
const zod_1 = __importDefault(require("zod"));
const errors_1 = require("../errors");
const config_1 = require("../config");
const authService_1 = require("../services/authService");
const githubService_1 = require("../services/oauth/githubService");
exports.COOKIE_NAME = "token";
const authSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default
        .string()
        .min(8, { message: "Password must contain at least 8 characters" }),
});
function parseAuthBody(body) {
    const authBody = authSchema.safeParse(body);
    if (!authBody.success) {
        const issues = authBody.error.issues.map((issue) => issue.message);
        throw new errors_1.BadRequest(issues.join("; "));
    }
    return authBody.data;
}
const githubService = new githubService_1.GithubService();
exports.authController = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.info("Register");
        const { email, password } = parseAuthBody(req.body);
        const token = yield authService_1.authService.register(email, password);
        if (!token) {
            throw new errors_1.Conflict(`User with email ${email} already exists`);
        }
        res.cookie(exports.COOKIE_NAME, token, { httpOnly: true });
        res.status(201).send({
            accessToken: token,
        });
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.info("Login");
        const { email, password } = parseAuthBody(req.body);
        const token = yield authService_1.authService.login(email, password);
        if (!token) {
            throw new errors_1.Forbidden("Invalid email or password");
        }
        res.cookie(exports.COOKIE_NAME, token, { httpOnly: true });
        res.send({
            accessToken: token,
        });
    }),
    logout: (_, res) => {
        res.clearCookie(exports.COOKIE_NAME);
        res.send();
    },
    getGithubUrl: (_, res) => {
        const redirectUrl = githubService.generateUrl();
        res.send({ url: redirectUrl });
    },
    githubCallback: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const code = req.query.code;
        if (!code) {
            throw new errors_1.BadRequest("Error during GitHub authentication");
        }
        const token = yield authService_1.authService.loginWithService(code, githubService);
        res.redirect(`${config_1.config.frontendUrl}/user?token=${token}`);
    }),
};
