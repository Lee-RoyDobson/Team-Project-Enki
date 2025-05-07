import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return NextResponse.json({ error: "No MongoDB URI configured" });
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("Students");
    const collection = database.collection("5CM504");

    // Look for the specific document
    const doc = await collection.findOne({ student_id: "100597844" });
    const docAsNumber = await collection.findOne({ student_id: 100597844 });

    // Get count of documents
    const count = await collection.countDocuments();

    // Get all student_id values
    const allStudentIds = await collection.distinct("student_id");

    return NextResponse.json({
      document_count: count,
      doc_exists_as_string: !!doc,
      doc_exists_as_number: !!docAsNumber,
      all_student_ids: allStudentIds,
      doc_sample: doc || docAsNumber || null,
    });
  } catch (error) {
    return NextResponse.json({
      error: String(error),
    });
  } finally {
    await client.close();
  }
}
