"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
exports.config = null;
function loadConfig() {
    dotenv_1.default.config();
    exports.config = {
        isDev: process.env.NODE_ENV === "development",
        port: process.env.PORT ? parseInt(process.env.PORT) : 5000,
        databaseURL: process.env.NODE_ENV === "development"
            ? "mongodb://127.0.0.1:27017"
            : process.env.DB_URL,
        jwtAccessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    };
    // Check if all environmental variables are defined
    const undefinedVariables = [];
    for (const [key, value] of Object.entries(exports.config)) {
        if (typeof value === "undefined") {
            undefinedVariables.push(key);
        }
    }
    if (undefinedVariables.length) {
        throw new Error(`Environmental variables not defined: ${undefinedVariables.join(",")}`);
    }
}
exports.loadConfig = loadConfig;
