import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  bot_field: z.string().max(0, "Invalid submission"), // Honeypot
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Server-side Zod validation
    const result = contactSchema.safeParse(body);
    
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
    console.error("Error processing contact form", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
