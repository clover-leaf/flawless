import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const posts = [
  {
    title: "Carpet maintenance between professional cleanings",
    excerpt:
      "How to spot vacuum, handle spills, and rotate cleaning routes so foot traffic never builds up.",
    category: "Maintenance",
    readingTime: "6 min read",
    date: "Feb 3",
  },
  {
    title: "Pet odor myths (and what actually works)",
    excerpt:
      "Break up with powder fresheners. These are the steps our technicians take to permanently remove odors.",
    category: "Pet care",
    readingTime: "8 min read",
    date: "Jan 27",
  },
  {
    title: "Steam vs. low-moisture cleaning for commercial carpets",
    excerpt:
      "Use this decision tree to know when encapsulation is enough or when a deeper flush is required.",
    category: "Commercial",
    readingTime: "7 min read",
    date: "Jan 12",
  },
  {
    title: "Guide to protecting natural fiber rugs",
    excerpt:
      "Wool, silk, and hand-knotted pieces deserve specific chemistry. Here are the pre-tests we run every time.",
    category: "Textile care",
    readingTime: "5 min read",
    date: "Dec 30",
  },
  {
    title: "Checklist before your cleaning crew arrives",
    excerpt:
      "Move small items, prep pets, and confirm parking or elevator access with this printable list.",
    category: "Prep",
    readingTime: "4 min read",
    date: "Dec 18",
  },
  {
    title: "Understanding drying times and airflow",
    excerpt:
      "Ceiling fans, HVAC settings, and dehumidifiers can cut dry times in half. Here’s how to set them up.",
    category: "Maintenance",
    readingTime: "5 min read",
    date: "Dec 5",
  },
];

const container = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";

export default function BlogPage() {
  return (
    <div className="space-y-16 py-12">
      <section className={`${container} space-y-4`}>
        <Badge className="w-fit rounded-full bg-primary/10 text-primary">
          Field notes · Cleaning tips
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Carpet care intel from our technicians.
        </h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Tutorials, maintenance plans, and myth-busting guides so you can make
          the most of every professional cleaning.
        </p>
        <div className="flex flex-wrap gap-3 text-xs font-medium text-muted-foreground">
          <span className="rounded-full border border-border px-3 py-1">
            Maintenance
          </span>
          <span className="rounded-full border border-border px-3 py-1">
            Pet care
          </span>
          <span className="rounded-full border border-border px-3 py-1">
            Commercial
          </span>
          <span className="rounded-full border border-border px-3 py-1">
            Textile care
          </span>
        </div>
      </section>
      <section className={container}>
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <Card key={post.title} className="border-border/70 bg-card/70">
              <CardHeader>
                <Badge variant="outline" className="w-fit">
                  {post.category}
                </Badge>
                <CardTitle className="text-2xl">{post.title}</CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  {post.date} · {post.readingTime}
                </span>
                <Button asChild variant="ghost" className="gap-2 px-0">
                  <Link href="/blog">
                    Read article
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
