import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LenisProvider, AnimationProvider } from "@/providers";
import { NoiseOverlay, GlobalParticleBackground, PageTransition } from "@/components";
import "./globals.css";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: { default: "Muhammad Measm", template: "%s | Muhammad Measm" },
  description: "A premium digital presence.",
  openGraph: {
    title: "Measm",
    description: "A premium digital presence.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth-enabled" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/bgpi.png" as="image" fetchPriority="high" />
      </head>
      <body className={`${inter.variable} antialiased font-sans`}>
        <LenisProvider>
          <AnimationProvider>
            <GlobalParticleBackground />
            <GlobalHeader />
            <NoiseOverlay />
            <PageTransition>
              <div className="page-content relative z-[1]">{children}</div>
            </PageTransition>
            <GlobalFooter />
          </AnimationProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
