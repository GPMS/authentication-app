"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
const errors_1 = require("../errors");
function handleErrors(err, req, res, next) {
    if (err instanceof errors_1.CustomError) {
        return res.status(err.statusCode).json(err.body);
    }
    console.log(err);
    return res.status(500).send("Something went wrong try again later");
}
exports.handleErrors = handleErrors;
