import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  weight: ["300", "400"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sariv | Building what matters",
  description: "Design and build digital products that feel timeless, intentional, and technically exceptional.",
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
      <body className="min-h-full flex flex-col bg-[#f5f5f5] text-[#4e4e4e] font-body">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
