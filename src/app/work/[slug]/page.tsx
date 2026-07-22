import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Typography } from "@/components/ui/Typography";
import { buttonVariants } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DitherShader } from "@/components/ui/DitherShader";
export default function CaseStudyPage() {
  return (
    <main className="flex-1 w-full bg-background pt-32 pb-32">
      <article className="max-w-[900px] mx-auto px-4 md:px-8">
        
        {/* Navigation */}
        <Link href="/work" className="inline-flex items-center text-muted hover:text-primary transition-colors font-body text-sm font-medium mb-16 group">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Work
        </Link>

        {/* Header */}
        <header className="mb-20 animate-fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
            <div className="max-w-2xl">
              <Typography variant="caption" transform="uppercase" className="text-secondary font-semibold mb-6 block">
                FinTech Platform
              </Typography>
              <Typography variant="display">
                Global Payments Infrastructure
              </Typography>
            </div>
            <a href="#" className={buttonVariants({ variant: "secondary" })}>
              View Live Site <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-border">
            <div>
              <Typography variant="caption" muted className="block mb-2">Client</Typography>
              <Typography variant="body" className="font-semibold">Acme Financial</Typography>
            </div>
            <div>
              <Typography variant="caption" muted className="block mb-2">Role</Typography>
              <Typography variant="body" className="font-semibold">Architecture & UI</Typography>
            </div>
            <div>
              <Typography variant="caption" muted className="block mb-2">Timeline</Typography>
              <Typography variant="body" className="font-semibold">6 Months</Typography>
            </div>
            <div>
              <Typography variant="caption" muted className="block mb-2">Stack</Typography>
              <Typography variant="body" className="font-semibold">Next.js, tRPC, Tailwind</Typography>
            </div>
          </div>
        </header>

        {/* The Problem */}
        <section className="mb-24 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <SectionHeader 
            eyebrow="The Challenge" 
            heading="Modernizing a Legacy Core" 
            className="mb-8"
          />
          <div className="max-w-[720px]">
            <Typography variant="body" className="mb-6">
              Acme Financial possessed a robust backend, but their client-facing portal was built on a decade-old Angular monolithic architecture. It suffered from multi-second load times, unpredictable state management, and a disjointed design language that eroded user trust.
            </Typography>
            <Typography variant="body">
              Our mandate was to replace the entire frontend infrastructure without disrupting the underlying banking logic, while simultaneously elevating the aesthetic to match their premium brand positioning.
            </Typography>
          </div>
        </section>

        {/* Visual Break */}
        <section className="mb-24 animate-fade-up w-full aspect-video rounded-3xl overflow-hidden border border-border relative" style={{ animationDelay: "0.2s" }}>
          <DitherShader 
             src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
             gridSize={4} 
             colorMode="duotone"
             primaryColor="#000000"
             secondaryColor="#4f46e5" 
             pixelRatio={1}
             animated={false}
             objectFit="cover"
             className="absolute inset-0"
          />
        </section>

        {/* The Solution */}
        <section className="mb-24">
          <SectionHeader 
            eyebrow="The Architecture" 
            heading="Strictly Typed & Highly Scalable" 
            className="mb-8"
          />
          <div className="max-w-[720px]">
            <Typography variant="body" className="mb-6">
              We architected a new Next.js App Router application utilizing React Server Components to immediately drop the client-side bundle size by 70%. By implementing strict tRPC boundaries, we guaranteed end-to-end type safety between the client and their existing microservices layer.
            </Typography>
            <Typography variant="body">
              The UI was completely re-engineered using a custom Tailwind v4 configuration mapped perfectly to their new design tokens, ensuring visual consistency across hundreds of complex data-grid views and transactional flows.
            </Typography>
          </div>
        </section>

      </article>
    </main>
  );
}
