import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { SocialLink } from "@/components/social-links";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { sanityClient } from "@/lib/sanity.client";
import { siteSettingsQuery } from "@/lib/sanity.queries";

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
    default: "Flawless Carpet Cleaning | Modern Carpet Care in Austin",
    template: "%s | Flawless Carpet Cleaning",
  },
  description:
    "Flawless Carpet Cleaning delivers eco-friendly carpet, rug, and upholstery cleaning across Austin with same-week appointments and gallery-proof results.",
  openGraph: {
    title: "Flawless Carpet Cleaning | Modern Carpet Care in Austin",
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

type SiteSettings = {
  title: string;
  tagline?: string;
  phone?: string;
  email?: string;
  address?: string;
  hours?: string;
  serviceAreas?: string[];
  showSocials?: boolean;
  socialLinks?: SocialLink[];
};

const fallbackSettings: SiteSettings = {
  title: "Flawless Carpet Cleaning",
  tagline: "Family operated · Est. 2016",
  phone: "(512) 555-0130",
  email: "hello@flawlesscarpet.com",
  address: "Austin & surrounding suburbs",
  hours: "Monday–Saturday · 7a–7p",
  serviceAreas: [
    "Central Austin",
    "Round Rock",
    "Cedar Park",
    "Westlake",
    "Buda & Kyle",
    "Georgetown",
  ],
  showSocials: true,
  socialLinks: [
    {
      label: "Facebook",
      platform: "facebook",
      url: "https://facebook.com/flawlesscarpetcleaning",
      enabled: true,
    },
    {
      label: "Instagram",
      platform: "instagram",
      url: "https://instagram.com/flawlesscarpetcleaning",
      enabled: true,
    },
    {
      label: "Twitter",
      platform: "twitter",
      url: "https://twitter.com/flawlesscarpet",
      enabled: true,
    },
  ],
};

async function getSiteSettings() {
  try {
    const result = await sanityClient.fetch<SiteSettings | null>(
      siteSettingsQuery,
    );
    if (!result) return fallbackSettings;
    return {
      ...fallbackSettings,
      ...result,
      serviceAreas: result.serviceAreas?.length
        ? result.serviceAreas
        : fallbackSettings.serviceAreas,
      socialLinks: result.socialLinks ?? fallbackSettings.socialLinks,
      showSocials:
        typeof result.showSocials === "boolean"
          ? result.showSocials
          : fallbackSettings.showSocials,
    };
  } catch {
    return fallbackSettings;
  }
}

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
