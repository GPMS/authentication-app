"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoTokenError = void 0;
const customError_1 = require("./customError");
class NoTokenError extends customError_1.CustomError {
    constructor() {
        super("No token provided", 403);
    }
}
exports.NoTokenError = NoTokenError;
