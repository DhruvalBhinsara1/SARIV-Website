"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Toast, ToastTitle, ToastDescription, ToastClose } from "@/components/ui/Toast";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast(true);
      setFormData({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <main className="flex-1 w-full bg-background pt-32 pb-24">
      <div className="max-w-[720px] mx-auto px-4 md:px-8">
        <SectionHeader 
          heading="Start a Project"
          supportingText="We partner with ambitious teams to engineer enduring digital experiences. Tell us about your objectives."
          className="animate-fade-up mb-16"
        />

        <form onSubmit={handleSubmit} className="animate-fade-up flex flex-col gap-8" style={{ animationDelay: "0.1s" }}>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-3">
              <label htmlFor="name" className="text-sm font-medium text-primary">Name</label>
              <Input 
                id="name" 
                placeholder="Ada Lovelace" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="flex-1 space-y-3">
              <label htmlFor="email" className="text-sm font-medium text-primary">Email</label>
              <Input 
                id="email" 
                type="email" 
                placeholder="ada@example.com" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <label htmlFor="message" className="text-sm font-medium text-primary">Project Details</label>
            <Textarea 
              id="message" 
              placeholder="What are we building?" 
              className="min-h-[160px]"
              required 
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <div className="pt-4">
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Submit Inquiry"}
            </Button>
          </div>
        </form>

        <Toast open={showToast} onOpenChange={setShowToast}>
          <div className="grid gap-1">
            <ToastTitle>Inquiry Received</ToastTitle>
            <ToastDescription>We will review your details and respond within 24 hours.</ToastDescription>
          </div>
          <ToastClose />
        </Toast>
      </div>
    </main>
  );
}
