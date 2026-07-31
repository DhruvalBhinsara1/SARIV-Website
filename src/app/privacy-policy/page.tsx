import { Typography } from "@/components/ui/Typography";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SARIV",
  description: "Privacy Policy and data practices for SARIV.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <Typography variant="heading" className="mb-2">Privacy Policy</Typography>
        
        <Typography variant="body" className="text-secondary font-mono text-sm tracking-widest uppercase">
          Last updated: July 31, 2026
        </Typography>

        <section className="flex flex-col gap-4 mt-8">
          <Typography variant="body" className="text-secondary leading-relaxed">
            At SARIV, we respect your privacy and are committed to protecting the information you share with us. This Privacy Policy explains what information we collect, why we collect it, how we use it, and the choices you have regarding your data.
          </Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            By using our website or engaging with our services, you agree to the practices described in this policy.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">Information We Collect</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            We collect information that you voluntarily provide when you:
          </Typography>
          <ul className="list-disc pl-6 text-secondary flex flex-col gap-2 font-body text-base">
            <li>Submit a contact or project inquiry</li>
            <li>Request a consultation</li>
            <li>Subscribe to updates or newsletters</li>
            <li>Communicate with us via email or other channels</li>
          </ul>
          
          <Typography variant="body" className="text-secondary leading-relaxed mt-4">
            This information may include:
          </Typography>
          <ul className="list-disc pl-6 text-secondary flex flex-col gap-2 font-body text-base">
            <li>Name</li>
            <li>Email address</li>
            <li>Company name</li>
            <li>Phone number (if provided)</li>
            <li>Project requirements</li>
            <li>Any additional information you choose to share</li>
          </ul>

          <Typography variant="body" className="text-secondary leading-relaxed mt-4">
            We may also collect limited technical information automatically, including:
          </Typography>
          <ul className="list-disc pl-6 text-secondary flex flex-col gap-2 font-body text-base">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Operating system</li>
            <li>Pages visited</li>
            <li>Referring website</li>
            <li>Session and usage analytics</li>
          </ul>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">How We Use Your Information</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            We use the information we collect to:
          </Typography>
          <ul className="list-disc pl-6 text-secondary flex flex-col gap-2 font-body text-base">
            <li>Respond to inquiries and project requests</li>
            <li>Evaluate potential engagements</li>
            <li>Deliver our services</li>
            <li>Improve our website and user experience</li>
            <li>Communicate important updates</li>
            <li>Maintain website security</li>
            <li>Comply with applicable legal obligations</li>
          </ul>
          <Typography variant="body" className="text-secondary leading-relaxed mt-4">
            We only collect information that is reasonably necessary for these purposes.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">Cookies & Analytics</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            Our website may use cookies and similar technologies to improve functionality, understand visitor behavior, and enhance performance.
          </Typography>
          <Typography variant="body" className="text-secondary leading-relaxed mt-4">
            These technologies help us:
          </Typography>
          <ul className="list-disc pl-6 text-secondary flex flex-col gap-2 font-body text-base">
            <li>Analyze website traffic</li>
            <li>Improve user experience</li>
            <li>Remember user preferences</li>
            <li>Measure website performance</li>
          </ul>
          <Typography variant="body" className="text-secondary leading-relaxed mt-4">
            You may disable cookies through your browser settings, although some features of the website may not function as intended.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">Third-Party Services</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            To operate our business, we may use trusted third-party providers, including services for:
          </Typography>
          <ul className="list-disc pl-6 text-secondary flex flex-col gap-2 font-body text-base">
            <li>Website hosting</li>
            <li>Analytics</li>
            <li>Email communication</li>
            <li>Form processing</li>
            <li>Cloud infrastructure</li>
            <li>Customer relationship management (CRM)</li>
          </ul>
          <Typography variant="body" className="text-secondary leading-relaxed mt-4">
            These providers only receive information necessary to perform their services and are expected to protect your data appropriately.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">Data Security</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            We take reasonable administrative, technical, and organizational measures to protect personal information from unauthorized access, alteration, disclosure, or destruction.
          </Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            While no online system can guarantee absolute security, protecting client and visitor information is a core part of how we operate.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">Client Confidentiality</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            For client engagements, confidentiality is fundamental to our work.
          </Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            Unless explicitly authorized, we do not disclose confidential project information, source code, technical documentation, proprietary business information, or other non-public materials belonging to our clients.
          </Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            Where appropriate, additional confidentiality obligations may be governed by separate Non-Disclosure Agreements (NDAs) or contractual agreements.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">Data Retention</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            We retain personal information only for as long as necessary to:
          </Typography>
          <ul className="list-disc pl-6 text-secondary flex flex-col gap-2 font-body text-base">
            <li>Provide requested services</li>
            <li>Maintain business records</li>
            <li>Meet legal or contractual obligations</li>
            <li>Resolve disputes</li>
            <li>Enforce agreements</li>
          </ul>
          <Typography variant="body" className="text-secondary leading-relaxed mt-4">
            When information is no longer required, it is securely deleted or anonymized where appropriate.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">Your Rights</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            Depending on your jurisdiction, you may have the right to:
          </Typography>
          <ul className="list-disc pl-6 text-secondary flex flex-col gap-2 font-body text-base">
            <li>Access the personal information we hold about you</li>
            <li>Request corrections to inaccurate information</li>
            <li>Request deletion of your personal data</li>
            <li>Withdraw consent where applicable</li>
            <li>Object to certain processing activities</li>
            <li>Request a copy of your information</li>
          </ul>
          <Typography variant="body" className="text-secondary leading-relaxed mt-4">
            To exercise these rights, please contact us using the details below.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">International Visitors</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            If you access our website from outside the country where our infrastructure is located, your information may be transferred to and processed in other jurisdictions where data protection laws may differ.
          </Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            We take reasonable steps to ensure appropriate safeguards are in place for such transfers.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">Children&apos;s Privacy</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            Our website and services are intended for businesses and professionals. We do not knowingly collect personal information from children under the age of 13 (or the minimum age required by applicable law).
          </Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            If we become aware that such information has been collected, we will take reasonable steps to delete it.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">Changes to This Policy</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            We may update this Privacy Policy from time to time to reflect changes in our services, legal requirements, or operational practices.
          </Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            The &quot;Last updated&quot; date at the top of this page indicates when this policy was most recently revised.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4 mb-8">
          <Typography variant="subheading">Contact Us</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            If you have any questions regarding this Privacy Policy or how your information is handled, please contact us.
          </Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            SARIV<br />
            Email: <a href="mailto:officialsariv@gmail.com" className="text-primary hover:underline">officialsariv@gmail.com</a>
          </Typography>
        </section>

        {/* Premium Brand Reinforcement */}
        <div className="border-t border-border pt-8 mt-4">
          <Typography variant="body" className="text-secondary leading-relaxed italic text-sm">
            Trust is a core part of how we work. Whether you&apos;re sharing a simple inquiry or discussing a confidential product idea, we treat your information with the same care and professionalism that we apply to every engineering engagement.
          </Typography>
        </div>

      </div>
    </main>
  );
}
