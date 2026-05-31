import type { Metadata } from "next";
import { Lora, Montserrat } from "next/font/google";

import { cn } from "@/lib/utils";
import { StoreProvider } from "@/store/providers";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vipas Energy",
    template: "%s | Vipas Energy",
  },
  description:
    "Production-ready frontend scaffold for the Vipas Energy admin portal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", montserrat.variable, lora.variable)}
    >
      <body className="bg-background text-foreground min-h-screen antialiased">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
