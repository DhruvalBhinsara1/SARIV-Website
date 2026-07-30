"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SmoothInput as Input } from "@/components/ui/SmoothInput";
import { SmoothTextarea as Textarea } from "@/components/ui/SmoothTextarea";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
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
    control,
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
    <main className="flex-1 w-full bg-background min-h-[100dvh] pt-32 pb-24 flex items-center">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Copy & Details */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <ScrollReveal>
              <h1 className="font-display text-6xl md:text-7xl lg:text-[5.5rem] text-primary leading-[0.95] tracking-tight mb-8">
                Get in <br className="hidden md:block" /> Touch.
              </h1>
              <p className="text-xl text-muted font-light max-w-md leading-relaxed">
                Questions, feedback, or just want to say hello? Send us a message and we'll get back to you shortly.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2} className="mt-16 lg:mt-32">
              <div className="space-y-10">
                <div>
                  <h3 className="text-[11px] font-mono tracking-widest uppercase text-muted/60 mb-3">Direct Inquiries</h3>
                  <a href="mailto:officialsariv@gmail.com" className="text-xl md:text-2xl text-primary font-medium hover:opacity-70 transition-opacity">officialsariv@gmail.com</a>
                </div>
                <div>
                  <h3 className="text-[11px] font-mono tracking-widest uppercase text-muted/60 mb-3">Headquarters</h3>
                  <p className="text-lg text-primary font-light">Surat, Gujarat, India<br/>Global Remote</p>
                </div>
                <div>
                  <h3 className="text-[11px] font-mono tracking-widest uppercase text-muted/60 mb-4">Connect</h3>
                  <div className="flex gap-6">
                    <a href="https://x.com/officialsariv" target="_blank" rel="noreferrer" className="text-sm font-medium text-primary hover:opacity-70 transition-opacity">Twitter / X</a>
                    <a href="https://linkedin.com/company/sariv" target="_blank" rel="noreferrer" className="text-sm font-medium text-primary hover:opacity-70 transition-opacity">LinkedIn</a>
                    <a href="https://www.instagram.com/hellosariv/" target="_blank" rel="noreferrer" className="text-sm font-medium text-primary hover:opacity-70 transition-opacity">Instagram</a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.1}>
              <div className="bg-surface/50 border border-border/50 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-black/5">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
                  {/* Honeypot field - visually hidden but accessible to bots */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="bot_field">Don&apos;t fill this out if you&apos;re human:</label>
                    <input type="text" id="bot_field" {...register("bot_field")} tabIndex={-1} />
                  </div>

                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-3">
                      <label htmlFor="name" className="text-sm font-medium text-primary ml-1">Name</label>
                      <Controller
                        control={control}
                        name="name"
                        render={({ field }) => (
                          <Input 
                            id="name" 
                            placeholder="Ada Lovelace" 
                            className="bg-background/50 border-border/60 focus:bg-background transition-colors"
                            {...field}
                          />
                        )}
                      />
                      {errors.name && <p className="text-sm text-red-500 ml-1">{errors.name.message}</p>}
                    </div>
                    <div className="flex-1 space-y-3">
                      <label htmlFor="email" className="text-sm font-medium text-primary ml-1">Email</label>
                      <Controller
                        control={control}
                        name="email"
                        render={({ field }) => (
                          <Input 
                            id="email" 
                            type="text"
                            inputMode="email"
                            placeholder="ada@example.com" 
                            className="bg-background/50 border-border/60 focus:bg-background transition-colors"
                            {...field}
                          />
                        )}
                      />
                      {errors.email && <p className="text-sm text-red-500 ml-1">{errors.email.message}</p>}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label htmlFor="message" className="text-sm font-medium text-primary ml-1">Message</label>
                    <Controller
                      control={control}
                      name="message"
                      render={({ field }) => (
                        <Textarea
                          id="message"
                          placeholder="How can we help?"
                          className="min-h-[180px] bg-background/50 border-border/60 focus:bg-background transition-colors"
                          {...field}
                        />
                      )}
                    />
                    {errors.message && <p className="text-sm text-red-500 ml-1">{errors.message.message}</p>}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-border/50 mt-2">
                    <Typography variant="caption" muted className="max-w-[280px]">
                      Have a project in mind? <br/>Visit the <a href="/start-project" className="underline underline-offset-4 hover:text-primary transition-colors">Start a Project page</a> instead.
                    </Typography>
                    <Button type="submit" variant="primary" size="large" className="w-full sm:w-auto px-10" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              </div>
            </ScrollReveal>
          </div>

        </div>

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
