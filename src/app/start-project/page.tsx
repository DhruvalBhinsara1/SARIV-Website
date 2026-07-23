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
    <main className="flex-1 w-full bg-background pt-32 pb-24">
      {/* Hero */}
      <div className="max-w-[720px] mx-auto px-4 md:px-8">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Start a Project"
            heading="Let's build something enduring."
            supportingText="Tell us about your project — scope, budget, and timeline — and our team will follow up within one business day to plan next steps."
            className="mb-16"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          {/* Honeypot field - visually hidden but accessible to bots */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="bot_field">Don&apos;t fill this out if you&apos;re human:</label>
            <input type="text" id="bot_field" {...register("bot_field")} tabIndex={-1} />
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-3">
              <label htmlFor="name" className="text-sm font-medium text-primary">Name</label>
              <Input id="name" placeholder="Ada Lovelace" {...register("name")} />
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
            <label htmlFor="company" className="text-sm font-medium text-primary">Company <span className="text-muted">(optional)</span></label>
            <Input id="company" placeholder="Acme Inc." {...register("company")} />
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-3">
              <label className="text-sm font-medium text-primary">Project Type</label>
              <Controller
                control={control}
                name="projectType"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger aria-label="Project type">
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
              {errors.projectType && <p className="text-sm text-red-500">{errors.projectType.message}</p>}
            </div>

            <div className="flex-1 space-y-3">
              <label className="text-sm font-medium text-primary">Budget Range</label>
              <Controller
                control={control}
                name="budget"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger aria-label="Budget range">
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
              {errors.budget && <p className="text-sm text-red-500">{errors.budget.message}</p>}
            </div>

            <div className="flex-1 space-y-3">
              <label className="text-sm font-medium text-primary">Timeline</label>
              <Controller
                control={control}
                name="timeline"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger aria-label="Timeline">
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
              {errors.timeline && <p className="text-sm text-red-500">{errors.timeline.message}</p>}
            </div>
          </div>

          <div className="space-y-3">
            <label htmlFor="description" className="text-sm font-medium text-primary">Project Description</label>
            <Textarea
              id="description"
              placeholder="What are we building?"
              className="min-h-[160px]"
              {...register("description")}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>

            <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-border">
              <Button type="submit" disabled={isSubmitting} variant="primary" size="large" className="w-full sm:w-auto self-start">
                {isSubmitting ? "Submitting..." : "Submit Inquiry"}
              </Button>
              <Typography variant="caption" muted className="max-w-[480px]">
                Just want to say hello? Visit the <a href="/contact" className="underline underline-offset-4 hover:text-primary">Contact page</a> instead.
              </Typography>
            </div>
          </form>
        </ScrollReveal>

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
