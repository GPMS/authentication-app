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
exports.hashPassword = exports.verifyPassword = exports.verifyJwt = exports.generateToken = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = __importDefault(require("zod"));
const config_1 = require("./config");
const jwtPayloadSchema = zod_1.default.object({
    id: zod_1.default.string(),
});
function generateToken(id) {
    if (!(config_1.config === null || config_1.config === void 0 ? void 0 : config_1.config.jwtAccessTokenSecret)) {
        throw Error("Set ACCESS TOKEN SECRET environmental variable");
    }
    return jsonwebtoken_1.default.sign({ id }, config_1.config.jwtAccessTokenSecret);
}
exports.generateToken = generateToken;
function verifyJwt(token) {
    return new Promise((resolve, reject) => {
        if (!(config_1.config === null || config_1.config === void 0 ? void 0 : config_1.config.jwtAccessTokenSecret)) {
            throw Error("Set ACCESS TOKEN SECRET environmental variable");
        }
        jsonwebtoken_1.default.verify(token, config_1.config.jwtAccessTokenSecret, (err, payload) => {
            if (err) {
                reject(err);
                return;
            }
            const parsedPayload = jwtPayloadSchema.safeParse(payload);
            if (!parsedPayload.success) {
                const issues = parsedPayload.error.issues.join("; ");
                reject(new Error(`Token payload parse error: ${issues}`));
                return;
            }
            resolve(parsedPayload.data.id);
        });
    });
}
exports.verifyJwt = verifyJwt;
function verifyPassword(password, actualPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, actualPassword);
    });
}
exports.verifyPassword = verifyPassword;
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.hash(password, 10);
    });
}
exports.hashPassword = hashPassword;
