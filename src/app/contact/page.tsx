"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SmoothInput as Input } from "@/components/ui/SmoothInput";
import { SmoothTextarea as Textarea } from "@/components/ui/SmoothTextarea";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Typography } from "@/components/ui/Typography";
import { Toast, ToastTitle, ToastDescription, ToastClose } from "@/components/ui/Toast";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  bot_field: z.string().max(0), // Honeypot
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: "", description: "" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      bot_field: "",
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setToastMessage({
        title: "Inquiry Received",
        description: "We will review your details and respond within 24 hours.",
      });
      setShowToast(true);
      reset();
    } catch (error) {
      setToastMessage({
        title: "Submission Error",
        description: "There was an issue submitting your inquiry. Please try again.",
      });
      setShowToast(true);
    }
  };

  return (
    <main className="flex-1 w-full bg-background pt-32 pb-24">
      <div className="max-w-[720px] mx-auto px-4 md:px-8">
        <SectionHeader
          heading="Get in Touch"
          supportingText="Questions, feedback, or just want to say hello? Send us a message and we'll get back to you."
          className="animate-fade-up mb-16"
        />

        <form onSubmit={handleSubmit(onSubmit)} className="animate-fade-up flex flex-col gap-8" style={{ animationDelay: "0.1s" }}>
          {/* Honeypot field - visually hidden but accessible to bots */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="bot_field">Don&apos;t fill this out if you&apos;re human:</label>
            <input type="text" id="bot_field" {...register("bot_field")} tabIndex={-1} />
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-3">
              <label htmlFor="name" className="text-sm font-medium text-primary">Name</label>
              <Input 
                id="name" 
                placeholder="Ada Lovelace" 
                {...register("name")}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div className="flex-1 space-y-3">
              <label htmlFor="email" className="text-sm font-medium text-primary">Email</label>
              <Input 
                id="email" 
                type="text"
                inputMode="email"
                placeholder="ada@example.com" 
                {...register("email")}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
          </div>
          
          <div className="space-y-3">
            <label htmlFor="message" className="text-sm font-medium text-primary">Message</label>
            <Textarea
              id="message"
              placeholder="How can we help?"
              className="min-h-[160px]"
              {...register("message")}
            />
            {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
          </div>

          <div className="flex flex-col items-start gap-4 pt-4">
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
            <Typography variant="caption" muted className="max-w-[480px]">
              Have a project in mind? Visit the <a href="/start-project" className="underline underline-offset-4 hover:text-primary">Start a Project page</a> instead.
            </Typography>
          </div>
        </form>

        <Toast open={showToast} onOpenChange={setShowToast}>
          <div className="grid gap-1">
            <ToastTitle>{toastMessage.title}</ToastTitle>
            <ToastDescription>{toastMessage.description}</ToastDescription>
          </div>
          <ToastClose />
        </Toast>
      </div>
    </main>
  );
}
