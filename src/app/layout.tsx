import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ayush Lal — Digital Strategy & Creative Execution",
  description: "Premium digital portfolio showcasing marketing strategy, sales execution, and creative direction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${plusJakarta.variable} ${inter.variable} font-body bg-background text-foreground antialiased selection:bg-accent-blue/30 selection:text-white relative`}>
        {/* Global ambient noise overlay for texture */}
        <div className="fixed inset-0 z-50 bg-noise pointer-events-none mix-blend-overlay"></div>
        {children}
      </body>
    </html>
  );
}
