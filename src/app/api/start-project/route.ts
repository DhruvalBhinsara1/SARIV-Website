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

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
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

    const { name, email, company, projectType, budget, timeline, description } = result.data;

    // Send the email
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: process.env.SMTP_EMAIL,
      subject: `New Project Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nProject Type: ${projectType}\nBudget: ${budget}\nTimeline: ${timeline}\n\nDescription:\n${description}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Company:</strong> ${company || 'N/A'}</p>
             <p><strong>Project Type:</strong> ${projectType}</p>
             <p><strong>Budget:</strong> ${budget}</p>
             <p><strong>Timeline:</strong> ${timeline}</p>
             <p><strong>Description:</strong></p>
             <p>${description.replace(/\n/g, '<br>')}</p>`,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error processing start project inquiry", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
