import { Typography } from "./ui/Typography";
import { LinkPreview } from "./ui/link-preview";
import { Triangle } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative w-full border-t border-border bg-background pt-24 mt-auto overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-8 md:px-12 grid grid-cols-2 md:grid-cols-6 gap-x-8 gap-y-16 z-10 relative">
        {/* Branding & Copyright */}
        <div className="col-span-2 flex flex-col items-start">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Triangle className="h-4 w-4 fill-current" />
            </div>
            <span className="text-xl font-bold tracking-tight">SARIV</span>
          </div>
          <Typography variant="body" muted className="max-w-xs text-sm">
            © copyright SARIV 2024. All rights reserved.
          </Typography>
        </div>

        {/* Pages */}
        <div className="flex flex-col gap-4">
          <Typography variant="caption" className="font-semibold text-primary mb-2">
            Pages
          </Typography>
          <a href="/" className="text-secondary hover:text-primary transition-colors text-sm font-medium">Home</a>
          <a href="/work" className="text-secondary hover:text-primary transition-colors text-sm font-medium">Work</a>
          <a href="/identity" className="text-secondary hover:text-primary transition-colors text-sm font-medium">Identity</a>
          <a href="/contact" className="text-secondary hover:text-primary transition-colors text-sm font-medium">Contact</a>
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
          <a href="mailto:hello@sariv.co" className="text-secondary hover:text-primary transition-colors text-sm font-medium">hello@sariv.co</a>
          <a href="tel:+1234567890" className="text-secondary hover:text-primary transition-colors text-sm font-medium">+1 (234) 567-890</a>
        </div>
      </div>

      {/* Massive Background Text */}
      <div className="w-full flex justify-center pointer-events-none mt-12 md:mt-8 select-none overflow-hidden relative top-[4vw] z-0">
        <span className="text-[25vw] font-bold leading-[0.75] tracking-tighter text-neutral-200 dark:text-neutral-800">
          SARIV
        </span>
      </div>
    </footer>
  );
}
