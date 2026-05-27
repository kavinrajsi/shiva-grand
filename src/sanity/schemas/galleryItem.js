export default {
  name: "galleryItem",
  title: "Facility Gallery Item",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    },
    {
      name: "caption",
      title: "Caption / Label",
      type: "string",
      description: 'Shown as the alt text fallback, e.g. "Lobby".',
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first.",
    },
    {
      name: "published",
      title: "Show on website",
      type: "boolean",
      initialValue: true,
    },
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "_createdAt", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "caption", media: "image" },
    prepare({ title, media }) {
      return { title: title || "Gallery item", media };
    },
  },
};
