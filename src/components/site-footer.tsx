import { Clock, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { SocialLinks } from "@/components/social-links";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";

const serviceAreas = [
  "Central Austin",
  "Round Rock",
  "Cedar Park",
  "Westlake",
  "Buda & Kyle",
  "Georgetown",
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="text-xl font-semibold">{siteConfig.name}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Family-operated technicians delivering spotless carpets, rugs, and
            upholstery powered by eco-safe chemistry and modern extraction
            equipment.
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Austin & surrounding suburbs
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" aria-hidden="true" />
              Monday–Saturday · 7a–7p
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" aria-hidden="true" />
              <a href="mailto:hello@flawlesscarpet.com">
                hello@flawlesscarpet.com
              </a>
            </div>
          </div>
          <SocialLinks className="mt-5" variant="outline" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Quick links
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-foreground">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-foreground">
                Blog
              </Link>
            </li>
            <li>
              <a href="/#contact" className="hover:text-foreground">
                Request service
              </a>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-foreground">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Service areas
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            {serviceAreas.map((area) => (
              <span key={area}>{area}</span>
            ))}
          </div>
        </div>
      </div>
      <Separator className="bg-border/70" />
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <p>Fully insured · IICRC certified.</p>
      </div>
    </footer>
  );
}
