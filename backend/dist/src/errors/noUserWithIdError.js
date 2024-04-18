"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoUserWithIdError = void 0;
const customError_1 = require("./customError");
class NoUserWithIdError extends customError_1.CustomError {
    constructor(id) {
        super(`no user with id ${id}`, 400);
    }
}
exports.NoUserWithIdError = NoUserWithIdError;
