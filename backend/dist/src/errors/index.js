"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Forbidden = exports.Conflict = exports.BadRequest = exports.CustomError = void 0;
var customError_1 = require("./customError");
Object.defineProperty(exports, "CustomError", { enumerable: true, get: function () { return customError_1.CustomError; } });
Object.defineProperty(exports, "BadRequest", { enumerable: true, get: function () { return customError_1.BadRequest; } });
Object.defineProperty(exports, "Conflict", { enumerable: true, get: function () { return customError_1.Conflict; } });
Object.defineProperty(exports, "Forbidden", { enumerable: true, get: function () { return customError_1.Forbidden; } });
