import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-body font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-surface hover:-translate-y-[2px] hover:bg-primary/90 hover:shadow-elevation",
        secondary:
          "border border-border bg-transparent text-primary hover:bg-surface-elevated",
        ghost:
          "bg-transparent text-primary hover:bg-surface-elevated",
        text: "bg-transparent text-primary hover:underline hover:underline-offset-4",
        danger:
          "bg-error text-surface hover:-translate-y-[2px] hover:bg-error/90 hover:shadow-elevation",
      },
      size: {
        small: "h-[36px] px-4 text-sm",
        medium: "h-[48px] px-6 text-base",
        large: "h-[56px] px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      icon,
      trailingIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Determine which trailing icon to show
    const renderTrailingIcon = loading ? (
      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
    ) : trailingIcon ? (
      <span className="ml-2">{trailingIcon}</span>
    ) : null;

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
        {renderTrailingIcon}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
