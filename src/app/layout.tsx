import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { AnimatePresence } from "framer-motion";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AppGenie | Dynamic AI App Generator",
  description: "Generate full-stack applications from JSON configurations in seconds.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AppGenie",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} bg-background antialiased selection:bg-emerald-500/30`}>
        <Providers>
          <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
             <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-600/5 rounded-full blur-[120px] animate-float-slow" />
             <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-600/5 rounded-full blur-[120px] animate-float-slow" style={{ animationDelay: '-5s' }} />
             <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-emerald-500/5 rounded-full blur-[100px] animate-pulse-slow" />
          </div>
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </Providers>
      </body>
    </html>
  );
}
