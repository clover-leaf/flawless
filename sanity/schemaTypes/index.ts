import { blogPost } from "./blogPost";
import { cloudinaryAsset } from "./cloudinaryAsset";
import { galleryEntry } from "./galleryEntry";
import { googleReview } from "./googleReview";
import { homeHero } from "./homeHero";
import { processStep } from "./processStep";
import { service } from "./service";
import { siteSettings } from "./siteSettings";
import { testimonial } from "./testimonial";

export const schemaTypes = [
  cloudinaryAsset,
  homeHero,
  service,
  processStep,
  testimonial,
  googleReview,
  galleryEntry,
  blogPost,
  siteSettings,
];
