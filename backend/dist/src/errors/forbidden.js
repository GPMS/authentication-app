"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Forbidden = void 0;
const customError_1 = require("./customError");
class Forbidden extends customError_1.CustomError {
    constructor(message) {
        super(message, 403);
    }
}
exports.Forbidden = Forbidden;
