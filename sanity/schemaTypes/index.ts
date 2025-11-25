import { blogPost } from "./blogPost";
import { cloudinaryAsset } from "./cloudinaryAsset";
import { galleryEntry } from "./galleryEntry";
import { homeHero } from "./homeHero";
import { processStep } from "./processStep";
import { service } from "./service";
import { testimonial } from "./testimonial";

export const schemaTypes = [
  cloudinaryAsset,
  homeHero,
  service,
  processStep,
  testimonial,
  galleryEntry,
  blogPost,
];
