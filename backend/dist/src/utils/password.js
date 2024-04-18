"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = exports.verifyPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
async function verifyPassword(password, actualPassword) {
    return await bcrypt_1.default.compare(password, actualPassword);
}
exports.verifyPassword = verifyPassword;
async function hashPassword(password) {
    return await bcrypt_1.default.hash(password, 10);
}
exports.hashPassword = hashPassword;
