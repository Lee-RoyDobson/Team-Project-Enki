import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET(request: NextRequest) {
  console.log("API endpoint called");

  const searchParams = request.nextUrl.searchParams;
  const studentId = searchParams.get("studentId");
  const topic = searchParams.get("topic");

  console.log("Query parameters:", { studentId, topic });

  if (!studentId || !topic) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  // Format the topic name to match how it's stored in the database
  // This should be exactly as it appears in MongoDB
  const formattedTopic = topic;

  // Connect to MongoDB
  const uri = process.env.MONGODB_URI;
  console.log("MongoDB URI exists:", !!uri);

  if (!uri) {
    return NextResponse.json(
      { error: "Database connection string is not configured" },
      { status: 500 }
    );
  }

  const client = new MongoClient(uri);

  try {
    console.log("Attempting to connect to MongoDB...");
    await client.connect();
    console.log("Connected successfully to MongoDB");

    const database = client.db("Students");
    const collection = database.collection("5CM504");

    // Debug to show all documents
    console.log("Checking collection content...");
    const allDocs = await collection.find().limit(2).toArray();
    console.log("Documents in collection:", allDocs.length);
    if (allDocs.length > 0) {
      console.log("First document ID field:", Object.keys(allDocs[0]));
    }

    // Query for the student document - matching the structure from your example
    console.log("Querying for student:", studentId);
    let studentDoc = await collection.findOne({ student_id: studentId });

    // If not found with string, try as number
    if (!studentDoc) {
      console.log("Trying as number...");
      studentDoc = await collection.findOne({ student_id: Number(studentId) });
    }

    console.log("Student document found:", !!studentDoc);

    if (studentDoc) {
      console.log("Student topics length:", studentDoc.topics?.length || 0);
    }

    if (!studentDoc) {
      return NextResponse.json(
        {
          messages: [
            {
              sender: "Enki",
              content: `Welcome to ${topic}! How can I help you?`,
            },
          ],
        },
        { status: 200 }
      );
    }

    // Find the topic in the student's topics array
    console.log(
      "Available topics:",
      studentDoc.topics.map((t: any) => Object.keys(t)[0])
    );

    const topicData = studentDoc.topics.find(
      (t: any) => Object.keys(t)[0] === formattedTopic
    );

    console.log("Topic data found:", !!topicData);
    if (topicData) {
      console.log("Topic key:", Object.keys(topicData)[0]);
      console.log("Topic messages:", topicData[formattedTopic]);
    }

    if (topicData) {
      console.log("Returning messages for topic:", formattedTopic);
      return NextResponse.json(
        { messages: topicData[formattedTopic] },
        { status: 200 }
      );
    } else {
      // Topic not found for this student
      console.log("Topic not found, returning default message");
      return NextResponse.json(
        {
          messages: [
            {
              sender: "Enki",
              content: `Welcome to ${topic}! How can I help you?`,
            },
          ],
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      {
        error: "Failed to retrieve messages from database",
        details: String(error),
      },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentId, topic, message } = body;

    console.log("POST endpoint called with:", { studentId, topic, message });

    if (!studentId || !topic || !message) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      return NextResponse.json(
        { error: "Database connection string is not configured" },
        { status: 500 }
      );
    }

    const client = new MongoClient(uri);

    try {
      await client.connect();
      console.log("Connected successfully to MongoDB");

      const database = client.db("Students");
      const collection = database.collection("5CM504");

      // Find the student document
      let studentDoc = await collection.findOne({ student_id: studentId });

      // If not found with string, try as number
      if (!studentDoc) {
        studentDoc = await collection.findOne({
          student_id: Number(studentId),
        });
      }

      if (!studentDoc) {
        // Create a new student document if it doesn't exist
        const newStudentDoc = {
          student_id: isNaN(Number(studentId)) ? studentId : Number(studentId),
          topics: [
            {
              [topic]: [
                {
                  role: "assistant",
                  content: `Welcome to ${topic}! How can I help you?`,
                },
                message,
              ],
            },
          ],
        };

        await collection.insertOne(newStudentDoc);

        return NextResponse.json(
          { success: true, message: "New student and message created" },
          { status: 201 }
        );
      }

      // Find if the topic exists
      const topicIndex = studentDoc.topics?.findIndex(
        (t: any) => Object.keys(t)[0] === topic
      );

      if (topicIndex === -1 || topicIndex === undefined) {
        // Topic doesn't exist, create it
        const updatedTopics = [
          ...(studentDoc.topics || []),
          {
            [topic]: [
              {
                sender: "Enki",
                content: `Welcome to ${topic}! How can I help you?`,
              },
              message,
            ],
          },
        ];

        await collection.updateOne(
          { _id: studentDoc._id },
          { $set: { topics: updatedTopics } }
        );
      } else {
        // Topic exists, append the message
        const updatePath = `topics.${topicIndex}.${topic}`;

        await collection.updateOne(
          { _id: studentDoc._id },
          { $push: { [updatePath]: message } }
        );
      }

      return NextResponse.json(
        { success: true, message: "Message added successfully" },
        { status: 200 }
      );
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { error: "Failed to update messages", details: String(error) },
      { status: 500 }
    );
  }
}
