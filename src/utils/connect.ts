import mongoose from "mongoose";
import config from "config";
// import logger from "./logger";

async function connect() {
  const dbUri: string = process.env.DBURI as string

  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(dbUri, {

    });
    console.log("DB connected");
  } catch (error) {
    console.log("Could not connect to db");
    process.exit(1);
  }
}

export default connect;