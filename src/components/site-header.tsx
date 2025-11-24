import { PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SocialLinks } from "@/components/social-links";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur supports-[backdrop-filter]:backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/flawless-logo.jpg"
            alt={`${siteConfig.name} logo`}
            width={60}
            height={60}
            className="h-12 w-auto rounded-full border border-border/50 bg-card object-cover"
            priority
          />
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight">
              {siteConfig.name}
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              Family operated · Est. 2016
            </span>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex">
            <SocialLinks />
          </div>
          <div className="hidden flex-col text-right text-xs font-medium leading-tight text-muted-foreground sm:flex">
            <span>Call or text</span>
            <a className="text-foreground" href="tel:15125550130">
              (512) 555-0130
            </a>
          </div>
          <Link
            href="tel:15125550130"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "gap-2 rounded-full",
            )}
          >
            <PhoneCall className="h-4 w-4" aria-hidden="true" />
            Call now
          </Link>
        </div>
      </div>
      <nav className="flex flex-wrap items-center gap-4 border-t border-border/50 px-4 py-2 text-sm text-muted-foreground md:hidden">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-transparent px-3 py-1 transition hover:border-border hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-border/50 px-4 py-3 md:hidden">
        <SocialLinks />
      </div>
    </header>
  );
}
