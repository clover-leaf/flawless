import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Droplets,
  Leaf,
  Sparkles,
  Star,
  Waves,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { GoogleReviews } from "@/components/google-reviews";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sanityClient } from "@/lib/sanity.client";
import {
  blogPostsQuery,
  galleryEntriesQuery,
  homeHeroQuery,
  processStepsQuery,
  servicesQuery,
  testimonialsQuery,
} from "@/lib/sanity.queries";
import { getSiteSettings } from "@/lib/site-settings";

type SanityService = {
  _id: string;
  title: string;
  summary?: string;
  highlights?: string[];
  icon?: string;
};

type SanityProcessStep = {
  _id: string;
  title: string;
  description?: string;
};

type SanityTestimonial = {
  _id: string;
  quote: string;
  customerName: string;
  location?: string;
  serviceTitle?: string;
};

type CloudinaryAsset = {
  secureUrl?: string;
  publicId?: string;
  width?: number;
  height?: number;
};

type SanityGalleryEntry = {
  _id: string;
  title: string;
  location?: string;
  beforeImage?: CloudinaryAsset;
  afterImage?: CloudinaryAsset;
  notes?: string[];
};

type SanityBlogPost = {
  _id: string;
  title: string;
  excerpt?: string;
  category?: string;
  readingTime?: number;
  slug?: { current: string };
};

const container = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";
const iconLibrary: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  droplets: Droplets,
  leaf: Leaf,
};

export const revalidate = 1800; // 30 minutes

async function fetchHomeData() {
  const [hero, services, steps, testimonials, gallery, posts] =
    await Promise.all([
      sanityClient.fetch(homeHeroQuery),
      sanityClient.fetch<SanityService[]>(servicesQuery),
      sanityClient.fetch<SanityProcessStep[]>(processStepsQuery),
      sanityClient.fetch<SanityTestimonial[]>(testimonialsQuery),
      sanityClient.fetch<SanityGalleryEntry[]>(galleryEntriesQuery),
      sanityClient.fetch<SanityBlogPost[]>(blogPostsQuery),
    ]);

  return { hero, services, steps, testimonials, gallery, posts };
}

export default async function Home() {
  const { hero, services, steps, testimonials, gallery, posts } =
    await fetchHomeData();

  const heroContent = hero ?? {
    title: "Austin's freshest carpet cleaning experience.",
    subtitle:
      "Eco-friendly chemistry, gallery-worthy results, and real humans who care for every fiber in your home.",
    serviceAreas: ["Austin", "Round Rock", "Cedar Park"],
    primaryCtaLabel: "Book a visit",
    primaryCtaHref: "#contact",
    secondaryCtaLabel: "View gallery",
    secondaryCtaHref: "/gallery",
  };

  const heroBadge = heroContent.serviceAreas?.join(" · ");
  const servicesToRender = services?.length
    ? services
    : [
        {
          _id: "fallback-service",
          title: "Whole-home steam cleaning",
          summary:
            "Deep extraction cleaning with pH-balanced rinse for living rooms, bedrooms, and hallways.",
          highlights: ["Traffic lane removal", "Fabric protectant", "Fast dry"],
          icon: "sparkles",
        },
      ];

  const testimonialsToRender = testimonials?.length
    ? testimonials
    : [
        {
          _id: "testimonial-1",
          quote:
            "They removed three-year-old pet stains and left our home smelling neutral, not perfumey.",
          customerName: "Vanessa Ortiz",
          location: "South Austin",
          serviceTitle: "Pet treatment + carpet refresh",
        },
      ];

  const galleryToRender = gallery?.length
    ? gallery.slice(0, 3)
    : [
        {
          _id: "gallery-1",
          title: "Modern living room",
          location: "Austin",
          afterImage: {
            secureUrl:
              "https://res.cloudinary.com/djzvgtp09/image/upload/v1764061913/flawless/gallery/pzmumvwfwznja8kuf1m4.jpg",
          },
          notes: ["Removed staining and restored bright neutrals."],
        },
      ];

  return (
    <div className="space-y-24 py-12 lg:py-16">
      <section
        className={`${container} grid gap-10 lg:grid-cols-[1.1fr_0.9fr]`}
      >
        <div className="space-y-8">
          <Badge className="rounded-full bg-primary/10 text-primary">
            {heroBadge || "Austin · Round Rock · Cedar Park"}
          </Badge>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {heroContent.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {heroContent.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="rounded-full">
              <a
                href={heroContent.primaryCtaHref ?? "#contact"}
                className="flex items-center gap-2"
              >
                {heroContent.primaryCtaLabel ?? "Book a visit"}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-dashed"
            >
              <Link
                href={heroContent.secondaryCtaHref ?? "/gallery"}
                className="flex items-center gap-2"
              >
                {heroContent.secondaryCtaLabel ?? "View gallery"}
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
        <ContactForm/>
      </section>

      <div className={container}>
        <GoogleReviews />
      </div>

      <section className={container} aria-labelledby="services-heading">
        <div className="mb-10 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline">Services</Badge>
            <p className="text-sm uppercase tracking-wide text-muted-foreground">
              Every fiber · Every room
            </p>
          </div>
          <div className="space-y-3">
            <h2 id="services-heading" className="text-3xl font-semibold">
              Elevated cleaning plans built for busy Gold Coast households.
            </h2>
            <p className="text-muted-foreground">
              Choose a one-time refresh or join our maintenance schedule for
              quarterly visits with locked-in pricing.
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicesToRender.map((service) => {
            const iconKey = service.icon as keyof typeof iconLibrary;
            const Icon = iconLibrary[iconKey] ?? Sparkles;
            return (
              <Card key={service._id} className="h-full">
                <CardHeader>
                  <Icon className="h-10 w-10 rounded-2xl bg-primary/10 p-2 text-primary" />
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.summary}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {service.highlights?.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Star className="h-3.5 w-3.5 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className={container} aria-labelledby="gallery-heading">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 id="gallery-heading" className="text-3xl font-semibold">
              Gallery highlights
            </h2>
            <p className="text-muted-foreground">
              Swipe-worthy before and afters captured on every job.
            </p>
          </div>
          <Button asChild variant="secondary" className="rounded-full">
            <Link href="/gallery" className="flex items-center gap-2">
              Explore full gallery
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {galleryToRender.map((item) => (
            <Card key={item._id} className="overflow-hidden">
              <Image
                src={
                  item.afterImage?.secureUrl ??
                  "https://res.cloudinary.com/djzvgtp09/image/upload/v1764061913/flawless/gallery/pzmumvwfwznja8kuf1m4.jpg"
                }
                alt={item.title}
                width={600}
                height={500}
                className="h-52 w-full object-cover"
              />
              <CardContent className="space-y-2 py-6">
                <p className="text-sm uppercase tracking-wide text-muted-foreground">
                  {item.location}
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {item.title}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className={container} aria-labelledby="testimonials-heading">
        <div className="mb-8">
          <h2 id="testimonials-heading" className="text-3xl font-semibold">
            Trusted by Gold Coast homeowners.
          </h2>
          <p className="text-muted-foreground">
            See why locals keep our number pinned on the fridge.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonialsToRender.map((testimonial) => (
            <Card key={testimonial._id} className="h-full bg-card/80">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {testimonial.serviceTitle ?? "Carpet Refresh"}
                </CardTitle>
                <CardDescription>
                  {testimonial.customerName} · {testimonial.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-base text-muted-foreground">
                  “{testimonial.quote}”
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
