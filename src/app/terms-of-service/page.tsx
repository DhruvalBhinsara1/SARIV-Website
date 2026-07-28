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
        <Typography variant="heading" className="mb-4">Terms of Service</Typography>
        
        <Typography variant="body" className="text-secondary">
          Last updated: {new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>

        <section className="flex flex-col gap-4 mt-8">
          <Typography variant="subheading">1. Agreement to Terms</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and SARIV ("we," "us" or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">2. Intellectual Property Rights</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">3. User Representations</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            By using the Site, you represent and warrant that:
          </Typography>
          <ul className="list-disc pl-6 text-secondary flex flex-col gap-2">
            <li>All registration information you submit will be true, accurate, current, and complete.</li>
            <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
            <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
            <li>You will not access the Site through automated or non-human means, whether through a bot, script, or otherwise.</li>
          </ul>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">4. Limitations of Liability</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site.
          </Typography>
        </section>

        <section className="flex flex-col gap-4 mt-4">
          <Typography variant="subheading">5. Contact Us</Typography>
          <Typography variant="body" className="text-secondary leading-relaxed">
            In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at: <a href="mailto:officialsariv@gmail.com" className="text-primary font-medium hover:underline">officialsariv@gmail.com</a>
          </Typography>
        </section>
      </div>
    </main>
  );
}
