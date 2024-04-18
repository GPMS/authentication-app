"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./database/connection");
const app_1 = require("./app");
const config_1 = require("./config");
async function start() {
    await (0, connection_1.connectDB)();
    app_1.app.listen(config_1.config.port, () => {
        console.info(`INFO: Listening on port ${config_1.config.port}...`);
    });
}
start();
