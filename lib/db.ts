import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI");
}

let isConnected = false;

export async function connectDb() {
  if (isConnected) return;
  
  try {
    await mongoose.connect(MONGODB_URI, { 
      dbName: "workoutDb",
      // Add connection pooling for better performance
      maxPoolSize: 10,
      minPoolSize: 2,
      // Reduce connection timeout
      serverSelectionTimeoutMS: 5000,
      // Enable connection pooling
      bufferCommands: false,
    });
    isConnected = true;
    console.log("Database connected successfully");
  } catch (err) {
    console.error("DB connection error", err);
    isConnected = false;
    throw err;
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  if (isConnected) {
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  }
});

