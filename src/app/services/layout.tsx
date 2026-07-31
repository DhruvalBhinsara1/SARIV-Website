import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | SARIV",
  description:
    "Premium software engineering services — digital platforms, custom products, and platform modernization. Outcome-driven engineering that solves real business problems.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
