"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAlreadyRegisteredError = void 0;
const customError_1 = require("./customError");
class EmailAlreadyRegisteredError extends customError_1.CustomError {
    constructor(email) {
        super(`User with email ${email} already exists`, 409);
    }
}
exports.EmailAlreadyRegisteredError = EmailAlreadyRegisteredError;
