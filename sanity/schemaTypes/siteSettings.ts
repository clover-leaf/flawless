import { defineField, defineType } from "sanity";

const socialOptions = [
  { title: "Facebook", value: "facebook" },
  { title: "Instagram", value: "instagram" },
  { title: "Twitter", value: "twitter" },
];

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Business name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short phrase that appears near the logo.",
    }),
    defineField({
      name: "phone",
      title: "Phone number",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email address",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address or service area summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "hours",
      title: "Working hours",
      type: "string",
    }),
    defineField({
      name: "serviceAreas",
      title: "Service areas",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "showSocials",
      title: "Show social icons",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        defineField({
          name: "socialLink",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: socialOptions,
              },
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
            }),
            defineField({
              name: "enabled",
              title: "Show link",
              type: "boolean",
              initialValue: true,
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "tagline",
    },
  },
});
