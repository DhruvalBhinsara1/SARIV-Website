import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Typography } from "@/components/ui/Typography";
import { buttonVariants } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/Accordion";
import { ArrowRight, Maximize2, MousePointer2, Lock, Zap } from "lucide-react";
import { Pricing } from "@/components/blocks/pricing";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const demoPlans = [
  {
    name: "STARTER",
    price: "50",
    yearlyPrice: "40",
    period: "per month",
    features: [
      "Up to 10 projects",
      "Basic analytics",
      "48-hour support response time",
      "Limited API access",
      "Community support",
    ],
    description: "Perfect for individuals and small projects",
    buttonText: "Start Free Trial",
    href: "/contact",
    isPopular: false,
  },
  {
    name: "PROFESSIONAL",
    price: "99",
    yearlyPrice: "79",
    period: "per month",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "24-hour support response time",
      "Full API access",
      "Priority support",
      "Team collaboration",
      "Custom integrations",
    ],
    description: "Ideal for growing teams and businesses",
    buttonText: "Get Started",
    href: "/contact",
    isPopular: true,
  },
  {
    name: "ENTERPRISE",
    price: "299",
    yearlyPrice: "239",
    period: "per month",
    features: [
      "Everything in Professional",
      "Custom solutions",
      "Dedicated account manager",
      "1-hour support response time",
      "SSO Authentication",
      "Advanced security",
      "Custom contracts",
      "SLA agreement",
    ],
    description: "For large organizations with specific needs",
    buttonText: "Contact Sales",
    href: "/contact",
    isPopular: false,
  },
];

export default function FreeFlowProductPage() {
  return (
    <main className="flex-1 w-full bg-background pt-32 pb-24">
      {/* 1. Split Hero Section */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-8 mb-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Column: Text Content */}
          <div className="flex-1 flex flex-col items-start gap-8 lg:max-w-[500px]">
            <div className="flex flex-col gap-4">
              <ScrollReveal>
                <Typography variant="caption" transform="uppercase" muted>
                  Product
                </Typography>
              </ScrollReveal>
              <ScrollReveal delay={0.1} className="relative h-12 md:h-16 w-auto max-w-full -ml-2">
                <Image 
                  src="/freeflow-logo.png"
                  alt="FreeFlow"
                  width={400}
                  height={100}
                  className="h-full w-auto object-contain object-left"
                  priority
                />
              </ScrollReveal>
            </div>
            
            <ScrollReveal delay={0.2}>
              <Typography variant="body" className="text-xl md:text-2xl text-primary font-medium tracking-tight leading-tight">
                The ultimate screen recorder for product teams. Ditch the keyframing and capture cinematic, auto-zooming demos instantly.
              </Typography>
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="flex flex-wrap items-center gap-4 mt-2">
              <Link href="/contact" className={buttonVariants({ variant: "primary", size: "large" })}>
                Book a Demo
              </Link>
              <a href="#technical-specs" className={buttonVariants({ variant: "secondary", size: "large" })}>
                View Technical Specs
              </a>
            </ScrollReveal>
          </div>

          {/* Right Column: Floating Image */}
          <div className="flex-[1.2] w-full mt-8 lg:mt-0">
            <ScrollReveal delay={0.4}>
              <div className="relative w-full aspect-[4/3] bg-surface-elevated border border-border rounded-2xl overflow-hidden p-2 shadow-elevation transition-transform duration-700">
                <div className="relative w-full h-full rounded-xl overflow-hidden border border-border/50 bg-[#0a0a0a]">
                  <Image 
                    src="/freeflow-ui.png" 
                    alt="FreeFlow Demo Interface" 
                    fill
                    className="object-cover object-left-top"
                    priority
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* 3. Features Bento Grid */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-8 mb-32">
        <ScrollReveal>
          <SectionHeader 
            eyebrow="Core Capabilities"
            heading="Engineered for perfection."
            className="mb-12"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {/* Algorithmic Zooming */}
          <ScrollReveal delay={0.1} className="lg:col-span-2 row-span-1">
            <div className="w-full h-full p-8 md:p-10 rounded-[2rem] bg-surface-elevated border border-border flex flex-col justify-between overflow-hidden relative group hover:border-primary/50 transition-colors">
              <div className="relative z-10 max-w-md">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Maximize2 className="w-6 h-6" />
                </div>
                <Typography variant="heading" className="mb-3 text-2xl">Algorithmic Zooming</Typography>
                <Typography variant="body" className="text-secondary hover:text-primary transition-colors duration-300">
                  We calculate the optimal focal point and bounding box for every click, moving the camera with a custom spring physics animation. No more manual keyframing.
                </Typography>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity translate-x-1/4 translate-y-1/4">
                <Maximize2 className="w-64 h-64" />
              </div>
            </div>
          </ScrollReveal>

          {/* Synthetic Cursor */}
          <ScrollReveal delay={0.2} className="col-span-1 row-span-1">
            <div className="w-full h-full p-8 md:p-10 rounded-[2rem] bg-surface-elevated border border-border flex flex-col justify-between overflow-hidden relative group hover:border-primary/50 transition-colors">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MousePointer2 className="w-6 h-6" />
                </div>
                <Typography variant="heading" className="mb-3 text-xl">Synthetic Cursor</Typography>
                <Typography variant="body" className="text-secondary hover:text-primary transition-colors duration-300 text-sm">
                  FreeFlow hides the native, pixelated macOS cursor and renders a scalable vector cursor in post-production for maximum clarity at any zoom level.
                </Typography>
              </div>
            </div>
          </ScrollReveal>

          {/* Privacy First */}
          <ScrollReveal delay={0.3} className="col-span-1 row-span-1">
            <div className="w-full h-full p-8 md:p-10 rounded-[2rem] bg-surface-elevated border border-border flex flex-col justify-between overflow-hidden relative group hover:border-primary/50 transition-colors">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Lock className="w-6 h-6" />
                </div>
                <Typography variant="heading" className="mb-3 text-xl">Privacy First</Typography>
                <Typography variant="body" className="text-secondary hover:text-primary transition-colors duration-300 text-sm">
                  Everything happens locally. We use Apple&apos;s ScreenCaptureKit directly, ensuring your sensitive product data never leaves your machine.
                </Typography>
              </div>
            </div>
          </ScrollReveal>

          {/* Hardware Accelerated */}
          <ScrollReveal delay={0.4} className="lg:col-span-2 row-span-1">
            <div className="w-full h-full p-8 md:p-10 rounded-[2rem] bg-primary text-surface flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />
              <div className="relative z-10 max-w-md">
                <div className="w-12 h-12 rounded-2xl bg-surface/20 text-surface flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <Typography variant="heading" className="mb-3 text-2xl text-surface">Hardware Accelerated</Typography>
                <Typography variant="body" className="text-surface/80">
                  Leveraging the Metal API and Apple Silicon Media Engine to encode 4K 60fps ProRes video with near-zero CPU overhead.
                </Typography>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity translate-x-1/4 translate-y-1/4">
                <Zap className="w-64 h-64 text-surface" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. Pricing Section */}
      <section className="mb-32">
        <ScrollReveal>
          <Pricing 
            plans={demoPlans}
            title="Simple, Transparent Pricing"
            description={"Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support."}
          />
        </ScrollReveal>
      </section>

      {/* 5. FAQ (Technical Specs) */}
      <section id="technical-specs" className="max-w-[720px] mx-auto px-4 md:px-8 mb-32 flex justify-center">
        <ScrollReveal className="w-full">
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
        </ScrollReveal>
      </section>

      {/* 6. CTA */}
      <section className="max-w-[720px] mx-auto px-4 md:px-8 text-center flex flex-col items-center">
        <ScrollReveal>
          <Typography variant="heading" className="mb-6">Ready to elevate your demos?</Typography>
          <Typography variant="body" muted className="mb-8 max-w-xl text-center hover:text-primary transition-colors duration-300">
            Join the waitlist to get early access to FreeFlow and start recording cinematic product walkthroughs in seconds.
          </Typography>
          <Link href="/contact" className={buttonVariants({ variant: "primary", size: "large" })}>
            Request Access <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </ScrollReveal>
      </section>
    </main>
  );
}
