import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const moduleId = searchParams.get("moduleId");

    if (!moduleId) {
      return NextResponse.json(
        { error: "Module ID is required" },
        { status: 400 }
      );
    }

    // Get a connected MongoDB client
    const mongoClient = await clientPromise;

    // Debug the client type
    console.log("MongoDB client type:", typeof mongoClient);
    console.log(
      "MongoDB client is MongoClient:",
      mongoClient instanceof MongoClient
    );

    if (!(mongoClient instanceof MongoClient)) {
      throw new Error("Invalid MongoDB client received");
    }

    const db = mongoClient.db("Modules"); // Database name is "Modules"

    // The collection name is the moduleId (5CM504)
    const topics = await db
      .collection(moduleId)
      .find({})
      .project({ _id: 1, topic: 1, startMessage: 1 })
      .toArray();

    if (!topics || topics.length === 0) {
      return NextResponse.json(
        { error: "No topics found for this module" },
        { status: 404 }
      );
    }

    return NextResponse.json({ topics });
  } catch (error) {
    console.error("Database error:", error);
    // Include more details about the error in development
    const errorMessage =
      process.env.NODE_ENV === "development"
        ? `Failed to fetch topics: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        : "Failed to fetch topics";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
