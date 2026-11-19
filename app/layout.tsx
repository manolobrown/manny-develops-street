import type { Metadata } from "next";
import { Fraunces, Archivo, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";
import { SITE } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";
import { ConsentedAnalytics } from "@/components/analytics/Analytics";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

// Archivo is variable — omitting `weight` ships the full 100–900 axis.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "Manuel Peña — Street Photography", template: "%s · Manuel Peña" },
  description: "New York street photography — six ongoing series, an annual zine, prints and presets from the street.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Manuel Peña",
    title: "Manuel Peña — Street Photography",
    description: "New York street photography — six ongoing series, an annual zine, prints and presets from the street.",
  },
  twitter: { card: "summary_large_image", title: "Manuel Peña — Street Photography" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${archivo.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          {children}
          <ConsentedAnalytics />
        </ThemeProvider>
        {/* Cookieless, so it needs no consent. */}
        <Analytics />
      </body>
    </html>
  );
}
