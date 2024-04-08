"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
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
exports.UserModel = mongoose_1.default.model("User", userSchema);
