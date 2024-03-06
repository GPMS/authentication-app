"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
const errors_1 = require("../errors");
/**
 *
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function handleErrors(err, req, res, next) {
    if (err instanceof errors_1.CustomError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    console.log(err);
    return res.status(500).send("Something went wrong try again later");
}
exports.handleErrors = handleErrors;
