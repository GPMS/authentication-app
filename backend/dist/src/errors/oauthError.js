"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OauthError = void 0;
const customError_1 = require("./customError");
class OauthError extends customError_1.CustomError {
    constructor(service) {
        super(`Error during ${service} authentication`, 500);
    }
}
exports.OauthError = OauthError;
