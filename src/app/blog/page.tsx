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
import { sanityClient } from "@/lib/sanity.client";
import { blogPostsQuery } from "@/lib/sanity.queries";

type BlogPost = {
  _id: string;
  title: string;
  excerpt?: string;
  category?: string;
  readingTime?: number;
  publishedAt?: string;
  slug?: { current: string };
};

const container = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";

export const revalidate = 60 * 30;

async function fetchPosts() {
  const posts = await sanityClient.fetch<BlogPost[]>(blogPostsQuery);
  return posts.length
    ? posts
    : [
        {
          _id: "post-1",
          title: "Carpet maintenance between professional cleanings",
          excerpt:
            "How to spot vacuum, handle spills, and rotate cleaning routes so foot traffic never builds up.",
          category: "Maintenance",
          readingTime: 6,
          publishedAt: "2024-02-03T08:00:00Z",
        },
      ];
}

export default async function BlogPage() {
  const posts = await fetchPosts();

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
            <Card key={post._id} className="border-border/70 bg-card/70">
              <CardHeader>
                <Badge variant="outline" className="w-fit">
                  {post.category ?? "Article"}
                </Badge>
                <CardTitle className="text-2xl">{post.title}</CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "New"}
                  {post.readingTime ? ` · ${post.readingTime} min read` : null}
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
