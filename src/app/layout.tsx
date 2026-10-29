import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

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

export const viewport: Viewport = {
  themeColor: "#F20D3A",
};

export const metadata: Metadata = {
  title: "Ayush Lal — Digital Strategy & Creative Execution",
  description: "Editorial portfolio of Ayush Lal: Digital Marketing, Sales Strategy, and Creative Direction.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ayush Lal",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${bebasNeue.variable} ${plusJakarta.variable} ${inter.variable} font-body bg-cream text-noir antialiased selection:bg-crimson selection:text-white relative`}>
        {children}
      </body>
    </html>
  );
}
