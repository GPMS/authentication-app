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
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const util_1 = require("../util");
const auth_controllers_1 = require("../controllers/auth.controllers");
const errors_1 = require("../errors");
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get JWT access token from request
        const token = req.cookies[auth_controllers_1.COOKIE_NAME];
        if (!token)
            throw new errors_1.BadRequest("No token provided");
        // Validate token
        try {
            const { id } = yield (0, util_1.verifyJwt)(token);
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
    });
}
exports.verifyToken = verifyToken;
