/**
 * MongoDB Connection Utility
 *
 * Establishes and manages a singleton MongoDB client connection.
 * Handles connection differently in development vs production environments.
 */
import { MongoClient } from "mongodb";

// Validate that MongoDB URI is configured
if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

const uri = process.env.MONGODB_URI as string;
const options = {};

// Create a new MongoClient
const client = new MongoClient(uri, options);
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof global & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  // Create and cache the MongoDB client promise if it doesn't exist already
  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  clientPromise = client.connect();
}

// Export the promisified client for use across the application
export default clientPromise;
