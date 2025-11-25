import { defineField, defineType } from "sanity";
import { CloudinaryImageInput } from "../components/cloudinary-image-input";

export const cloudinaryAsset = defineType({
  name: "cloudinary.asset",
  title: "Cloudinary Asset",
  type: "object",
  components: {
    input: CloudinaryImageInput,
  },
  fields: [
    defineField({
      name: "publicId",
      title: "Public ID",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "secureUrl",
      title: "Secure URL",
      type: "url",
      readOnly: true,
    }),
    defineField({
      name: "width",
      title: "Width",
      type: "number",
      readOnly: true,
    }),
    defineField({
      name: "height",
      title: "Height",
      type: "number",
      readOnly: true,
    }),
    defineField({
      name: "format",
      title: "Format",
      type: "string",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "publicId",
      media: "secureUrl",
    },
    prepare(selection) {
      return {
        title: selection.title ?? "Cloudinary asset",
      };
    },
  },
});
