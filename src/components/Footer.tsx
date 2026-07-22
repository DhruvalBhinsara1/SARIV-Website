import { Typography } from "./ui/Typography";

export function Footer() {
  return (
    <footer className="flex items-center justify-between border-t border-border bg-background px-8 py-16 md:px-20 mt-auto">
      <Typography variant="caption" muted>
        ©2026 SARIV SYSTEMS
      </Typography>
      <div className="flex gap-8">
        <a
          className="font-body text-[15px] font-medium text-secondary transition-colors hover:text-primary"
          href="#"
        >
          Digital
        </a>
        <a
          className="font-body text-[15px] font-medium text-secondary transition-colors hover:text-primary"
          href="#"
        >
          Physical
        </a>
      </div>
    </footer>
  );
}
