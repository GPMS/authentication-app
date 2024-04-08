"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils");
const controller_1 = require("../features/auth/controller");
const errors_1 = require("../errors");
async function verifyToken(req, res, next) {
    // Try to get token from header, if succeeded then set cookie
    let token;
    token = req.headers["authorization"]?.split(" ")[1];
    if (token) {
        res.cookie(controller_1.COOKIE_NAME, token, { httpOnly: true });
    }
    else {
        // Failed so try to get token from cookie
        token = req.cookies[controller_1.COOKIE_NAME];
        // If failed yet again throw error
        if (!token)
            throw new errors_1.BadRequest("No token provided");
    }
    // Validate token
    try {
        const id = await (0, utils_1.verifyJwt)(token);
        console.info(`verifyToken: Current user id is ${id}`);
        req.userId = id;
        next();
    }
    catch (err) {
        if (err) {
            if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
                console.warn("Token validation error: Token expired");
            }
            else {
                console.warn("Token validation error:", err);
            }
            throw new errors_1.Forbidden("Invalid token");
        }
    }
}
exports.verifyToken = verifyToken;
