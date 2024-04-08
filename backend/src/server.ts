import { connectDB } from "./database/connection";
import { app } from "./app";
import { config } from "./config";

async function start() {
  await connectDB();
  app.listen(config.port, () => {
    console.info(`INFO: Listening on port ${config!.port}...`);
  });
}
start();
