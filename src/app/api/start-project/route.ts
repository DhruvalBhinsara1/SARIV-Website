import { NextResponse } from 'next/server';
import { z } from 'zod';

const startProjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  projectType: z.string().min(1, "Project type is required"),
  budget: z.string().min(1, "Budget range is required"),
  timeline: z.string().min(1, "Timeline is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  bot_field: z.string().max(0, "Invalid submission"), // Honeypot
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = startProjectSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    // Check honeypot (if bot filled it, silent reject)
    if (result.data.bot_field !== "") {
      // Return 200 to trick bots
      return NextResponse.json({ success: true });
    }

    // In a real application, you would integrate Resend or SendGrid here
    // Example: await resend.emails.send({ ... })

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error processing start project inquiry", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
