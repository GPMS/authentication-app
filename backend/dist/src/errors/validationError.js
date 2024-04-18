"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const customError_1 = require("./customError");
class ValidationError extends customError_1.CustomError {
    constructor(errors) {
        const formattedErrors = [];
        for (const error of errors) {
            const field = error.path.join(".");
            formattedErrors.push({
                field,
                message: error.message,
            });
        }
        super("Validation Error", 400, { errors: formattedErrors });
    }
}
exports.ValidationError = ValidationError;
