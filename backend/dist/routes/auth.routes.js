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
exports.authRoutes = void 0;
const zod_1 = __importDefault(require("zod"));
const auth_controllers_1 = require("../controllers/auth.controllers");
const authJWT_1 = require("../middlewares/authJWT");
const errors_1 = require("../errors");
const config_1 = require("../config");
const github_controllers_1 = require("../controllers/github.controllers");
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
function authRoutes(app) {
    app.post("/auth/register", (req, res) => __awaiter(this, void 0, void 0, function* () {
        console.info("Register");
        const { email, password } = parseAuthBody(req.body);
        const token = yield (0, auth_controllers_1.register)(email, password);
        if (!token) {
            throw new errors_1.Conflict(`User with email ${email} already exists`);
        }
        res.cookie(auth_controllers_1.COOKIE_NAME, token, { httpOnly: true });
        res.status(201).send({
            accessToken: token,
        });
    }));
    app.post("/auth/login", (req, res) => __awaiter(this, void 0, void 0, function* () {
        console.info("Login");
        const { email, password } = parseAuthBody(req.body);
        const token = yield (0, auth_controllers_1.login)(email, password);
        if (!token) {
            throw new errors_1.Forbidden("Invalid email or password");
        }
        res.cookie(auth_controllers_1.COOKIE_NAME, token, { httpOnly: true });
        res.send({
            accessToken: token,
        });
    }));
    app.post("/auth/logout", authJWT_1.verifyToken, (_, res) => {
        res.clearCookie(auth_controllers_1.COOKIE_NAME);
        res.send();
    });
    app.get("/auth/github", (_, res) => {
        const redirectUrl = new URL(`https://github.com/login/oauth/authorize?client_id=${config_1.config === null || config_1.config === void 0 ? void 0 : config_1.config.github.clientId}`);
        res.send({ url: redirectUrl });
    });
    app.get("/auth/github/callback", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const code = req.query.code;
        if (!code) {
            throw new errors_1.BadRequest("Error during GitHub authentication");
        }
        const token = yield (0, github_controllers_1.githubOauth)(code);
        res.cookie(auth_controllers_1.COOKIE_NAME, token, {
            httpOnly: true,
            domain: config_1.config === null || config_1.config === void 0 ? void 0 : config_1.config.frontendUrl,
        });
        res.redirect(`${config_1.config === null || config_1.config === void 0 ? void 0 : config_1.config.frontendUrl}/user`);
    }));
}
exports.authRoutes = authRoutes;
