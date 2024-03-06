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
exports.authRoutes = void 0;
const auth_controllers_1 = require("../controllers/auth.controllers");
const authJWT_1 = require("../middlewares/authJWT");
const errors_1 = require("../errors");
/**
 * @param {import('express').Express} app
 */
function authRoutes(app) {
    app.post("/auth/register", (req, res) => __awaiter(this, void 0, void 0, function* () {
        console.info("Register");
        const { email, password } = req.body;
        if (!password || !email) {
            throw new errors_1.BadRequest("No email or password provided");
        }
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
        const { email, password } = req.body;
        if (!password || !email) {
            throw new errors_1.BadRequest("No email or password provided");
        }
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
}
exports.authRoutes = authRoutes;
