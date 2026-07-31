import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { Mark } from "@/components/Mark";
import { buttonVariants } from "@/components/ui/Button";
import { ArrowRight, Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { LocalizedPrice } from "@/components/ui/LocalizedPrice";

type ServiceTier = {
  id: string;
  name: string;
  description: string;
  outcomes: string;
  idealClient: string;
  usdPrice: string;
  inrPrice: string;
  deliverables: string[];
  cta: string;
};

const SERVICES: ServiceTier[] = [
  {
    id: "digital-platforms",
    name: "High-Performance Digital Platforms",
    description: "Fast, meticulously engineered websites designed to elevate your brand and capture leads.",
    outcomes: "Elevated brand perception. Faster load times. Higher conversion rates.",
    idealClient: "Companies whose current website fails to reflect the premium quality of their actual services.",
    usdPrice: "Starting at $2,500",
    inrPrice: "Starting at ₹2,00,000",
    deliverables: [
      "UI/UX Design",
      "CMS Integration",
      "Technical SEO",
      "Responsive Frontend Engineering",
    ],
    cta: "Discuss your platform",
  },
  {
    id: "custom-products",
    name: "Custom Digital Products",
    description: "Bespoke, data-driven web applications built to automate your operations or serve your customers.",
    outcomes: "Streamlined operations. Centralized data. Elimination of manual spreadsheet workarounds.",
    idealClient: "Growing businesses that have outgrown off-the-shelf SaaS and need software tailored to their exact workflows.",
    usdPrice: "Starting at $7,500",
    inrPrice: "Starting at ₹6,00,000",
    deliverables: [
      "Full-Stack Engineering",
      "Database Architecture",
      "API Integrations",
      "Secure Authentication",
      "Admin Dashboards",
    ],
    cta: "Discuss your product",
  },
  {
    id: "modernization",
    name: "Platform Modernization & Integration",
    description: "Upgrading legacy systems and connecting fragmented tools so your business can scale without technical friction.",
    outcomes: "Automated data flow. Reduced maintenance costs. Elimination of technical debt.",
    idealClient: "Established businesses hindered by slow, outdated, or disconnected internal systems.",
    usdPrice: "Starting at $4,000",
    inrPrice: "Starting at ₹3,20,000",
    deliverables: [
      "Codebase Audits",
      "Refactoring",
      "Custom API Development",
      "Third-Party System Syncing",
    ],
    cta: "Discuss your infrastructure",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery & Blueprint",
    desc: "We dive deep into your business problem, completely mapping out the architecture and scope before a single line of code is written."
  },
  {
    number: "02",
    title: "Design & Architecture",
    desc: "We design the user experience and technical foundation, ensuring the solution is both beautiful and scalable."
  },
  {
    number: "03",
    title: "Engineering & Build",
    desc: "Our engineers build the product in predictable sprints, providing complete transparency into our progress."
  },
  {
    number: "04",
    title: "Launch & Scale",
    desc: "We handle the deployment, monitor the performance, and stand by to scale the infrastructure as your business grows."
  }
];

export default function ServicesPage() {
  return (
    <main className="w-full bg-background min-h-screen">
      {/* Hero Section */}
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
            <h1 className="font-display font-normal text-primary text-[clamp(48px,8vw,90px)] leading-[0.9] tracking-[-0.03em]">
              Engineering that drives business outcomes.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.16}>
            <p className="font-body text-secondary text-base md:text-lg leading-relaxed md:pb-4">
              We don&apos;t just write code. We partner with ambitious businesses to design, build, and scale custom digital products that solve real operational challenges.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Philosophy (Why Us) */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-32 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <ScrollReveal>
            <h2 className="font-display text-4xl text-primary leading-tight">
              We think about business outcomes, not just technologies.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="flex flex-col gap-6 text-secondary font-body leading-relaxed text-lg">
              <p>
                Customers don&apos;t wake up thinking they need a specific JavaScript framework. They wake up realizing their current software is costing them time, money, and momentum.
              </p>
              <p>
                A cheap agency builds a liability you have to manage. We build assets that work reliably, require zero babysitting, and scale with your growth. 
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Offer Stack */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-32">
        <div className="flex flex-col gap-12 md:gap-16">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.id} delay={0.1}>
              <div className="flex flex-col lg:flex-row border border-border rounded-[2rem] bg-surface hover:bg-surface-elevated transition-colors duration-500 overflow-hidden">
                
                {/* Left Side: Copy & Outcomes */}
                <div className="flex-1 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-border flex flex-col">
                  <h3 className="font-display text-4xl text-primary mb-4">{service.name}</h3>
                  <p className="font-body text-secondary text-lg leading-relaxed mb-8">
                    {service.description}
                  </p>
                  
                  <div className="flex flex-col gap-6 mt-auto">
                    <div>
                      <span className="font-mono text-[10px] tracking-widest uppercase text-muted block mb-2">Business Outcomes</span>
                      <p className="font-body text-sm text-primary">{service.outcomes}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] tracking-widest uppercase text-muted block mb-2">Who this is for</span>
                      <p className="font-body text-sm text-secondary">{service.idealClient}</p>
                    </div>
                  </div>
                </div>

                {/* Right Side: Deliverables & Pricing */}
                <div className="w-full lg:w-[400px] bg-background/50 p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-muted block mb-6">Typical Deliverables</span>
                    <ul className="flex flex-col gap-4 mb-10">
                      {service.deliverables.map((deliverable, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-primary shrink-0 opacity-70 mt-0.5" />
                          <span className="font-body text-sm text-secondary">{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8 border-t border-border/50">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-muted block mb-2">Investment</span>
                    <span className="font-display text-3xl text-primary mb-6 block">
                      <LocalizedPrice usdPrice={service.usdPrice} inrPrice={service.inrPrice} />
                    </span>
                    <Link
                      href="/start-project"
                      className={cn(
                        buttonVariants({ variant: "secondary", className: "w-full justify-between group" })
                      )}
                    >
                      {service.cta}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-surface py-20 md:py-32 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <h2 className="font-display text-4xl text-primary mb-16">Our Process</h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.1}>
                <div className="flex flex-col">
                  <span className="font-mono text-xs tracking-widest text-muted mb-4">{step.number}</span>
                  <h3 className="font-display text-2xl text-primary mb-4">{step.title}</h3>
                  <p className="font-body text-secondary text-sm leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / Payment Terms */}
      <section className="border-t border-border py-20 md:py-32">
        <div className="max-w-[800px] mx-auto px-6 md:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-display text-4xl text-primary mb-6">Transparent Engagement</h2>
            <p className="font-body text-secondary text-base leading-relaxed mb-12">
              We prioritize predictability. Projects are divided into clear milestones governed by our <Link href="/engagement-terms" className="text-primary hover:underline">Client Engagement Terms</Link>. We typically require a 50% upfront deposit to commence engineering, with the remainder due upon successful delivery. Clear ownership, clear timelines, zero surprises.
            </p>
            <Magnetic strength={15}>
              <Link
                href="/start-project"
                className={buttonVariants({ variant: "primary" })}
              >
                Schedule a Consultation
              </Link>
            </Magnetic>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
