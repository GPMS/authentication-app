"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTokenError = exports.NoTokenError = exports.OauthError = exports.InvalidEmailOrPasswordError = exports.EmailAlreadyRegisteredError = exports.NoUserWithIdError = exports.ValidationError = exports.CustomError = void 0;
var customError_1 = require("./customError");
Object.defineProperty(exports, "CustomError", { enumerable: true, get: function () { return customError_1.CustomError; } });
var validationError_1 = require("./validationError");
Object.defineProperty(exports, "ValidationError", { enumerable: true, get: function () { return validationError_1.ValidationError; } });
var noUserWithIdError_1 = require("./noUserWithIdError");
Object.defineProperty(exports, "NoUserWithIdError", { enumerable: true, get: function () { return noUserWithIdError_1.NoUserWithIdError; } });
var emailAlreadyRegisteredError_1 = require("./emailAlreadyRegisteredError");
Object.defineProperty(exports, "EmailAlreadyRegisteredError", { enumerable: true, get: function () { return emailAlreadyRegisteredError_1.EmailAlreadyRegisteredError; } });
var invalidEmailOrPasswordError_1 = require("./invalidEmailOrPasswordError");
Object.defineProperty(exports, "InvalidEmailOrPasswordError", { enumerable: true, get: function () { return invalidEmailOrPasswordError_1.InvalidEmailOrPasswordError; } });
var oauthError_1 = require("./oauthError");
Object.defineProperty(exports, "OauthError", { enumerable: true, get: function () { return oauthError_1.OauthError; } });
var noTokenError_1 = require("./noTokenError");
Object.defineProperty(exports, "NoTokenError", { enumerable: true, get: function () { return noTokenError_1.NoTokenError; } });
var invalidTokenError_1 = require("./invalidTokenError");
Object.defineProperty(exports, "InvalidTokenError", { enumerable: true, get: function () { return invalidTokenError_1.InvalidTokenError; } });
