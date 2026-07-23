"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { Typography } from "@/components/ui/Typography";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

export interface PricingProps {
  plans: PricingPlan[];
  title: string;
  description: string;
  currencySymbol?: string;
}

export function Pricing({ plans, title, description, currencySymbol = "$" }: PricingProps) {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="w-full py-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <Typography variant="display" className="mb-6">
            {title}
          </Typography>
          <Typography variant="body" className="max-w-2xl text-secondary whitespace-pre-wrap">
            {description}
          </Typography>

          <div className="mt-10 flex items-center bg-surface-elevated p-1 rounded-full border border-border relative">
            <LayoutGroup>
              <button
                onClick={() => setIsYearly(false)}
                className={cn(
                  "relative px-6 py-2 text-sm font-medium transition-colors duration-300 z-10",
                  !isYearly ? "text-primary" : "text-secondary hover:text-primary"
                )}
              >
                {!isYearly && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-surface shadow-sm rounded-full border border-border/50"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Monthly</span>
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={cn(
                  "relative px-6 py-2 text-sm font-medium transition-colors duration-300 flex items-center z-10",
                  isYearly ? "text-primary" : "text-secondary hover:text-primary"
                )}
              >
                {isYearly && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-surface shadow-sm rounded-full border border-border/50"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center">
                  Annually <span className={cn("text-xs font-semibold ml-2 transition-colors", isYearly ? "text-success" : "text-success/80")}>-20%</span>
                </span>
              </button>
            </LayoutGroup>
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 80, rotateX: 15, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: plan.isPopular ? 1.05 : 1 }}
              whileHover={{ y: -8, scale: plan.isPopular ? 1.08 : 1.02 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.15,
                mass: 1.2
              }}
              style={{ transformPerspective: 1000 }}
              className={cn(
                "relative flex flex-col p-8 rounded-3xl border transition-colors duration-300",
                plan.isPopular
                  ? "bg-primary text-surface border-primary shadow-[0_20px_50px_rgba(255,255,255,0.1)] z-10"
                  : "bg-surface border-border hover:border-primary/50 hover:shadow-elevation"
              )}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-success text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                  Most Popular
                </div>
              )}

              <Typography variant="caption" className={cn("mb-2 font-bold tracking-widest", plan.isPopular ? "text-surface/80" : "text-secondary")}>
                {plan.name}
              </Typography>
              
              <div className="mt-4 flex items-baseline gap-2 mb-2">
                <span className="text-4xl md:text-5xl font-display tracking-tight font-medium flex overflow-hidden h-[1.2em]">
                  {currencySymbol}
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={isYearly ? "yearly" : "monthly"}
                      initial={{ y: isYearly ? 50 : -50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: isYearly ? -50 : 50, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="inline-block"
                    >
                      {isYearly ? plan.yearlyPrice : plan.price}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className={cn("text-sm", plan.isPopular ? "text-surface/70" : "text-muted")}>
                  {plan.period}
                </span>
              </div>
              
              <Typography variant="body" className={cn("mb-8 text-sm", plan.isPopular ? "text-surface/80" : "text-secondary")}>
                {plan.description}
              </Typography>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className={cn("w-5 h-5 shrink-0 mt-0.5", plan.isPopular ? "text-surface" : "text-primary")} />
                    <span className={cn("text-sm", plan.isPopular ? "text-surface/90" : "text-primary/80")}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Link 
                href={plan.href}
                className={cn(
                  buttonVariants({ 
                    variant: plan.isPopular ? "secondary" : "primary", 
                    size: "large" 
                  }), 
                  "w-full",
                  plan.isPopular && "bg-surface text-primary hover:bg-surface/90 border-none"
                )}
              >
                {plan.buttonText}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
