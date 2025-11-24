import { defineField, defineType } from "sanity";

export const galleryEntry = defineType({
  name: "galleryEntry",
  title: "Gallery Entry",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "service",
      title: "Service",
      type: "reference",
      to: [{ type: "service" }],
    }),
    defineField({
      name: "beforeImageUrl",
      title: "Before image URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "afterImageUrl",
      title: "After image URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "notes",
      title: "Detail checklist",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
    },
  },
});
