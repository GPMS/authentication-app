import { config } from "../config";
import mongoose from "mongoose";

export async function connectDB() {
  try {
    console.info("INFO: DB: Trying to connect to", config.databaseURL);
    await mongoose.connect(config.databaseURL);
    console.info("INFO: DB: Successfully connected.");
  } catch (e) {
    console.error("ERROR: DB: Unable to connect!\n", e);
    process.exit(1);
  }
}

export async function disconnectDB() {
  await mongoose.connection.close();
  console.info("INFO: DB: Connection closed.");
}
