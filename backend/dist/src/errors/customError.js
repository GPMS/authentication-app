"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    statusCode;
    body;
    constructor(message, statusCode, desc = {}) {
        super(message);
        this.statusCode = statusCode;
        this.body = {
            message,
            ...desc,
        };
    }
}
exports.CustomError = CustomError;
