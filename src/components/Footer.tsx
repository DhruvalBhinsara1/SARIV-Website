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
          <a href="#" className="text-secondary hover:text-primary transition-colors text-sm font-medium">All Products</a>
          <a href="#" className="text-secondary hover:text-primary transition-colors text-sm font-medium">Studio</a>
          <a href="#" className="text-secondary hover:text-primary transition-colors text-sm font-medium">Clients</a>
          <a href="#" className="text-secondary hover:text-primary transition-colors text-sm font-medium">Pricing</a>
          <a href="#" className="text-secondary hover:text-primary transition-colors text-sm font-medium">Blog</a>
        </div>

        {/* Socials */}
        <div className="flex flex-col gap-4">
          <Typography variant="caption" className="font-semibold text-primary mb-2">
            Socials
          </Typography>
          <LinkPreview url="https://facebook.com" className="text-secondary hover:text-primary transition-colors text-sm font-medium text-left no-underline w-fit">
            Facebook
          </LinkPreview>
          <LinkPreview url="https://instagram.com" className="text-secondary hover:text-primary transition-colors text-sm font-medium text-left no-underline w-fit">
            Instagram
          </LinkPreview>
          <LinkPreview url="https://twitter.com" className="text-secondary hover:text-primary transition-colors text-sm font-medium text-left no-underline w-fit">
            Twitter
          </LinkPreview>
          <LinkPreview url="https://linkedin.com" className="text-secondary hover:text-primary transition-colors text-sm font-medium text-left no-underline w-fit">
            LinkedIn
          </LinkPreview>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-4">
          <Typography variant="caption" className="font-semibold text-primary mb-2">
            Legal
          </Typography>
          <a href="#" className="text-secondary hover:text-primary transition-colors text-sm font-medium">Privacy Policy</a>
          <a href="#" className="text-secondary hover:text-primary transition-colors text-sm font-medium">Terms of Service</a>
          <a href="#" className="text-secondary hover:text-primary transition-colors text-sm font-medium">Cookie Policy</a>
        </div>

        {/* Register */}
        <div className="flex flex-col gap-4">
          <Typography variant="caption" className="font-semibold text-primary mb-2">
            Register
          </Typography>
          <a href="#" className="text-secondary hover:text-primary transition-colors text-sm font-medium">Sign Up</a>
          <a href="#" className="text-secondary hover:text-primary transition-colors text-sm font-medium">Login</a>
          <a href="#" className="text-secondary hover:text-primary transition-colors text-sm font-medium leading-tight">Forgot Password</a>
        </div>
      </div>

      {/* Massive Background Text */}
      <div className="w-full flex justify-center pointer-events-none mt-12 md:mt-8 select-none overflow-hidden relative top-[4vw] z-0">
        <span className="text-[25vw] font-bold leading-[0.75] tracking-tighter text-muted/10 opacity-50 dark:opacity-20">
          SARIV
        </span>
      </div>
    </footer>
  );
}
