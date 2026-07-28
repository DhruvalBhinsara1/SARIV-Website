import type { Metadata } from "next";
import AdminLayoutWrapper from "@/components/admin/layout/AdminLayoutWrapper";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
