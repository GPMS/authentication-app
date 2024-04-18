"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTokenError = void 0;
const customError_1 = require("./customError");
class InvalidTokenError extends customError_1.CustomError {
    constructor(error) {
        let errorMessage;
        super("Invalid token", 403, { error: error.message });
    }
}
exports.InvalidTokenError = InvalidTokenError;
