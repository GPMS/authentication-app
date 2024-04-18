"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = void 0;
const customError_1 = require("./customError");
class BadRequest extends customError_1.CustomError {
    constructor(message) {
        super(message, 400);
    }
}
exports.BadRequest = BadRequest;
