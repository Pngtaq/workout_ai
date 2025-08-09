import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI");
}

let isConnected = false;

export async function connectDb() {
  if (isConnected) return;
  try {
    await mongoose.connect(MONGODB_URI, { dbName: "workoutDb" });
    isConnected = true;
  } catch (err) {
    console.error("DB connection error", err);
  }
}
