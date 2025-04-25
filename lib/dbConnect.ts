// lib/mongodb.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Set mongoose strictQuery to false to avoid warnings from Mongoose v7
mongoose.set("strictQuery", false);

/**
 * Cached connection for MongoDB.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI!, {
        serverSelectionTimeoutMS: 30000,
        connectTimeoutMS: 30000,
        dbName: "user",
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error);
        throw new Error("Failed to connect to MongoDB");
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
