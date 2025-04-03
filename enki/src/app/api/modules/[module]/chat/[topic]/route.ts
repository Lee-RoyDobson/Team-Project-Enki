import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { module: string; topic: string } }
) {
  try {
    // Destructure the params properly
    const moduleName = params.module;
    const topicName = params.topic;

    // Build path to the JSON file using the module name
    const filePath = path.join(
      process.cwd(),
      "data",
      "modules",
      moduleName,
      "chat",
      `${topicName}.json`
    );

    // Create directories if they don't exist
    const dirPath = path.join(
      process.cwd(),
      "data",
      "modules",
      moduleName,
      "chat"
    );

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Created directory structure: ${dirPath}`);
    }

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}, returning default response`);
      return NextResponse.json({
        messages: [
          {
            sender: "Enki",
            content: `Welcome to this topic! How can I help you?`,
          },
        ],
      });
    }

    // Read the file
    const data = fs.readFileSync(filePath, "utf8");
    return new NextResponse(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error loading chat data:", error);
    return NextResponse.json(
      { error: "Failed to load chat data" },
      { status: 500 }
    );
  }
}
