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
import { sanityClient } from "@/lib/sanity.client";
import { galleryEntriesQuery } from "@/lib/sanity.queries";

type CloudinaryAsset = {
  secureUrl?: string;
  publicId?: string;
  width?: number;
  height?: number;
};

type GalleryEntry = {
  _id: string;
  title: string;
  location?: string;
  serviceTitle?: string;
  beforeImage?: CloudinaryAsset;
  afterImage?: CloudinaryAsset;
  notes?: string[];
};

const container = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";

export const revalidate = 1800;

async function fetchGalleryEntries() {
  const entries = await sanityClient.fetch<GalleryEntry[]>(galleryEntriesQuery);
  return entries.length
    ? entries
    : [
        {
          _id: "gallery-1",
          title: "Townhome living room",
          location: "Gold Coast",
          serviceTitle: "Steam cleaning",
          beforeImage: {
            secureUrl:
              "https://res.cloudinary.com/djzvgtp09/image/upload/v1764061921/flawless/gallery/hetey7iiam6goox1a1vn.jpg",
          },
          afterImage: {
            secureUrl:
              "https://res.cloudinary.com/djzvgtp09/image/upload/v1764061913/flawless/gallery/pzmumvwfwznja8kuf1m4.jpg",
          },
          notes: ["Removed traffic lane soil", "Applied fiber guard"],
        },
      ];
}

export default async function GalleryPage() {
  const galleryEntries = await fetchGalleryEntries();

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
            <Card key={entry._id} className="overflow-hidden border-border/70">
              <BeforeAfterSlider
                beforeSrc={
                  entry.beforeImage?.secureUrl ??
                  "https://res.cloudinary.com/djzvgtp09/image/upload/v1764061921/flawless/gallery/hetey7iiam6goox1a1vn.jpg"
                }
                afterSrc={
                  entry.afterImage?.secureUrl ??
                  "https://res.cloudinary.com/djzvgtp09/image/upload/v1764061913/flawless/gallery/pzmumvwfwznja8kuf1m4.jpg"
                }
                alt={entry.title}
              />
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl">{entry.title}</CardTitle>
                    <CardDescription>{entry.location}</CardDescription>
                  </div>
                  <Badge variant="secondary">
                    {entry.serviceTitle ?? "Detail clean"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-8">
                <p className="text-sm text-muted-foreground">
                  Detail checklist:
                </p>
                <ul className="mt-3 space-y-2 text-sm text-foreground">
                  {entry.notes?.map((note) => (
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
