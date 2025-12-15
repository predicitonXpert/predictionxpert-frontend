import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CookieBanner } from "@/components/layout/CookieBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGroteskBold = localFont({
  src: "../public/typo/SpaceGrotesk-Bold.ttf",
  variable: "--font-space-grotesk-bold",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PredictionXpert",
  description: "PredictionXpert Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGroteskBold.variable} antialiased`}
      >
        <AuthProvider>
          <LanguageProvider>
            {children}
            <CookieBanner />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
