"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const utils_1 = require("../utils");
const controller_1 = require("../features/auth/controller");
const errors_1 = require("../errors");
async function verifyToken(req, res, next) {
    // Try to get token from header, if succeeded then set cookie
    let token;
    token = req.headers["authorization"]?.split(" ")[1];
    if (token) {
        res.cookie(controller_1.COOKIE_NAME, token, { httpOnly: true });
    }
    else {
        // Failed so try to get token from cookie
        token = req.cookies[controller_1.COOKIE_NAME];
        // If failed yet again throw error
        if (!token)
            throw new errors_1.NoTokenError();
    }
    // Validate token
    try {
        const id = await (0, utils_1.verifyJwt)(token);
        console.info(`verifyToken: Current user id is ${id}`);
        req.userId = id;
        next();
    }
    catch (err) {
        if (err) {
            throw new errors_1.InvalidTokenError(err);
        }
    }
}
exports.verifyToken = verifyToken;
