import { Facebook, Instagram, Twitter } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const iconMap = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
} as const;

export type SocialLink = {
  label?: string;
  platform?: keyof typeof iconMap;
  url?: string;
  enabled?: boolean;
};

type SocialLinksProps = {
  className?: string;
  variant?: "ghost" | "outline";
  links?: SocialLink[];
};

export function SocialLinks({
  className,
  variant = "ghost",
  links = [],
}: SocialLinksProps) {
  const filtered = links.filter(
    (link) => link.enabled !== false && Boolean(link.url),
  );

  if (!filtered.length) {
    return null;
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {filtered.map((social) => {
        const Icon =
          (social.platform && iconMap[social.platform]) || iconMap.facebook;
        return (
          <a
            key={`${social.platform}-${social.url}`}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label ?? social.platform}
            className={cn(
              buttonVariants({ variant, size: "icon" }),
              "rounded-full border border-border/70 text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}
