import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToastProvider, ToastViewport } from "@/components/ui/Toast";
import { SmoothScrolling } from "@/components/SmoothScrolling";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://sariv.systems"),
  title: "SARIV | Building what matters",
  description: "We design and build digital products that feel timeless, intentional, and technically exceptional.",
  openGraph: {
    title: "SARIV | Building what matters",
    description: "We design and build digital products that feel timeless, intentional, and technically exceptional.",
    url: "https://sariv.systems",
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
      <body className="min-h-full flex flex-col bg-background text-primary font-body">
        <ToastProvider>
          <SmoothScrolling>
            <Header />
            {children}
            <Footer />
          </SmoothScrolling>
          <ToastViewport />
        </ToastProvider>
      </body>
    </html>
  );
}
