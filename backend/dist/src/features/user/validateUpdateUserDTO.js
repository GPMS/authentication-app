"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateUserDTO = void 0;
const zod_1 = __importDefault(require("zod"));
const errors_1 = require("../../errors");
const updateUserDTO = zod_1.default.object({
    email: zod_1.default.string().email().optional(),
    photo: zod_1.default.string().url().or(zod_1.default.literal("")).optional(),
    name: zod_1.default.string().optional(),
    bio: zod_1.default.string().optional(),
    phone: zod_1.default.string().optional(),
    provider: zod_1.default.union([zod_1.default.literal("local"), zod_1.default.literal("github")]).optional(),
    password: zod_1.default
        .string()
        .min(8, { message: "Password must have at least 8 characters" })
        .optional(),
});
function validateUpdateUserDTO(body) {
    const updateBody = updateUserDTO.safeParse(body);
    if (!updateBody.success) {
        throw new errors_1.ValidationError(updateBody.error.errors);
    }
    return updateBody.data;
}
exports.validateUpdateUserDTO = validateUpdateUserDTO;
