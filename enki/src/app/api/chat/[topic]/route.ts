import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { topic: string } }
) {
  try {
    const topicName = params.topic;
    const filePath = path.join(
      process.cwd(),
      "data",
      "chat",
      `${topicName}.json`
    );

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return new NextResponse(
        JSON.stringify({
          messages: [
            {
              sender: "Enki",
              content: `Welcome to this topic! How can I help you?`,
            },
          ],
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Read the file
    const data = fs.readFileSync(filePath, "utf8");
    return new NextResponse(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error loading chat data:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to load chat data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
