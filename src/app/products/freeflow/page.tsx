import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Typography } from "@/components/ui/Typography";
import { buttonVariants } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/Accordion";
import { ArrowRight, Maximize2, MousePointer2, Lock, Zap } from "lucide-react";

export default function FreeFlowProductPage() {
  return (
    <main className="flex-1 w-full bg-background pt-32 pb-24">
      {/* 1. Hero Section */}
      <section className="max-w-[var(--max-reading-width,720px)] mx-auto px-4 md:px-8 flex flex-col items-start gap-8 mb-32">
        <div className="flex flex-col gap-4">
          <Typography variant="caption" transform="uppercase" muted>
            Flagship Product
          </Typography>
          <div className="relative h-16 md:h-20 lg:h-24 w-auto max-w-full -ml-2">
            <Image 
              src="/freeflow-logo.png"
              alt="FreeFlow"
              width={600}
              height={150}
              className="h-full w-auto object-contain object-left"
              priority
            />
          </div>
        </div>
        
        <Typography variant="body" className="animate-fade-up text-xl md:text-2xl text-secondary max-w-2xl" style={{ animationDelay: "0.1s" }}>
          A native macOS application engineered to capture and render buttery-smooth, auto-zooming product demos. Privacy-first, completely non-destructive, and visually stunning.
        </Typography>

        <div className="animate-fade-up flex items-center gap-4 mt-4" style={{ animationDelay: "0.2s" }}>
          <Link href="/contact" className={buttonVariants({ variant: "primary", size: "large" })}>
            Book a Demo
          </Link>
          <a href="#technical-specs" className={buttonVariants({ variant: "secondary", size: "large" })}>
            View Technical Specs
          </a>
        </div>
      </section>

      {/* 2. Visual Showcase */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-32">
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10]">
          <Image 
            src="/freeflow-ui.png" 
            alt="FreeFlow Demo Interface" 
            fill
            className="object-contain object-center"
            priority
          />
        </div>
      </section>

      {/* 3. Problem / Solution (Overview) */}
      <section className="max-w-[720px] mx-auto px-4 md:px-8 mb-32">
        <SectionHeader 
          eyebrow="The Challenge"
          heading="Why build another screen recorder?"
          supportingText="Most screen recorders output static, unengaging video. Adding zoom effects requires hours of tedious keyframing in Premiere or Final Cut. Browser-based tools suffer from latency and require you to upload your sensitive data to the cloud."
          className="mb-12"
        />
        <div className="p-8 md:p-12 border border-border rounded-3xl bg-surface-elevated">
          <Typography variant="subheading" className="mb-6">
            The FreeFlow Solution
          </Typography>
          <Typography variant="body" className="text-xl md:text-2xl leading-relaxed">
            FreeFlow is built natively in Swift for macOS. It records your screen, captures your mouse coordinates, and automatically generates buttery-smooth pan and zoom movements based on your clicks. No keyframing. No cloud processing. Just instant, highly-polished product demos rendered locally on your machine.
          </Typography>
        </div>
      </section>

      {/* 4. Features & Workflow */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-8 mb-32">
        <SectionHeader 
          eyebrow="Core Capabilities"
          heading="Engineered for perfection."
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Maximize2 className="h-6 w-6 mb-4 text-primary" />
              <CardTitle>Algorithmic Zooming</CardTitle>
              <CardDescription>
                We calculate the optimal focal point and bounding box for every click, moving the camera with a custom spring physics animation.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <MousePointer2 className="h-6 w-6 mb-4 text-primary" />
              <CardTitle>Synthetic Cursor</CardTitle>
              <CardDescription>
                FreeFlow hides the native, pixelated macOS cursor and renders a scalable vector cursor in post-production for maximum clarity.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Lock className="h-6 w-6 mb-4 text-primary" />
              <CardTitle>Privacy First Architecture</CardTitle>
              <CardDescription>
                Everything happens locally. We use Apple&apos;s ScreenCaptureKit directly, ensuring your sensitive data never leaves your machine.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Zap className="h-6 w-6 mb-4 text-primary" />
              <CardTitle>Hardware Accelerated</CardTitle>
              <CardDescription>
                Leveraging the Metal API and Apple Silicon Media Engine to encode 4K 60fps ProRes video with near-zero CPU overhead.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* 5. FAQ (Technical Specs) */}
      <section id="technical-specs" className="max-w-[720px] mx-auto px-4 md:px-8 mb-32 flex justify-center">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Technical specifications and common questions about FreeFlow.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What macOS versions are supported?</AccordionTrigger>
                <AccordionContent>
                  FreeFlow requires macOS 13 (Ventura) or later. This is because we rely heavily on the new ScreenCaptureKit framework for high-performance, low-latency capture.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What are the export formats?</AccordionTrigger>
                <AccordionContent>
                  Currently, FreeFlow exports to MP4 (H.264/HEVC), WebM (VP9), and lossless ProRes 422. We also support highly optimized GIF generation for landing pages.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I edit the zoom paths after recording?</AccordionTrigger>
                <AccordionContent>
                  Yes. The recording is non-destructive. You can manually adjust the timing, easing curve, and bounding box of any automatic zoom directly in the timeline before exporting.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Does it capture system audio?</AccordionTrigger>
                <AccordionContent>
                  Yes, FreeFlow captures both microphone input and internal system audio simultaneously, keeping them on separate tracks for easy post-processing.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </section>

      {/* 6. CTA */}
      <section className="max-w-[720px] mx-auto px-4 md:px-8 text-center flex flex-col items-center">
        <Typography variant="heading" className="mb-6">Ready to elevate your demos?</Typography>
        <Typography variant="body" muted className="mb-8 max-w-xl text-center">
          Join the waitlist to get early access to FreeFlow and start recording cinematic product walkthroughs in seconds.
        </Typography>
        <Link href="/contact" className={buttonVariants({ variant: "primary", size: "large" })}>
          Request Access <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
