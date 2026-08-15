"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  MapPin, 
  CheckCircle2, 
  Trophy, 
  Languages, 
  Layers, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from "lucide-react";

interface FeatureTab {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  image: string;
  bullets: { title: string; desc: string }[];
  tag: string;
}

const TABS: FeatureTab[] = [
  {
    id: "ai-capture",
    label: "Multimodal AI Assistant",
    title: "Instant Dual-Mode Grievance Reporting",
    subtitle: "Citizens can report by snapping a quick photo or having a voice conversation in their mother tongue.",
    icon: Bot,
    image: "/civicos-mobile-ai.png",
    tag: "Mobile OS · AI Engine",
    bullets: [
      {
        title: "10 Indian Regional Languages",
        desc: "Native voice recognition and natural speech synthesis for Hindi, Gujarati, Marathi, Bengali, Tamil, Telugu, Kannada, Malayalam, Punjabi, and English.",
      },
      {
        title: "Multimodal Issue Triage",
        desc: "Llama-3 Vision and Groq inspect uploaded photos to extract severity, road hazards, streetlights, or sanitation categories in under 400ms.",
      },
      {
        title: "Draft Persistence & Undo Buffer",
        desc: "Never lose typed complaints or staged photos on accidental navigation, with 5-second one-tap undo capability.",
      },
    ],
  },
  {
    id: "command-map",
    label: "Command Map & GIS",
    title: "Real-Time Spatial Clustering & SLA Escalations",
    subtitle: "Municipal departments gain bird's-eye visibility across all wards with automated spatial deduplication.",
    icon: MapPin,
    image: "/civicos-dashboard.png",
    tag: "Web Command Portal",
    bullets: [
      {
        title: "Spatial Radius Deduplication",
        desc: "PostGIS clusters issues within 50 meters, merging dozens of pothole reports into a single consolidated high-priority dispatch ticket.",
      },
      {
        title: "Live Heatmap Density",
        desc: "Dynamic color-graded heatmaps reveal recurring infrastructure failures before citizen frustration peaks.",
      },
      {
        title: "Automated Officer Routing",
        desc: "Smart dispatch assigns tickets to on-duty ward engineers based on geographic proximity and department specialization.",
      },
    ],
  },
  {
    id: "resolution-proof",
    label: "Resolution Proof Engine",
    title: "Verifiable Before-and-After Accountability",
    subtitle: "Eliminating ghost resolutions with geo-fenced photographic evidence and citizen confirmation.",
    icon: CheckCircle2,
    image: "/civicos-resolution.png",
    tag: "Field Officer App",
    bullets: [
      {
        title: "Before / After Slider Comparison",
        desc: "Interactive visual proof comparing the initial grievance photo with the completed repair photo.",
      },
      {
        title: "GPS & EXIF Verification",
        desc: "Resolution photos must be captured on-site within the verified grievance geofence to prevent fraudulent closures.",
      },
      {
        title: "Citizen Feedback Loop",
        desc: "The original complainant gets immediate notification and 48 hours to confirm satisfaction or reopen the ticket.",
      },
    ],
  },
  {
    id: "gamification",
    label: "Rewards & Community",
    title: "Gamified Citizen Engagement & Civic Points",
    subtitle: "Turning civic participation into a positive-sum game through rewards, streaks, and community cleanups.",
    icon: Trophy,
    image: "/civicos-analytics.png",
    tag: "Citizen Engagement",
    bullets: [
      {
        title: "Civic Points & Streaks",
        desc: "Citizens earn points (+10 for valid report, +25 for verifying repairs) and unlock Pioneer, Guardian, Champion, and Legend tiers.",
      },
      {
        title: "Community Cleanup Drives",
        desc: "Neighborhood volunteer events mobilize citizens and local youth for weekend neighborhood rejuvenation.",
      },
      {
        title: "Defensive Leaderboards",
        desc: "Resilient real-time ward rankings with privacy-preserving aliases and localized badge achievements.",
      },
    ],
  },
];

export function CivicOSInteractiveShowcase() {
  const [activeTabId, setActiveTabId] = useState<string>("ai-capture");
  const activeTab = TABS.find((t) => t.id === activeTabId) || TABS[0];
  const IconComponent = activeTab.icon;

  return (
    <div className="w-full flex flex-col gap-10">
      {/* Tab Navigation Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-border/60">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTabId;
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-mono text-[11px] md:text-xs tracking-wider uppercase transition-all duration-200 whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-primary text-background font-semibold shadow-md shadow-primary/20"
                  : "bg-surface-elevated text-secondary hover:text-primary hover:bg-surface-elevated/80 border border-border/40"
              }`}
            >
              <TabIcon className={`w-4 h-4 ${isActive ? "text-background" : "text-secondary"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Body */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center"
        >
          {/* Left Narrative Column */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary font-bold block mb-2">
                {activeTab.tag}
              </span>
              <h3 className="font-display font-normal text-primary text-2xl md:text-3xl lg:text-4xl leading-tight">
                {activeTab.title}
              </h3>
              <p className="font-body text-secondary text-base md:text-lg leading-relaxed mt-3">
                {activeTab.subtitle}
              </p>
            </div>

            {/* Bullets List */}
            <div className="flex flex-col gap-4 border-t border-border/60 pt-6">
              {activeTab.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-display text-primary text-base font-medium">
                      {bullet.title}
                    </h4>
                    <p className="font-body text-secondary text-sm leading-relaxed mt-0.5">
                      {bullet.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual / Mockup Column */}
          <div className="lg:col-span-6">
            <div className="relative w-full rounded-2xl overflow-hidden border border-border bg-surface-elevated p-2 md:p-3 shadow-elevation group">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#0A0A0E] border border-border/40">
                <Image
                  src={activeTab.image}
                  alt={activeTab.title}
                  fill
                  className="object-contain p-2 md:p-4 group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
