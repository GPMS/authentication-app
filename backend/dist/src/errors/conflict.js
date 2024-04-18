"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conflict = void 0;
const customError_1 = require("./customError");
class Conflict extends customError_1.CustomError {
    constructor(message) {
        super(message, 409);
    }
}
exports.Conflict = Conflict;
