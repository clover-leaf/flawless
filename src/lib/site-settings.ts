import type { SocialLink } from "@/components/social-links";
import { sanityClient } from "@/lib/sanity.client";
import { siteSettingsQuery } from "@/lib/sanity.queries";

export type SiteSettings = {
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

export const fallbackSettings: SiteSettings = {
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

export async function getSiteSettings(): Promise<SiteSettings> {
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
  } catch (error) {
    console.error("Failed to load site settings", error);
    return fallbackSettings;
  }
}
