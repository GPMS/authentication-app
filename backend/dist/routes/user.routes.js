"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const authJWT_1 = require("../middlewares/authJWT");
const user_controllers_1 = require("../controllers/user.controllers");
const errors_1 = require("../errors");
/**
 * @param {import('express').Express} app
 */
function userRoutes(app) {
    app.get("/user", authJWT_1.verifyToken, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const userInfo = yield (0, user_controllers_1.getUserInfo)(req.userId);
        if (!userInfo) {
            throw new errors_1.BadRequest(`no user with id ${req.userId}`);
        }
        res.send(userInfo);
    }));
    app.put("/user", authJWT_1.verifyToken, (req, res) => __awaiter(this, void 0, void 0, function* () {
        console.log("Update");
        const newToken = yield (0, user_controllers_1.updateUserInfo)(req.userId, req.body);
        if (!newToken) {
            throw new errors_1.BadRequest(`no user with id ${req.userId}`);
        }
        res.send({
            accessToken: newToken,
        });
    }));
}
exports.userRoutes = userRoutes;
