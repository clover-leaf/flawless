import { defineField, defineType } from "sanity";

export const homeHero = defineType({
  name: "homeHero",
  title: "Homepage Hero",
  type: "document",
  groups: [
    { name: "content", title: "Content" },
    { name: "cta", title: "CTA" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Headline",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Support copy",
      type: "text",
      rows: 4,
      group: "content",
    }),
    defineField({
      name: "serviceAreas",
      title: "Service areas",
      description: "Short list that appears in the badge above the hero title.",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.max(4),
      group: "content",
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "Primary CTA label",
      type: "string",
      group: "cta",
      initialValue: "Book a visit",
    }),
    defineField({
      name: "primaryCtaHref",
      title: "Primary CTA link",
      type: "string",
      validation: (rule) => rule.required(),
      group: "cta",
      initialValue: "#contact",
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "Secondary CTA label",
      type: "string",
      group: "cta",
      initialValue: "View gallery",
    }),
    defineField({
      name: "secondaryCtaHref",
      title: "Secondary CTA link",
      type: "string",
      group: "cta",
      initialValue: "/gallery",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
  },
});
