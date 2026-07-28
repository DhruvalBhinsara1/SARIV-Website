import { NextResponse } from "next/server";
import { runIngestion } from "@/lib/ingest/pipeline";

export async function POST() {
  try {
    const summary = await runIngestion();
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Error running ingestion pipeline", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
