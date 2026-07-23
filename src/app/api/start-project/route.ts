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
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF9F7; padding: 40px 20px; color: #111111;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.04);">
            
            <!-- Header -->
            <div style="text-align: center; padding: 32px 0 24px;">
              <span style="font-size: 24px; font-weight: 800; letter-spacing: 0.1em; color: #111111; vertical-align: middle;">SARIV</span>
              <svg style="width: 24px; height: 24px; vertical-align: middle; margin-left: 8px;" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="#111111" />
              </svg>
            </div>
            
            <!-- Divider -->
            <div style="height: 1px; background-color: #E7E7E4; margin: 0 32px;"></div>
            
            <!-- Body -->
            <div style="padding: 32px;">
              <h2 style="font-size: 20px; font-weight: 600; margin: 0 0 16px;">Hi Team,</h2>
              <p style="font-size: 16px; color: #555555; line-height: 1.5; margin: 0 0 24px;">
                You've received a new project inquiry from <strong>${name}</strong>.
              </p>
              
              <div style="background-color: #FAF9F7; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #E7E7E4; color: #8A8A8A; font-size: 14px; width: 120px;">Email</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #E7E7E4; font-size: 15px; color: #111111;">
                      <a href="mailto:${email}" style="color: #111111; text-decoration: none;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #E7E7E4; color: #8A8A8A; font-size: 14px;">Company</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #E7E7E4; font-size: 15px; color: #111111;">${company || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #E7E7E4; color: #8A8A8A; font-size: 14px;">Type</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #E7E7E4; font-size: 15px; color: #111111;">${projectType}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #E7E7E4; color: #8A8A8A; font-size: 14px;">Budget</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #E7E7E4; font-size: 15px; color: #111111;">${budget}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #E7E7E4; color: #8A8A8A; font-size: 14px;">Timeline</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #E7E7E4; font-size: 15px; color: #111111;">${timeline}</td>
                  </tr>
                </table>
                
                <div style="margin-top: 16px;">
                  <p style="color: #8A8A8A; font-size: 14px; margin: 0 0 8px;">Project Description</p>
                  <p style="font-size: 15px; color: #111111; line-height: 1.6; margin: 0; white-space: pre-wrap;">${description}</p>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 40px;">
                <a href="mailto:${email}" style="display: inline-block; background-color: #111111; color: #FFFFFF; font-size: 16px; font-weight: 600; text-decoration: none; padding: 16px 32px; border-radius: 999px;">
                  Reply to ${name.split(' ')[0]}
                </a>
              </div>
              
            </div>
          </div>
          
          <!-- Footer -->
          <div style="text-align: center; margin-top: 24px;">
            <p style="font-size: 12px; color: #8A8A8A; margin: 0;">This inquiry was sent securely from your SARIV website.</p>
          </div>
        </div>
      `,
    });

    // Auto-responder to the client
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: `We received your project inquiry - SARIV`,
      text: `Hi ${name},\n\nThanks for reaching out to SARIV! We've received your project inquiry and our team is reviewing it. We'll be in touch with you shortly to discuss next steps.\n\nBest,\nThe SARIV Team`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF9F7; padding: 40px 20px; color: #111111;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.04);">
            
            <!-- Header -->
            <div style="text-align: center; padding: 32px 0 24px;">
              <span style="font-size: 24px; font-weight: 800; letter-spacing: 0.1em; color: #111111; vertical-align: middle;">SARIV</span>
              <svg style="width: 24px; height: 24px; vertical-align: middle; margin-left: 8px;" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="#111111" />
              </svg>
            </div>
            
            <!-- Divider -->
            <div style="height: 1px; background-color: #E7E7E4; margin: 0 32px;"></div>
            
            <!-- Body -->
            <div style="padding: 32px;">
              <h2 style="font-size: 20px; font-weight: 600; margin: 0 0 16px;">Hi ${name.split(' ')[0]},</h2>
              <p style="font-size: 16px; color: #555555; line-height: 1.5; margin: 0 0 24px;">
                Thanks for reaching out to SARIV. We're thrilled that you're interested in working with us on your <strong>${projectType}</strong>.
              </p>
              <p style="font-size: 16px; color: #555555; line-height: 1.5; margin: 0 0 24px;">
                Our team is currently reviewing your project details. We typically respond within 1 business day to discuss the next steps and set up an introductory call.
              </p>
              
              <div style="margin-top: 40px;">
                <p style="font-size: 16px; color: #111111; margin: 0 0 4px; font-weight: 600;">Best regards,</p>
                <p style="font-size: 16px; color: #555555; margin: 0;">The SARIV Team</p>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="text-align: center; margin-top: 24px;">
            <p style="font-size: 12px; color: #8A8A8A; margin: 0;">&copy; ${new Date().getFullYear()} SARIV. All rights reserved.</p>
          </div>
        </div>
      `,
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
