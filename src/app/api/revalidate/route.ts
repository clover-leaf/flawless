import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";

const pathsToRevalidate = ["/", "/gallery", "/blog"];

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (!secret || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return new Response("Invalid revalidation secret", { status: 401 });
  }

  try {
    // Optional: inspect payload if you want to revalidate selectively.
    const body = await request.json().catch(() => null);
    const docType = body?._type;

    if (
      docType === "galleryEntry" ||
      docType === "blogPost" ||
      docType === "service" ||
      docType === "homeHero" ||
      docType === "processStep" ||
      docType === "testimonial" ||
      docType === "siteSettings"
    ) {
      for (const path of pathsToRevalidate) {
        revalidatePath(path);
      }
      // Also revalidate root layout for siteSettings changes (header/footer)
      if (docType === "siteSettings") {
        revalidatePath("/", "layout");
      }
    }

    return Response.json({ revalidated: true });
  } catch (error) {
    return new Response(`Error revalidating: ${(error as Error).message}`, {
      status: 500,
    });
  }
}
