"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = __importDefault(require("zod"));
const config_1 = require("../config");
const jwtPayloadSchema = zod_1.default.object({
    id: zod_1.default.string(),
});
function generateToken(id) {
    return jsonwebtoken_1.default.sign({ id }, config_1.config.jwtAccessTokenSecret);
}
exports.generateToken = generateToken;
function verifyJwt(token) {
    return new Promise((resolve, reject) => {
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
