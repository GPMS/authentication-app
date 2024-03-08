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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("express-async-errors");
const config_1 = require("./config");
const auth_routes_1 = require("./routes/auth.routes");
const user_routes_1 = require("./routes/user.routes");
const db_1 = require("./db");
const handleErrors_1 = require("./middlewares/handleErrors");
const user_1 = require("./models/user");
let server = null;
let shuttingDown = false;
function cleanup() {
    if (!server)
        return;
    shuttingDown = true;
    server.close(() => __awaiter(this, void 0, void 0, function* () {
        yield (0, db_1.disconnectDB)();
        process.exit();
    }));
    setTimeout(() => {
        console.error("ERROR: Could not close connections in time, forcing shut down");
        process.exit(1);
    }, 30 * 1000);
}
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        console.info("INFO: Starting Express.js application");
        (0, config_1.loadConfig)();
        if (!config_1.config)
            return;
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)({
            origin: config_1.config.frontendUrl,
            credentials: true,
        }));
        app.use(express_1.default.json());
        app.use((0, cookie_parser_1.default)());
        app.use((_, res, next) => {
            if (!shuttingDown)
                return next();
            res.setHeader("Connection", "close");
            res.status(503).send("Server is in the process of shutting down");
        });
        app.get("/", (req, res) => {
            res.send({ message: "Welcome to my app" });
        });
        app.get("/findall", (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("allusers", yield user_1.User.find().exec());
        }));
        app.post("/removeall", (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield user_1.User.deleteMany().exec();
        }));
        (0, auth_routes_1.authRoutes)(app);
        (0, user_routes_1.userRoutes)(app);
        app.use(handleErrors_1.handleErrors);
        yield (0, db_1.connectDB)();
        server = app.listen(config_1.config.port, () => {
            console.info(`INFO: Listening on port ${config_1.config.port}...`);
        });
        process.on("SIGINT", cleanup);
        process.on("SIGTERM", cleanup);
    });
}
start();
