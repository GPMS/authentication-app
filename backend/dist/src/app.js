"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("express-async-errors");
const config_1 = require("./config");
const routes_1 = require("./features/auth/routes");
const routes_2 = require("./features/user/routes");
const handleErrors_1 = require("./middlewares/handleErrors");
console.info("INFO: Starting Express.js application");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: config_1.config.frontendUrl,
    credentials: true,
}));
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.get("/", (req, res) => {
    res.send({ message: "Welcome to my app" });
});
exports.app.use("/auth", routes_1.authRouter);
exports.app.use("/user", routes_2.userRouter);
exports.app.use(handleErrors_1.handleErrors);
