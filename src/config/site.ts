import type { LucideIcon } from "lucide-react";
import { Facebook, Instagram, Twitter } from "lucide-react";

type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const siteConfig = {
  name: "Flawless Carpet Cleaning",
  socialLinks: [
    {
      label: "Facebook",
      href: "https://facebook.com/flawlesscarpetcleaning",
      icon: Facebook,
    },
    {
      label: "Instagram",
      href: "https://instagram.com/flawlesscarpetcleaning",
      icon: Instagram,
    },
    {
      label: "Twitter",
      href: "https://twitter.com/flawlesscarpet",
      icon: Twitter,
    },
  ] satisfies SocialLink[],
};
