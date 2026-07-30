import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { ToastProvider, ToastViewport } from "@/components/ui/Toast";
import { AppChrome } from "@/components/AppChrome";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const displayFont = Instrument_Serif({
  variable: "--font-display",
  weight: ["400"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sariv-web.vercel.app"),
  title: "SARIV | Building what matters",
  description: "We design and build digital products that feel timeless, intentional, and technically exceptional.",
  openGraph: {
    title: "SARIV | Building what matters",
    description: "We design and build digital products that feel timeless, intentional, and technically exceptional.",
    url: "https://sariv-web.vercel.app",
    siteName: "SARIV",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SARIV | Building what matters",
    description: "We design and build digital products that feel timeless, intentional, and technically exceptional.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "7iwDBZLTof0WGJjnX81RqcTC_aJ7YArUfYsfUF8so5M",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
        lang="en"
        className={`${displayFont.variable} ${inter.variable} h-full antialiased`}
        suppressHydrationWarning
      >
        <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://sariv-web.vercel.app/#website",
                  "url": "https://sariv-web.vercel.app/",
                  "name": "SARIV",
                  "description": "We design and build digital products that feel timeless, intentional, and technically exceptional.",
                },
                {
                  "@type": "Organization",
                  "@id": "https://sariv-web.vercel.app/#organization",
                  "name": "SARIV",
                  "url": "https://sariv-web.vercel.app/",
                  "logo": "https://sariv-web.vercel.app/icon.png",
                  "sameAs": [
                    "https://x.com/officialsariv",
                    "https://linkedin.com/company/sariv",
                    "https://www.instagram.com/hellosariv/"
                  ]
                }
              ]
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-primary font-body transition-colors duration-300">
        <ToastProvider>
          <AppChrome>{children}</AppChrome>
          <ToastViewport />
        </ToastProvider>
        <Analytics />
      </body>
    </html>
  );
}
