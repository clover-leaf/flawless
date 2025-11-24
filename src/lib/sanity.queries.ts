import { groq } from "next-sanity";

export const homeHeroQuery = groq`*[_type == "homeHero"][0]`;

export const servicesQuery = groq`*[_type == "service"] | order(order asc) {
  _id,
  title,
  summary,
  highlights,
  icon
}`;

export const processStepsQuery = groq`*[_type == "processStep"] | order(order asc)`;

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc){
  _id,
  quote,
  customerName,
  location,
  "serviceTitle": service->title
}`;

export const galleryEntriesQuery = groq`*[_type == "galleryEntry"] | order(_createdAt desc){
  _id,
  title,
  location,
  notes,
  "serviceTitle": service->title,
  beforeImageUrl,
  afterImageUrl
}`;

export const blogPostsQuery = groq`*[_type == "blogPost"] | order(publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  category,
  readingTime,
  publishedAt,
  featuredImage
}`;
