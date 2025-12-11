import { defineField, defineType } from "sanity";

export const googleReview = defineType({
  name: "googleReview",
  title: "Google Review",
  type: "document",
  fields: [
    defineField({
      name: "reviewerName",
      title: "Reviewer name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Star rating",
      type: "number",
      validation: (rule) => rule.required().min(1).max(5).integer(),
      description: "Rating from 1 to 5 stars",
    }),
    defineField({
      name: "reviewText",
      title: "Review text",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "reviewDate",
      title: "Review date",
      type: "date",
      validation: (rule) => rule.required(),
      description: "Date when the review was posted on Google",
    }),
    defineField({
      name: "profileImage",
      title: "Profile image URL",
      type: "url",
      description: "Optional: Google profile image URL",
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first",
    }),
  ],
  preview: {
    select: {
      title: "reviewerName",
      subtitle: "rating",
      description: "reviewText",
    },
    prepare({ title, subtitle, description }) {
      const stars = "⭐".repeat(subtitle || 0);
      return {
        title: `${title} ${stars}`,
        subtitle: description?.substring(0, 60) + "...",
      };
    },
  },
});
