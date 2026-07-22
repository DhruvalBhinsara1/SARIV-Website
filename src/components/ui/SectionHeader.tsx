import * as React from "react"
import { cn } from "@/lib/utils"
import { Typography } from "@/components/ui/Typography"

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string
  heading: React.ReactNode
  supportingText?: string
  cta?: React.ReactNode
}

export function SectionHeader({
  eyebrow,
  heading,
  supportingText,
  cta,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div className={cn("flex w-full max-w-[var(--max-reading-width,720px)] flex-col items-start gap-6 text-justify", className)} {...props}>
      {eyebrow && (
        <Typography variant="caption" transform="uppercase" muted>
          {eyebrow}
        </Typography>
      )}
      {typeof heading === "string" ? (
        <Typography variant="heading">{heading}</Typography>
      ) : (
        <div className="flex items-center">
          {heading}
        </div>
      )}
      {supportingText && (
        <Typography variant="subheading" muted>
          {supportingText}
        </Typography>
      )}
      {cta && <div className="mt-4">{cta}</div>}
    </div>
  )
}
