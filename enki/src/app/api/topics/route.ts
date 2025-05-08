/**
 * Topics API Route
 *
 * Retrieves all available topics for a specific module from the MongoDB database.
 * Requires a moduleId query parameter to identify which module's topics to fetch.
 */
import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import clientPromise from "@/lib/mongodb";

/**
 * Handles GET requests to fetch module topics.
 *
 * @param request - The incoming Next.js request object
 * @returns A JSON response containing the topics or an error message
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const moduleId = searchParams.get("moduleId");

    // Validate required query parameters
    if (!moduleId) {
      return NextResponse.json(
        { error: "Module ID is required" },
        { status: 400 }
      );
    }

    // Get a connected MongoDB client
    const mongoClient = await clientPromise;

    // Verify MongoDB client type for debugging purposes
    console.log("MongoDB client type:", typeof mongoClient);
    console.log(
      "MongoDB client is MongoClient:",
      mongoClient instanceof MongoClient
    );

    if (!(mongoClient instanceof MongoClient)) {
      throw new Error("Invalid MongoDB client received");
    }

    const db = mongoClient.db("Modules");

    // Query the collection named after the module ID
    const topics = await db
      .collection(moduleId)
      .find({})
      .project({ _id: 1, topic: 1, startMessage: 1 })
      .toArray();

    // Handle case where no topics are found
    if (!topics || topics.length === 0) {
      return NextResponse.json(
        { error: "No topics found for this module" },
        { status: 404 }
      );
    }

    return NextResponse.json({ topics });
  } catch (error) {
    console.error("Database error:", error);

    // Provide more detailed error information in development environments
    const errorMessage =
      process.env.NODE_ENV === "development"
        ? `Failed to fetch topics: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        : "Failed to fetch topics";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, initialMessage, moduleId = "5CM504" } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Topic title is required" },
        { status: 400 }
      );
    }

    // Get a connected MongoDB client
    const mongoClient = await clientPromise;

    if (!(mongoClient instanceof MongoClient)) {
      throw new Error("Invalid MongoDB client received");
    }

    const db = mongoClient.db("Modules");
    const collection = db.collection(moduleId);

    // Check if topic already exists to avoid duplicates
    const existingTopic = await collection.findOne({ topic: title });
    if (existingTopic) {
      return NextResponse.json(
        { error: "A topic with this title already exists" },
        { status: 409 }
      );
    }

    // Create the new topic document
    const newTopic = {
      topic: title,
      startMessage:
        initialMessage || `Welcome to ${title}! How can I help you?`,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newTopic);

    return NextResponse.json(
      {
        success: true,
        topicId: result.insertedId,
        message: "Topic created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating topic:", error);

    const errorMessage =
      process.env.NODE_ENV === "development"
        ? `Failed to create topic: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        : "Failed to create topic";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
