"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDB = exports.connectDB = void 0;
const config_1 = require("../config");
const mongoose_1 = __importDefault(require("mongoose"));
async function connectDB() {
    try {
        console.info("INFO: DB: Trying to connect to", config_1.config.databaseURL);
        await mongoose_1.default.connect(config_1.config.databaseURL);
        console.info("INFO: DB: Successfully connected.");
    }
    catch (e) {
        console.error("ERROR: DB: Unable to connect!\n", e);
        process.exit(1);
    }
}
exports.connectDB = connectDB;
async function disconnectDB() {
    await mongoose_1.default.connection.close();
    console.info("INFO: DB: Connection closed.");
}
exports.disconnectDB = disconnectDB;
