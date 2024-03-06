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
exports.disconnectDB = exports.connectDB = void 0;
const config_1 = require("./config");
const mongoose_1 = __importDefault(require("mongoose"));
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.info("INFO: DB: Trying to connect to", config_1.config.databaseURL);
            yield mongoose_1.default.connect(config_1.config.databaseURL);
            console.info("INFO: DB: Successfully connected.");
        }
        catch (e) {
            console.error("ERROR: DB: Unable to connect!\n", e);
            process.exit(1);
        }
    });
}
exports.connectDB = connectDB;
function disconnectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
        console.info("INFO: DB: Connection closed.");
    });
}
exports.disconnectDB = disconnectDB;
