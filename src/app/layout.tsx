import type { Metadata } from "next";
import "./globals.css";
import { haskoy } from "@/lib/fonts";
import GlobalProvider from "@/components/providers/GlobalProvider";

export const metadata: Metadata = {
  title: "WFH Attendance System | Dexa Group",
  description:
    "A web-based employee attendance system for managing WFH check-ins, including photo verification and real-time monitoring.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${haskoy.variable} antialiased`}>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
