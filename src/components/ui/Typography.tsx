import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("text-primary m-0", {
  variants: {
    variant: {
      display:
        "font-display font-normal text-[clamp(72px,8vw,120px)] leading-[0.95] tracking-[-0.02em]",
      heading:
        "font-display font-normal text-[clamp(48px,5vw,72px)] leading-[1.1]",
      subheading:
        "font-body font-medium text-[clamp(24px,3vw,32px)] leading-[1.4] text-justify",
      body: "font-body font-normal text-[18px] leading-[1.7] max-w-[70ch] text-justify",
      caption: "font-body font-medium text-[clamp(12px,1vw,14px)] tracking-[0.01em] text-justify",
    },
    transform: {
      none: "",
      uppercase: "uppercase",
      lowercase: "lowercase",
      capitalize: "capitalize",
    },
    muted: {
      true: "text-muted",
      false: "",
    },
  },
  defaultVariants: {
    variant: "body",
    transform: "none",
    muted: false,
  },
});

type TypographyProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  children?: React.ReactNode;
} & VariantProps<typeof typographyVariants> &
  Omit<
    React.ComponentPropsWithoutRef<T>,
    "as" | "className" | "children" | keyof VariantProps<typeof typographyVariants>
  >;

export function Typography<T extends React.ElementType = "p">({
  as,
  className,
  variant,
  transform,
  muted,
  children,
  ...props
}: TypographyProps<T>) {
  const defaultTag = {
    display: "h1",
    heading: "h2",
    subheading: "h3",
    body: "p",
    caption: "span",
  }[variant || "body"] as React.ElementType;

  const Component = as || defaultTag;

  return (
    <Component
      className={cn(typographyVariants({ variant, transform, muted, className }))}
      {...props}
    >
      {children}
    </Component>
  );
}

Typography.displayName = "Typography";
