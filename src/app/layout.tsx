import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteSettings } from "@/lib/site-settings";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flawlesscarpetcleaning.com"),
  title: {
    default: "Flawless Carpet Cleaning | Modern Carpet Care in Gold Coast",
    template: "%s | Flawless Carpet Cleaning",
  },
  description:
    "Flawless Carpet Cleaning delivers eco-friendly carpet, rug, and upholstery cleaning across Gold Coast with same-week appointments and gallery-proof results.",
  openGraph: {
    title: "Flawless Carpet Cleaning | Modern Carpet Care in Gold Coast",
    description:
      "Premium carpet and upholstery cleaning powered by modern equipment, protective treatments, and photo-documented results.",
    url: "https://flawlesscarpetcleaning.com",
    siteName: "Flawless Carpet Cleaning",
    images: [
      {
        url: "https://res.cloudinary.com/djzvgtp09/image/upload/v1764061940/flawless/gallery/j6ppscfrxrwh68hrdq4h.jpg",
        width: 1200,
        height: 630,
        alt: "Technician cleaning carpet with modern equipment",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export const revalidate = 1800;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-background via-background to-muted/60">
          <SiteHeader
            siteName={settings.title}
            tagline={settings.tagline}
            phone={settings.phone}
            socialLinks={settings.socialLinks}
            showSocials={settings.showSocials}
          />
          <main className="flex-1">{children}</main>
          <SiteFooter
            siteName={settings.title}
            address={settings.address}
            hours={settings.hours}
            email={settings.email}
            serviceAreas={settings.serviceAreas}
            socialLinks={settings.socialLinks}
            showSocials={settings.showSocials}
          />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
