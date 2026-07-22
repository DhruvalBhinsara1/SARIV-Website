import { Typography } from "./ui/Typography";
import { LinkPreview } from "./ui/link-preview";
import Link from "next/link";
import { Mark } from "./Mark";
import { Triangle } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative w-full border-t border-border bg-background pt-24 mt-auto overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-20 grid grid-cols-2 md:grid-cols-5 gap-y-12 gap-x-8 md:gap-8 pb-32">
        
        {/* Branding */}
        <div className="flex flex-col gap-6 col-span-2 md:col-span-1">
          <div className="flex items-center gap-2">
            <Mark className="w-8 h-8 text-primary" />
            <Typography variant="subheading" className="font-bold tracking-widest uppercase [text-box:trim-both_cap_alphabetic]">
              SARIV
            </Typography>
          </div>
          <Typography variant="body" muted className="text-sm">
            © copyright SARIV {new Date().getFullYear()}. All rights reserved.
          </Typography>
        </div>

        {/* Pages */}
        <div className="flex flex-col gap-4">
          <Typography variant="caption" className="font-semibold text-primary mb-2">
            Pages
          </Typography>
          <Link href="/" className="text-secondary hover:text-primary transition-colors text-sm font-medium">Home</Link>
          <Link href="/work" className="text-secondary hover:text-primary transition-colors text-sm font-medium">Work</Link>
          <Link href="/identity" className="text-secondary hover:text-primary transition-colors text-sm font-medium">Identity</Link>
          <Link href="/contact" className="text-secondary hover:text-primary transition-colors text-sm font-medium">Contact</Link>
        </div>

        {/* Socials */}
        <div className="flex flex-col gap-4">
          <Typography variant="caption" className="font-semibold text-primary mb-2">
            Socials
          </Typography>
          <LinkPreview url="https://twitter.com/sariv" className="text-secondary hover:text-primary transition-colors text-sm font-medium text-left no-underline w-fit">
            Twitter
          </LinkPreview>
          <LinkPreview url="https://linkedin.com/company/sariv" className="text-secondary hover:text-primary transition-colors text-sm font-medium text-left no-underline w-fit">
            LinkedIn
          </LinkPreview>
          <LinkPreview url="https://instagram.com/sariv" className="text-secondary hover:text-primary transition-colors text-sm font-medium text-left no-underline w-fit">
            Instagram
          </LinkPreview>
          <LinkPreview url="https://github.com/sariv" className="text-secondary hover:text-primary transition-colors text-sm font-medium text-left no-underline w-fit">
            GitHub
          </LinkPreview>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-4">
          <Typography variant="caption" className="font-semibold text-primary mb-2">
            Legal
          </Typography>
          <a href="#" className="text-secondary hover:text-primary transition-colors text-sm font-medium">Privacy Policy</a>
          <a href="#" className="text-secondary hover:text-primary transition-colors text-sm font-medium">Terms of Service</a>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <Typography variant="caption" className="font-semibold text-primary mb-2">
            Contact
          </Typography>
          <a href="mailto:officialsariv@gmail.com" className="text-secondary hover:text-primary transition-colors text-sm font-medium">officialsariv@gmail.com</a>
          <a href="tel:+919510517172" className="text-secondary hover:text-primary transition-colors text-sm font-medium">+91 9510517172</a>
        </div>
      </div>

      {/* Massive Background Text */}
      <div className="w-full flex justify-center pointer-events-none select-none absolute bottom-0 left-0 right-0 translate-y-[26%] z-0">
        <span className="text-[25vw] font-bold leading-[0.75] tracking-tighter text-neutral-200 dark:text-neutral-800">
          SARIV
        </span>
      </div>
    </footer>
  );
}
