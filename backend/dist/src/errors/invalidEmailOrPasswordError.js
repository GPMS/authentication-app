"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidEmailOrPasswordError = void 0;
const customError_1 = require("./customError");
class InvalidEmailOrPasswordError extends customError_1.CustomError {
    constructor() {
        super("Invalid email or password", 403);
    }
}
exports.InvalidEmailOrPasswordError = InvalidEmailOrPasswordError;
