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
          <Typography variant="subheading">3. Project Engagements</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            Submitting an inquiry or contacting SARIV does not create a client relationship. A project officially begins only after:
          </Typography>
          <ul className="list-disc pl-6 text-secondary flex flex-col gap-2 font-body text-base">
            <li>Both parties agree on the scope of work.</li>
            <li>Any required agreements are executed.</li>
            <li>Applicable deposits or initial payments are received.</li>
          </ul>
          <Typography variant="body" className="text-secondary leading-relaxed mt-2">
            Until then, discussions are exploratory and non-binding.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">4. Proposals & Estimates</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            Unless explicitly stated otherwise:
          </Typography>
          <ul className="list-disc pl-6 text-secondary flex flex-col gap-2 font-body text-base">
            <li>All proposals are confidential.</li>
            <li>Estimates are based on the information available at the time.</li>
            <li>Pricing may change if project requirements materially change.</li>
            <li>Timelines are estimates and may vary depending on project complexity, approvals, and external dependencies.</li>
          </ul>
          <Typography variant="body" className="text-secondary leading-relaxed mt-2">
            A proposal does not become a contract until accepted by both parties.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">5. Scope of Work</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            Every engagement is governed by an agreed Scope of Work (SOW). The SOW defines:
          </Typography>
          <ul className="list-disc pl-6 text-secondary flex flex-col gap-2 font-body text-base">
            <li>Deliverables</li>
            <li>Project objectives</li>
            <li>Timeline</li>
            <li>Pricing</li>
            <li>Milestones</li>
            <li>Responsibilities</li>
            <li>Acceptance criteria</li>
          </ul>
          <Typography variant="body" className="text-secondary leading-relaxed mt-2">
            Work outside the agreed scope may require a formal change request and additional fees.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">6. Client Responsibilities</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            Successful projects require collaboration. Clients are responsible for:
          </Typography>
          <ul className="list-disc pl-6 text-secondary flex flex-col gap-2 font-body text-base">
            <li>Providing accurate project information.</li>
            <li>Delivering required assets and content.</li>
            <li>Providing timely feedback.</li>
            <li>Responding to approval requests.</li>
            <li>Maintaining access to third-party services where required.</li>
          </ul>
          <Typography variant="body" className="text-secondary leading-relaxed mt-2">
            Delays in approvals or required information may affect timelines.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">7. Intellectual Property</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            Unless otherwise agreed in writing:
          </Typography>
          <ul className="list-disc pl-6 text-secondary flex flex-col gap-2 font-body text-base">
            <li>All methodologies, internal tools, frameworks, reusable components, templates, automation systems, and proprietary development practices remain the intellectual property of SARIV.</li>
            <li>Ownership of custom project deliverables transfers according to the terms defined in the applicable project agreement, typically upon full payment.</li>
            <li>Third-party libraries, open-source software, and licensed assets remain subject to their respective licenses.</li>
          </ul>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">8. Confidentiality</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            We recognize that software projects often involve sensitive business information. Both parties agree to treat confidential information with appropriate care and not disclose non-public information except where required by law or expressly authorized.
          </Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            Additional confidentiality obligations may be established through separate Non-Disclosure Agreements (NDAs).
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">9. Third-Party Services</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            Projects may integrate third-party platforms, APIs, cloud services, payment providers, analytics tools, or other external technologies. SARIV is not responsible for:
          </Typography>
          <ul className="list-disc pl-6 text-secondary flex flex-col gap-2 font-body text-base">
            <li>Third-party outages</li>
            <li>Pricing changes</li>
            <li>API limitations</li>
            <li>Service discontinuation</li>
            <li>Policy changes</li>
            <li>Security incidents originating from third-party providers</li>
          </ul>
          <Typography variant="body" className="text-secondary leading-relaxed mt-2">
            Clients remain responsible for maintaining any required subscriptions or licenses unless otherwise agreed.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">10. Payments</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            Payment terms are defined within the applicable project agreement. Unless otherwise specified:
          </Typography>
          <ul className="list-disc pl-6 text-secondary flex flex-col gap-2 font-body text-base">
            <li>Invoices are payable according to agreed milestones.</li>
            <li>Work may be paused if payments become overdue.</li>
            <li>Final deliverables may be withheld until outstanding balances are settled.</li>
          </ul>
          <Typography variant="body" className="text-secondary leading-relaxed mt-2">
            Taxes, duties, and applicable government charges remain the client&apos;s responsibility unless explicitly stated otherwise.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">11. Project Changes</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            Software projects naturally evolve. Changes requested after scope approval may impact:
          </Typography>
          <ul className="list-disc pl-6 text-secondary flex flex-col gap-2 font-body text-base">
            <li>Budget</li>
            <li>Timeline</li>
            <li>Resources</li>
            <li>Deliverables</li>
          </ul>
          <Typography variant="body" className="text-secondary leading-relaxed mt-2">
            SARIV reserves the right to evaluate change requests before implementation. No additional work will begin until both parties approve the revised scope where applicable.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">12. Warranties</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            SARIV warrants that services will be performed with reasonable professional skill and care. Except where expressly stated in writing:
          </Typography>
          <ul className="list-disc pl-6 text-secondary flex flex-col gap-2 font-body text-base">
            <li>Software is provided &quot;as delivered.&quot;</li>
            <li>No guarantee is made regarding uninterrupted operation.</li>
            <li>We do not guarantee specific business outcomes, revenue growth, search rankings, or commercial success.</li>
          </ul>
          <Typography variant="body" className="text-secondary leading-relaxed mt-2">
            Technology evolves, and ongoing maintenance may be required over time.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">13. Limitation of Liability</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            To the maximum extent permitted by applicable law, SARIV shall not be liable for:
          </Typography>
          <ul className="list-disc pl-6 text-secondary flex flex-col gap-2 font-body text-base">
            <li>Indirect damages</li>
            <li>Loss of profits</li>
            <li>Business interruption</li>
            <li>Loss of goodwill</li>
            <li>Loss of data</li>
            <li>Consequential damages</li>
          </ul>
          <Typography variant="body" className="text-secondary leading-relaxed mt-2">
            Our total liability relating to any claim shall not exceed the amount paid to SARIV for the specific services giving rise to that claim, unless otherwise required by law.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">14. Availability</Typography>
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
          <Typography variant="subheading">15. Acceptable Use</Typography>
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
          <Typography variant="subheading">16. Termination</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            Either party may terminate discussions or services according to the applicable project agreement. Termination does not affect:
          </Typography>
          <ul className="list-disc pl-6 text-secondary flex flex-col gap-2 font-body text-base">
            <li>Outstanding payment obligations</li>
            <li>Confidentiality commitments</li>
            <li>Intellectual property provisions</li>
            <li>Other obligations intended to survive termination</li>
          </ul>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">17. Changes to These Terms</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            We may revise these Terms periodically to reflect changes in our business or legal requirements. The updated version becomes effective upon publication on this website. Continued use of our website constitutes acceptance of the revised Terms.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">18. Governing Law</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            These Terms shall be governed by and interpreted in accordance with the laws applicable to the jurisdiction in which SARIV operates, unless otherwise specified in a separate written agreement. Any disputes shall be resolved through the appropriate courts or dispute resolution mechanisms within the applicable jurisdiction.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4 mb-8">
          <Typography variant="subheading">19. Contact</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            Questions regarding these Terms may be directed to:
          </Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            SARIV<br />
            Email: <a href="mailto:officialsariv@gmail.com" className="text-primary hover:underline">officialsariv@gmail.com</a>
          </Typography>
        </section>

        {/* Premium Brand Reinforcement */}
        <div className="border-t border-border pt-8 mt-4">
          <Typography variant="body" className="text-secondary leading-relaxed italic text-sm">
            At SARIV, we believe successful software projects are built on clear expectations, transparent communication, and mutual trust. These Terms are intended to establish that foundation while enabling productive, long-term partnerships.
          </Typography>
        </div>

      </div>
    </main>
  );
}
