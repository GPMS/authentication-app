"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = __importDefault(require("zod"));
const configSchema = zod_1.default.object({
    frontendUrl: zod_1.default.string().url(),
    port: zod_1.default.coerce.number(),
    databaseURL: zod_1.default.string().url(),
    jwtAccessTokenSecret: zod_1.default.string(),
    github: zod_1.default.object({
        clientId: zod_1.default.string(),
        clientSecret: zod_1.default.string(),
    }),
});
dotenv_1.default.config();
exports.config = configSchema.parse({
    frontendUrl: process.env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : "https://authentication-app-frontend-five.vercel.app",
    port: process.env.PORT ?? 5000,
    databaseURL: process.env.NODE_ENV === "development"
        ? "mongodb://127.0.0.1:27017"
        : process.env.DB_URL,
    jwtAccessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
});
