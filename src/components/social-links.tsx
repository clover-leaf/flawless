import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type SocialLinksProps = {
  className?: string;
  variant?: "ghost" | "outline";
};

export function SocialLinks({
  className,
  variant = "ghost",
}: SocialLinksProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {siteConfig.socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          aria-label={social.label}
          className={cn(
            buttonVariants({ variant, size: "icon" }),
            "rounded-full border border-border/70 text-muted-foreground hover:border-primary/40 hover:text-foreground",
          )}
        >
          <social.icon className="h-4 w-4" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
