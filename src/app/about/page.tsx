import { Typography } from "@/components/ui/Typography";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Keyboard } from "@/components/ui/Keyboard";

const PRINCIPLES = [
  {
    title: "Zero Technical Debt",
    description:
      "We believe that speed of execution in the long term requires uncompromising discipline in the short term. We do not accept 'quick hacks' that compromise architecture.",
  },
  {
    title: "Quiet Luxury",
    description:
      "Our design philosophy strips away the superfluous. We rely on typography, motion, and structural integrity to convey value, rather than excessive ornamentation.",
  },
  {
    title: "Deterministic Execution",
    description:
      "Every variable is strictly typed. Every UI state is predictable. We engineer systems that scale predictably and fail gracefully.",
  },
  {
    title: "Developer Experience",
    description:
      "A pristine codebase is a fast codebase. We prioritize tooling, strict linting, and automated testing to protect the mental bandwidth of our engineers.",
  }
];

export default function AboutPage() {
  return (
    <main className="flex-1 w-full bg-background pt-32 pb-32">
      <div className="max-w-[720px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <ScrollReveal>
          <section className="mb-24">
            <Typography variant="caption" transform="uppercase" className="text-secondary font-semibold mb-6 block">
              About SARIV
            </Typography>
            <Typography variant="display" className="mb-8">
              Building what matters.
            </Typography>
            <Typography variant="body" className="text-xl md:text-2xl leading-relaxed">
              SARIV is an engineering and design collective focused on architecting timeless digital infrastructure. We refuse to chase industry trends, focusing instead on structural integrity, performance, and uncompromising aesthetic execution.
            </Typography>
          </section>
        </ScrollReveal>

        {/* Mission Statement */}
        <ScrollReveal delay={0.1}>
          <section className="mb-32">
            <Typography variant="subheading" className="mb-6">
              The Mission
            </Typography>
            <Typography variant="body" className="mb-6">
              Most software today is built to be disposable. It relies on unstable dependencies, fragile CSS, and &apos;move fast and break things&apos; methodologies that ultimately result in crushing technical debt.
            </Typography>
            <Typography variant="body">
              Our mission is to build software that lasts. We treat frontend architecture with the same rigor and precision as backend systems programming. 
            </Typography>
          </section>
        </ScrollReveal>

        {/* Principles */}
        <ScrollReveal delay={0.2}>
          <section>
            <Typography variant="subheading" className="mb-12">
              Engineering Principles
            </Typography>
          
          <div className="flex flex-col gap-12">
            {PRINCIPLES.map((principle, i) => (
              <div key={i} className="border-t border-border pt-6">
                <Typography variant="caption" muted className="font-mono mb-4 block tracking-widest">
                  0{i + 1} {"//"}
                </Typography>
                <Typography variant="heading" className="mb-4 text-2xl">
                  {principle.title}
                </Typography>
                <Typography variant="body" className="mb-8">
                  {principle.description}
                </Typography>
                {principle.title === "Developer Experience" && (
                  <div className="w-full flex justify-center py-12 bg-surface-elevated rounded-2xl border border-border mt-8 overflow-hidden">
                    <Keyboard showPreview={true} />
                  </div>
                )}
              </div>
            ))}
          </div>
          </section>
        </ScrollReveal>

      </div>
    </main>
  );
}
