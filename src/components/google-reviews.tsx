import { sanityClient } from "@/lib/sanity.client";
import { googleReviewsQuery } from "@/lib/sanity.queries";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";

interface GoogleReview {
  _id: string;
  reviewerName: string;
  rating: number;
  reviewText: string;
  reviewDate: string;
  profileImage?: string;
  order?: number;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    if (weeks === 0) return "This week";
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  }
}

export async function GoogleReviews() {
  let reviews: GoogleReview[] = [];

  try {
    reviews = await sanityClient.fetch(googleReviewsQuery);
  } catch (error) {
    console.error("Failed to fetch Google reviews:", error);
  }

  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          What our customers say
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Real reviews from Google Business
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-card/70 backdrop-blur border rounded-3xl p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-start justify-between mb-4">
              <StarRating rating={review.rating} />
              <Badge variant="secondary" className="text-xs">
                Google
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-4">
              {review.reviewText}
            </p>

            <div className="flex items-center gap-3">
              {review.profileImage && (
                <img
                  src={review.profileImage}
                  alt={review.reviewerName}
                  className="h-10 w-10 rounded-full object-cover"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">
                  {review.reviewerName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(review.reviewDate)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
