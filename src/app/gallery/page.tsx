import Link from "next/link";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const galleryEntries = [
  {
    id: 1,
    title: "Townhome living room",
    location: "Mueller · Austin",
    service: "Whole-home steam cleaning",
    beforeImage:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    notes: [
      "Removed traffic lane soil",
      "Applied fiber guard",
      "Dry time: 3 hours",
    ],
  },
  {
    id: 2,
    title: "Pet-friendly den",
    location: "Round Rock",
    service: "Pet enzyme flush",
    beforeImage:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    notes: [
      "UV detection for hidden spots",
      "Sub-surface extraction",
      "Ozone shock treatment",
    ],
  },
  {
    id: 3,
    title: "Luxury condo bedroom",
    location: "Downtown Austin",
    service: "Low-moisture wool care",
    beforeImage:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1200&q=80",
    notes: ["Hand grooming", "pH balanced rinse", "Humidity control setup"],
  },
  {
    id: 4,
    title: "Family media room",
    location: "Cedar Park",
    service: "Quarterly maintenance plan",
    beforeImage:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
    notes: ["Deodorizing fog", "Spot dye repair", "Protective tabs placed"],
  },
  {
    id: 5,
    title: "Staircase runner",
    location: "Steiner Ranch",
    service: "Encapsulation + guard",
    beforeImage:
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
    notes: [
      "Hand detail work",
      "Slip resistant finish",
      "Dry time: 90 minutes",
    ],
  },
  {
    id: 6,
    title: "Nursery & play area",
    location: "Buda",
    service: "Hypoallergenic package",
    beforeImage:
      "https://images.unsplash.com/photo-1462212210333-335063b676d2?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
    notes: ["Citrus-based cleaner", "Sanitizing mist", "HEPA air scrubber"],
  },
];

const container = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";

export default function GalleryPage() {
  return (
    <div className="space-y-16 py-12">
      <section className={`${container} space-y-6`}>
        <Badge className="w-fit rounded-full bg-primary/10 text-primary">
          Results that speak for themselves
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Before and after snaps from recent routes.
        </h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Every service concludes with a quick gallery recap so you can see the
          fiber turnaround, document move-outs, or share with property managers.
        </p>
        <Button asChild className="rounded-full">
          <a href="/#contact">Book your own transformation</a>
        </Button>
      </section>
      <section className={container}>
        <div className="grid gap-8 md:grid-cols-2">
          {galleryEntries.map((entry) => (
            <Card key={entry.id} className="overflow-hidden border-border/70">
              <BeforeAfterSlider
                beforeSrc={entry.beforeImage}
                afterSrc={entry.afterImage}
                alt={entry.title}
              />
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl">{entry.title}</CardTitle>
                    <CardDescription>{entry.location}</CardDescription>
                  </div>
                  <Badge variant="secondary">{entry.service}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-8">
                <p className="text-sm text-muted-foreground">
                  Detail checklist:
                </p>
                <ul className="mt-3 space-y-2 text-sm text-foreground">
                  {entry.notes.map((note) => (
                    <li key={note} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {note}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className={`${container} rounded-3xl border bg-card/70 p-8`}>
        <div className="flex flex-col gap-6 text-center">
          <h2 className="text-3xl font-semibold">
            Want your results featured next?
          </h2>
          <p className="text-muted-foreground">
            We document every project with professional lighting so you can see
            the difference. Share your needs and our dispatcher will reply with
            a tailored plan in minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="rounded-full">
              <a href="/#contact">Request service</a>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/blog">Browse care tips</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
