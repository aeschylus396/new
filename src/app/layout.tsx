import type { Metadata, Viewport } from "next";
import "./globals.css";

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
      <body className="font-body bg-cream text-noir antialiased selection:bg-crimson selection:text-white relative">
        {children}
      </body>
    </html>
  );
}
