import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { LenisProvider, AnimationProvider, ThemeProvider } from "@/providers";
import { NoiseOverlay, GlobalParticleBackground, PageTransition, GlobalHeader, GlobalFooter, CustomCursor } from "@/components";
import "./globals.css";

const THEME_INIT_SCRIPT = `(function(){var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t=window.matchMedia('(prefers-color-scheme:light)').matches?'light':'dark';document.documentElement.setAttribute('data-theme',t);document.documentElement.classList.add(t);})();`;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: { default: "Mesam", template: "%s | Mesam" },
  description: "A premium digital presence.",
  openGraph: {
    title: "Mesam",
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
    <html lang="en" className="scroll-smooth-enabled dark" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/bgpi.png" as="image" fetchPriority="high" />
      </head>
      <body className={`${inter.variable} antialiased font-sans`}>
        <Script id="theme-init" strategy="afterInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <ThemeProvider>
          <LenisProvider>
            <AnimationProvider>
              <GlobalParticleBackground />
              <CustomCursor />
              <GlobalHeader />
              <NoiseOverlay />
              <PageTransition>
                <div className="page-content relative z-[1]">{children}</div>
              </PageTransition>
              <GlobalFooter />
            </AnimationProvider>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
