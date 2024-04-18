"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Forbidden = exports.Conflict = exports.BadRequest = exports.CustomError = void 0;
class CustomError extends Error {
    statusCode;
    body;
    constructor(message, statusCode, desc = {}) {
        super(message);
        this.statusCode = statusCode;
        this.body = {
            message,
            ...desc,
        };
    }
}
exports.CustomError = CustomError;
class BadRequest extends CustomError {
    constructor(message) {
        super(message, 400);
    }
}
exports.BadRequest = BadRequest;
class Conflict extends CustomError {
    constructor(message) {
        super(message, 409);
    }
}
exports.Conflict = Conflict;
class Forbidden extends CustomError {
    constructor(message) {
        super(message, 403);
    }
}
exports.Forbidden = Forbidden;
