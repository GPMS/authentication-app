"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuthDTO = exports.authDTO = void 0;
const zod_1 = __importDefault(require("zod"));
const errors_1 = require("../../errors");
exports.authDTO = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default
        .string()
        .min(8, { message: "Password must contain at least 8 characters" }),
});
function validateAuthDTO(body) {
    const authBody = exports.authDTO.safeParse(body);
    if (!authBody.success) {
        throw new errors_1.ValidationError(authBody.error.errors);
    }
    return authBody.data;
}
exports.validateAuthDTO = validateAuthDTO;
