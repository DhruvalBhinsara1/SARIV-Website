"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SmoothInput as Input } from "@/components/ui/SmoothInput";
import { SmoothTextarea as Textarea } from "@/components/ui/SmoothTextarea";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Typography } from "@/components/ui/Typography";
import { Toast, ToastTitle, ToastDescription, ToastClose } from "@/components/ui/Toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

const PROJECT_TYPES = ["Web Design", "Mobile App", "Brand Identity", "Product Design", "Other"];
const BUDGET_RANGES = ["Under $10k", "$10k – $25k", "$25k – $50k", "$50k+"];
const TIMELINES = ["ASAP", "1–3 months", "3–6 months", "Flexible"];

const startProjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  projectType: z.string().min(1, "Select a project type"),
  budget: z.string().min(1, "Select a budget range"),
  timeline: z.string().min(1, "Select a timeline"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  bot_field: z.string().max(0), // Honeypot
});

type StartProjectFormData = z.infer<typeof startProjectSchema>;

export default function StartProjectPage() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: "", description: "" });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<StartProjectFormData>({
    resolver: zodResolver(startProjectSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectType: "",
      budget: "",
      timeline: "",
      description: "",
      bot_field: "",
    },
  });

  const onSubmit = async (data: StartProjectFormData) => {
    try {
      const response = await fetch("/api/start-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setToastMessage({
        title: "Inquiry Received",
        description: "We will review your project details and respond within 24 hours.",
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
                Start a <br className="hidden md:block" /> Project.
              </h1>
              <p className="text-xl text-muted font-light max-w-md leading-relaxed">
                Tell us about your project — scope, budget, and timeline — and our team will follow up within one business day to plan next steps.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2} className="mt-16 lg:mt-32">
              <div className="space-y-10">
                <div>
                  <h3 className="text-[11px] font-mono tracking-widest uppercase text-muted/60 mb-3">Direct Inquiries</h3>
                  <a href="mailto:officialsariv@gmail.com" className="text-xl md:text-2xl text-primary font-medium hover:opacity-70 transition-opacity">officialsariv@gmail.com</a>
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
                    <label htmlFor="company" className="text-sm font-medium text-primary ml-1">Company <span className="text-muted">(optional)</span></label>
                    <Controller
                      control={control}
                      name="company"
                      render={({ field }) => (
                        <Input 
                          id="company" 
                          placeholder="Acme Inc." 
                          className="bg-background/50 border-border/60 focus:bg-background transition-colors"
                          {...field} 
                        />
                      )}
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-3">
                      <label className="text-sm font-medium text-primary ml-1">Project Type</label>
                      <Controller
                        control={control}
                        name="projectType"
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger aria-label="Project type" className="bg-background/50 border-border/60 focus:bg-background transition-colors">
                              <SelectValue placeholder="Project type" />
                            </SelectTrigger>
                            <SelectContent>
                              {PROJECT_TYPES.map((type) => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.projectType && <p className="text-sm text-red-500 ml-1">{errors.projectType.message}</p>}
                    </div>

                    <div className="flex-1 space-y-3">
                      <label className="text-sm font-medium text-primary ml-1">Budget Range</label>
                      <Controller
                        control={control}
                        name="budget"
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger aria-label="Budget range" className="bg-background/50 border-border/60 focus:bg-background transition-colors">
                              <SelectValue placeholder="Budget range" />
                            </SelectTrigger>
                            <SelectContent>
                              {BUDGET_RANGES.map((range) => (
                                <SelectItem key={range} value={range}>{range}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.budget && <p className="text-sm text-red-500 ml-1">{errors.budget.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-primary ml-1">Timeline</label>
                    <Controller
                      control={control}
                      name="timeline"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger aria-label="Timeline" className="bg-background/50 border-border/60 focus:bg-background transition-colors">
                            <SelectValue placeholder="Timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            {TIMELINES.map((timeline) => (
                              <SelectItem key={timeline} value={timeline}>{timeline}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.timeline && <p className="text-sm text-red-500 ml-1">{errors.timeline.message}</p>}
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="description" className="text-sm font-medium text-primary ml-1">Project Description</label>
                    <Controller
                      control={control}
                      name="description"
                      render={({ field }) => (
                        <Textarea
                          id="description"
                          placeholder="What are we building?"
                          className="min-h-[160px] bg-background/50 border-border/60 focus:bg-background transition-colors"
                          {...field}
                        />
                      )}
                    />
                    {errors.description && <p className="text-sm text-red-500 ml-1">{errors.description.message}</p>}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-border/50 mt-2">
                    <Typography variant="caption" muted className="max-w-[280px]">
                      Just want to say hello? <br/>Visit the <a href="/contact" className="underline underline-offset-4 hover:text-primary transition-colors">Contact page</a> instead.
                    </Typography>
                    <Button type="submit" variant="primary" size="large" className="w-full sm:w-auto px-10" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Inquiry"}
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
