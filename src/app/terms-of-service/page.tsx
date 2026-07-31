import { Typography } from "@/components/ui/Typography";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | SARIV",
  description: "Terms of Service and conditions for using SARIV.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <Typography variant="heading" className="mb-2">Terms of Service</Typography>
        
        <Typography variant="body" className="text-secondary font-mono text-sm tracking-widest uppercase">
          Last updated: July 31, 2026
        </Typography>

        <section className="flex flex-col gap-4 mt-8">
          <Typography variant="body" className="text-secondary leading-relaxed">
            Welcome to SARIV.
          </Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            These Terms of Service (&quot;Terms&quot;) govern your access to and use of our website, services, communications, and any related materials provided by SARIV.
          </Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            By accessing our website or engaging our services, you agree to these Terms.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">1. About SARIV</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            SARIV is a software engineering consultancy specializing in the design, development, modernization, and maintenance of digital products and custom software solutions.
          </Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            The information presented on this website is intended for informational purposes and does not constitute a binding offer or contractual commitment unless expressly agreed in writing.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">2. Use of Our Website</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            You agree to use this website lawfully and responsibly. You may not:
          </Typography>
          <ul className="list-disc pl-6 text-secondary flex flex-col gap-2 font-body text-base">
            <li>Attempt to gain unauthorized access to our systems.</li>
            <li>Disrupt or interfere with website functionality.</li>
            <li>Copy, reproduce, or distribute website content without permission.</li>
            <li>Reverse engineer, scrape, or automate access to our services without authorization.</li>
            <li>Use our website for unlawful or fraudulent purposes.</li>
          </ul>
          <Typography variant="body" className="text-secondary leading-relaxed mt-2">
            We reserve the right to suspend or restrict access where misuse is detected.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">3. Availability</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            We strive to keep our website available and accurate. However, we do not guarantee:
          </Typography>
          <ul className="list-disc pl-6 text-secondary flex flex-col gap-2 font-body text-base">
            <li>Continuous availability</li>
            <li>Error-free operation</li>
            <li>Uninterrupted access</li>
            <li>Complete accuracy of all published information</li>
          </ul>
          <Typography variant="body" className="text-secondary leading-relaxed mt-2">
            Content may be updated, modified, or removed without notice.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">4. Acceptable Use</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            You may not use our services to create or distribute software intended for:
          </Typography>
          <ul className="list-disc pl-6 text-secondary flex flex-col gap-2 font-body text-base">
            <li>Illegal activities</li>
            <li>Fraud</li>
            <li>Malware</li>
            <li>Unauthorized surveillance</li>
            <li>Intellectual property infringement</li>
            <li>Harmful or abusive conduct</li>
          </ul>
          <Typography variant="body" className="text-secondary leading-relaxed mt-2">
            SARIV reserves the right to decline projects that conflict with applicable law or our professional standards.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">5. Changes to These Terms</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            We may revise these Terms periodically to reflect changes in our business or legal requirements. The updated version becomes effective upon publication on this website. Continued use of our website constitutes acceptance of the revised Terms.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">6. Governing Law</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            These Terms shall be governed by and interpreted in accordance with the laws applicable to the jurisdiction in which SARIV operates, unless otherwise specified in a separate written agreement. Any disputes shall be resolved through the appropriate courts or dispute resolution mechanisms within the applicable jurisdiction.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4 mb-8">
          <Typography variant="subheading">7. Contact</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            Questions regarding these Terms may be directed to:
          </Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            SARIV<br />
            Email: <a href="mailto:officialsariv@gmail.com" className="text-primary hover:underline">officialsariv@gmail.com</a>
          </Typography>
        </section>
        
        <div className="border-t border-border pt-8 mt-4">
          <Typography variant="body" className="text-secondary leading-relaxed italic text-sm">
            For specific terms regarding project execution, payments, and deliverables, please refer to our <a href="/engagement-terms" className="text-primary hover:underline">Client Engagement Terms</a>.
          </Typography>
        </div>

      </div>
    </main>
  );
}
