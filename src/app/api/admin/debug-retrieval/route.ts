import { NextResponse } from "next/server";
import { z } from "zod";
import { retrieveRelevantChunks } from "@/lib/ai/retrieval";

const debugRetrievalSchema = z.object({
  query: z.string().min(1, "Query is required"),
  k: z.number().int().min(1).max(20).optional(),
});

export async function POST(req: Request) {
  const body = await req.json();
  const result = debugRetrievalSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", details: result.error.format() },
      { status: 400 }
    );
  }

  try {
    const chunks = await retrieveRelevantChunks(result.data.query, result.data.k ?? 5);
    return NextResponse.json({ chunks });
  } catch (error) {
    console.error("Error running retrieval", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
