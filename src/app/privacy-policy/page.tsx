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
        <Typography variant="heading" className="mb-4">Privacy Policy</Typography>
        
        <Typography variant="body" className="text-secondary">
          Last updated: {new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>

        <section className="flex flex-col gap-4 mt-8">
          <Typography variant="subheading">1. Introduction</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            At SARIV, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">2. Information We Collect</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            We may collect information about you in a variety of ways. The information we may collect on the Site includes:
          </Typography>
          <ul className="list-disc pl-6 text-secondary flex flex-col gap-2">
            <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information.</li>
            <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
          </ul>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">3. Use of Your Information</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
          </Typography>
          <ul className="list-disc pl-6 text-secondary flex flex-col gap-2">
            <li>Create and manage your account.</li>
            <li>Email you regarding your account or order.</li>
            <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
            <li>Respond to product and customer service requests.</li>
          </ul>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">4. Contact Us</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:officialsariv@gmail.com" className="text-primary font-medium hover:underline">officialsariv@gmail.com</a>
          </Typography>
        </section>
      </div>
    </main>
  );
}
