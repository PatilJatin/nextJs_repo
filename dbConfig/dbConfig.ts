import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

const MONGO_URL = process.env.MONGO_URI;
// console.log("Mongo_URL is :---------", MONGO_URL);
let isConnectDB = true;
// // console.log(MONGO_URL);
// // console.log("This is the MONGO_URL", MONGO_URL);
async function connectDb() {
  try {
    if (isConnectDB) {
      isConnectDB = false;
      await mongoose.connect(MONGO_URL!);
      // // console.log("MongoDB connected successfully");
      // console.log("MongoDB connected successfully");
    }
  } catch (error) {
    console.error(
      "MongoDB connection error. Please make sure MongoDB is running.",
      error
    );

    process.exit(1);
  }
}

export { connectDb };
