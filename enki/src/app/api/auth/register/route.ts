import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const uri = process.env.MONGODB_URI as string;

export async function POST(request: NextRequest) {
  const { email, password, studentID } = await request.json();
  if (!email || !password || !studentID) {
    return NextResponse.json({ error: "Email, password, and student ID are required." }, { status: 400 });
  }
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("Users");
  const existing = await db.collection("accounts").findOne({
    $or: [{ email }, { studentID }]
    });
  if (existing) {
    await client.close();
    return NextResponse.json({ error: "User with this email or studentID already exists" }, { status: 409 });
  }
  const hashed = await bcrypt.hash(password, 10);
  await db.collection("accounts").insertOne({ email, password: hashed, studentID, role: "student" });
  await client.close();
  return NextResponse.json({ success: true });
}