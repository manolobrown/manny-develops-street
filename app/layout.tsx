import type { Metadata } from "next";
import { Newsreader, Manrope, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://mannydevelops.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "Manuel Peña — Photography", template: "%s · Manuel Peña" },
  description: "New York street & documentary photography, portraits, and Saturday workshops.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Manuel Peña",
    title: "Manuel Peña — Photography",
    description: "New York street & documentary photography, portraits, and Saturday workshops.",
  },
  twitter: { card: "summary_large_image", title: "Manuel Peña — Photography" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
