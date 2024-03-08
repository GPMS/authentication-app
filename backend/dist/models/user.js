"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = __importDefault(require("zod"));
exports.UserSchema = zod_1.default.object({
    email: zod_1.default.string().email().min(1, { message: "Email cannot be blank" }),
    photo: zod_1.default.string().url().or(zod_1.default.literal("")),
    name: zod_1.default.string(),
    bio: zod_1.default.string(),
    phone: zod_1.default.string(),
    provider: zod_1.default.union([zod_1.default.literal("local"), zod_1.default.literal("github")]),
    password: zod_1.default
        .string()
        .min(8, { message: "Password must have at least 8 characters" }),
});
function isProviderLocal() {
    return this.provider === "local";
}
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    photo: String,
    name: String,
    bio: String,
    phone: String,
    provider: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: isProviderLocal,
        select: false,
        minlength: 8,
    },
});
exports.User = mongoose_1.default.model("User", userSchema);
