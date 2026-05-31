import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { cn } from "@/lib/utils";
import { StoreProvider } from "@/store/providers";

import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Vipas Energy",
    template: "%s | Vipas Energy",
  },
  description: "Production-ready frontend scaffold for the Vipas Energy admin portal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
