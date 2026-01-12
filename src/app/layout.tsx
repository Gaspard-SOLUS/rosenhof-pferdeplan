import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";
import { Playfair_Display, Inter } from "next/font/google";

const heading = Playfair_Display({ subsets: ["latin"], variable: "--font-heading" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Rosenhof — Pferdeplan",
  description: "Pferdeplan & Zuweisungen",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${heading.variable} ${body.variable}`}>
      <body className="bg-sand text-ink">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
