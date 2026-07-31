import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { Mark } from "@/components/Mark";
import { buttonVariants } from "@/components/ui/Button";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type ServiceTier = {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
};

// PLACEHOLDER DATA: The user needs to update these with their actual pricing details
// to satisfy Razorpay's compliance requirements.
const SERVICES: ServiceTier[] = [
  {
    id: "landing-page",
    name: "Premium Landing Page",
    description: "A high-conversion, beautifully animated single-page marketing site designed to capture leads and make a stunning first impression.",
    price: "Starting at $1,500",
    features: [
      "Bespoke UI/UX Design",
      "Framer Motion Animations",
      "Mobile Responsive & Optimized",
      "SEO & Analytics Setup",
      "1 Week Delivery",
    ],
  },
  {
    id: "web-app",
    name: "Custom Web Application",
    description: "End-to-end engineering of complex, data-driven web applications using modern tech stacks like Next.js, React, and Node.",
    price: "Starting at $4,000",
    features: [
      "Full-Stack Development",
      "Database & Auth Architecture",
      "API Integrations (Stripe, AI, etc.)",
      "Admin Dashboards",
      "Scalable Infrastructure",
    ],
  },
  {
    id: "ecommerce-pos",
    name: "E-Commerce & POS",
    description: "Real-time digital storefronts and physical point-of-sale systems built for speed, reliability, and seamless inventory management.",
    price: "Starting at $3,500",
    features: [
      "Custom Storefront Design",
      "Payment Gateway Setup",
      "Inventory Syncing",
      "Real-time Kitchen/Order Displays",
      "Ongoing Maintenance",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="w-full bg-background min-h-screen">
      {/* Index / masthead */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-8 pt-32 md:pt-40 pb-16 md:pb-24 border-b border-border">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-10">
            <Mark className="w-4 h-4 text-secondary" />
            <span className="font-body text-secondary uppercase tracking-[0.25em] text-[11px] font-semibold">
              Services & Pricing
            </span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-8 md:gap-20 items-end">
          <ScrollReveal delay={0.08}>
            <h1 className="font-display font-normal text-primary text-[clamp(48px,8vw,110px)] leading-[0.9] tracking-[-0.03em]">
              Premium engineering,
              <br />
              transparent pricing.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.16}>
            <p className="font-body text-secondary text-base md:text-lg leading-relaxed md:pb-4">
              We don&apos;t do hidden fees or vague estimates. Below is a breakdown of our core service offerings and baseline pricing to give you clarity from day one.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 0.1}>
              <div className="flex flex-col h-full border border-border rounded-[2rem] p-8 md:p-10 bg-surface hover:bg-surface-elevated transition-colors duration-500">
                <h3 className="font-display text-3xl text-primary mb-4">{service.name}</h3>
                <p className="font-body text-secondary text-sm leading-relaxed mb-8 min-h-[80px]">
                  {service.description}
                </p>
                
                <div className="mb-10 pb-10 border-b border-border/50">
                  <span className="font-mono text-xs tracking-widest uppercase text-muted block mb-2">Investment</span>
                  <span className="font-display text-4xl text-primary">{service.price}</span>
                </div>

                <ul className="flex-1 flex flex-col gap-4 mb-10">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 opacity-70" />
                      <span className="font-body text-sm text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/start-project"
                  className={cn(
                    buttonVariants({ variant: "secondary", className: "w-full justify-between group" })
                  )}
                >
                  Request Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Terms & Conditions / FAQ (Good for Payment Gateway Compliance) */}
      <section className="border-t border-border py-20 md:py-32 bg-surface-elevated">
        <div className="max-w-[800px] mx-auto px-6 md:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-display text-4xl text-primary mb-6">Payment Terms & Policies</h2>
            <p className="font-body text-secondary text-base leading-relaxed mb-12">
              For all custom projects, we typically require a 50% upfront deposit to secure your spot in our schedule, with the remaining 50% due upon successful delivery and launch. All payments are securely processed via Razorpay. Due to the bespoke nature of digital engineering, refunds are handled on a case-by-case milestone basis.
            </p>
            <Magnetic strength={15}>
              <Link
                href="/contact"
                className={buttonVariants({ variant: "primary" })}
              >
                Contact us for custom requirements
              </Link>
            </Magnetic>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
