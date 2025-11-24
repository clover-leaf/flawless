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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const stats = [
  { label: "Homes refreshed", value: "2,400+" },
  { label: "Average rating", value: "4.9 / 5" },
  { label: "Dry time", value: "In 4 hours" },
  { label: "Eco-safe products", value: "100%" },
];

const services = [
  {
    title: "Whole-home steam cleaning",
    description:
      "Deep extraction cleaning with pH-balanced rinse for living rooms, bedrooms, and hallways.",
    highlights: ["Traffic lane removal", "Fabric protectant", "Fast dry"],
    icon: Sparkles,
  },
  {
    title: "Upholstery & area rugs",
    description:
      "Low-moisture tools restore sofas, sectionals, and delicate wool rugs without overwetting.",
    highlights: ["Hand groomed fibers", "Neutralizing rinse", "Pet-odor safe"],
    icon: Droplets,
  },
  {
    title: "Pet treatment & stain rescue",
    description:
      "UV inspection, enzyme flush, and deodorizing fog to permanently neutralize pet accidents.",
    highlights: [
      "Sub-surface extraction",
      "Targeted enzymes",
      "Air scrub add-on",
    ],
    icon: Leaf,
  },
];

const steps = [
  {
    title: "Request a quote",
    detail: "Share square footage, fiber type, and any pet or stain notes.",
  },
  {
    title: "Technician dispatch",
    detail:
      "Uniformed IICRC tech arrives on time with truck-mounted equipment.",
  },
  {
    title: "Flawless finish",
    detail:
      "We protect corners, groom fibers, and send you a gallery recap before we leave.",
  },
];

const testimonials = [
  {
    quote:
      "They removed three-year-old pet stains and left our home smelling neutral, not perfumey. The follow-up gallery was perfect for documenting our move-out.",
    name: "Vanessa Ortiz",
    location: "South Austin",
    service: "Pet treatment + carpet refresh",
  },
  {
    quote:
      "Never had faster dry times. We booked the maintenance plan and love the consistent crew and reminders.",
    name: "Marcus & Janelle",
    location: "Round Rock",
    service: "Quarterly steam cleaning",
  },
];

const galleryHighlights = [
  {
    id: 1,
    area: "Modern living room",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
    result: "Removed red wine staining and restored bright neutrals.",
  },
  {
    id: 2,
    area: "High-rise bedroom",
    image:
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=900&q=80",
    result: "Low-profile wool rug refreshed with fiber-safe rinse.",
  },
  {
    id: 3,
    area: "Family media room",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80",
    result: "Pet odor neutralized and guard applied to seating area.",
  },
];

const blogHighlights = [
  {
    title: "How to prep your carpets before the crew arrives",
    description:
      "A 15-minute checklist to help us clean faster and protect your belongings.",
    readingTime: "5 min read",
  },
  {
    title: "Understanding dry times and HVAC best practices",
    description:
      "Tips to circulate air, protect fibers, and keep humidity in check after a service.",
    readingTime: "6 min read",
  },
  {
    title: "Choosing between steam and low-moisture cleaning",
    description:
      "We break down when each method is best for your carpet type or rug construction.",
    readingTime: "8 min read",
  },
];

const faqs = [
  {
    question: "How soon can you schedule service?",
    answer:
      "Most appointments are available within 2–3 business days. Emergency pet treatments often open up same-day slots.",
  },
  {
    question: "Do you move furniture?",
    answer:
      "We carefully move light pieces like chairs, nightstands, and end tables, then place protective tabs underneath. Large items can be cleaned around on request.",
  },
  {
    question: "Is everything safe for kids and pets?",
    answer:
      "Yes. We stock plant-based solutions, rinse to neutral pH, and leave a post-cleaning card detailing what was used in each room.",
  },
];

const container = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";

export default function Home() {
  return (
    <div className="space-y-24 py-12 lg:py-16">
      <section
        className={`${container} grid gap-10 lg:grid-cols-[1.1fr_0.9fr]`}
      >
        <div className="space-y-8">
          <Badge className="rounded-full bg-primary/10 text-primary">
            Austin · Round Rock · Cedar Park
          </Badge>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Austin&apos;s freshest carpet cleaning experience.
            </h1>
            <p className="text-lg text-muted-foreground">
              Eco-friendly chemistry, gallery-worthy results, and real humans
              who care for every fiber in your home.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="rounded-full">
              <a href="#contact" className="flex items-center gap-2">
                Book a visit
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-dashed"
            >
              <Link href="/gallery" className="flex items-center gap-2">
                View gallery
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
            <div className="rounded-2xl border border-dashed bg-card/50 p-4">
              <p className="font-medium text-foreground">Same-week routes</p>
              <p>Morning + afternoon arrivals, Saturday slots by request.</p>
            </div>
            <div className="rounded-2xl border border-dashed bg-card/50 p-4">
              <p className="font-medium text-foreground">Photo recap</p>
              <p>Receive before/after documentation in your inbox.</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border bg-card/70 p-6 shadow-lg shadow-primary/10">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase text-muted-foreground">
              Featured project
            </p>
            <div className="overflow-hidden rounded-2xl">
              <Image
                src={galleryHighlights[0].image}
                alt={galleryHighlights[0].area}
                width={800}
                height={600}
                className="h-64 w-full object-cover"
                priority
              />
            </div>
            <p className="text-lg font-semibold">{galleryHighlights[0].area}</p>
            <p className="text-sm text-muted-foreground">
              {galleryHighlights[0].result}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Waves className="h-4 w-4" aria-hidden="true" />
              Hot-water extraction · Fiber protectant · HEPA air scrub
            </div>
          </div>
        </div>
      </section>

      <section className={container} aria-label="Service metrics">
        <div className="grid gap-4 rounded-3xl border bg-card/70 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <p className="text-3xl font-semibold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

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
              Elevated cleaning plans built for busy Austin households.
            </h2>
            <p className="text-muted-foreground">
              Choose a one-time refresh or join our maintenance schedule for
              quarterly visits with locked-in pricing.
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="h-full">
              <CardHeader>
                <service.icon className="h-10 w-10 rounded-2xl bg-primary/10 p-2 text-primary" />
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {service.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Star className="h-3.5 w-3.5 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className={container} aria-labelledby="process-heading">
        <div className="mb-8 flex flex-col gap-3">
          <h2 id="process-heading" className="text-3xl font-semibold">
            A spotless process from booking to post-cleaning care.
          </h2>
          <p className="text-muted-foreground">
            Transparent communication, uniformed crews, and everything measured
            twice so your home feels new again.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-3xl border bg-card/70 p-6 shadow-sm"
            >
              <div className="text-sm font-semibold text-primary">
                Step {String(index + 1).padStart(2, "0")}
              </div>
              <p className="mt-2 text-lg font-semibold">{step.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {step.detail}
              </p>
            </div>
          ))}
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
          {galleryHighlights.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <Image
                src={item.image}
                alt={item.area}
                width={600}
                height={500}
                className="h-52 w-full object-cover"
              />
              <CardContent className="space-y-2 py-6">
                <p className="text-sm uppercase tracking-wide text-muted-foreground">
                  {item.area}
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {item.result}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className={container} aria-labelledby="testimonials-heading">
        <div className="mb-8">
          <h2 id="testimonials-heading" className="text-3xl font-semibold">
            Trusted by Austin homeowners.
          </h2>
          <p className="text-muted-foreground">
            See why locals keep our number pinned on the fridge.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="h-full bg-card/80">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {testimonial.service}
                </CardTitle>
                <CardDescription>
                  {testimonial.name} · {testimonial.location}
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

      <section
        id="contact"
        className={`${container} grid gap-10 lg:grid-cols-[1.1fr_0.9fr]`}
        aria-labelledby="contact-heading"
      >
        <div className="space-y-4">
          <h2 id="contact-heading" className="text-3xl font-semibold">
            Let&apos;s restore your carpets, rugs, and upholstery.
          </h2>
          <p className="text-muted-foreground">
            Share a few details and we&apos;ll confirm your time within one
            business day. Prefer to talk? Call or text{" "}
            <a className="font-medium text-foreground" href="tel:15125550130">
              (512) 555-0130
            </a>
            .
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border bg-card/60 p-5">
              <p className="text-sm uppercase tracking-wide text-muted-foreground">
                Coverage
              </p>
              <p className="text-lg font-semibold">Austin metro + suburbs</p>
            </div>
            <div className="rounded-3xl border bg-card/60 p-5">
              <p className="text-sm uppercase tracking-wide text-muted-foreground">
                Hours
              </p>
              <p className="text-lg font-semibold">
                Mon–Sat · First routes @ 8:00a
              </p>
            </div>
          </div>
        </div>
        <div>
          <ContactForm />
          <div className="mt-6 space-y-4 rounded-3xl border bg-muted/50 p-5 text-sm text-muted-foreground">
            {faqs.map((faq) => (
              <details key={faq.question} className="group">
                <summary className="cursor-pointer list-none font-medium text-foreground">
                  {faq.question}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={container} aria-labelledby="blog-heading">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h2 id="blog-heading" className="text-3xl font-semibold">
              Latest tips from the van
            </h2>
            <p className="text-muted-foreground">
              Short reads from our technicians to keep your floors looking new.
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden md:flex">
            <Link href="/blog" className="gap-2">
              Browse blog
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {blogHighlights.map((post) => (
            <Card
              key={post.title}
              className="h-full border-dashed bg-card/70 transition hover:border-primary/50"
            >
              <CardHeader>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{post.readingTime}</span>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1 text-primary"
                >
                  Read post <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
