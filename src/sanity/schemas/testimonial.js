export default {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Guest Name",
      type: "string",
      validation: (r) => r.required(),
    },
    {
      name: "role",
      title: "Role / Source",
      type: "string",
      description: 'e.g. "Google Reviewer", "Business Traveler"',
      initialValue: "Google Reviewer",
    },
    {
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    },
    {
      name: "rating",
      title: "Rating (1–5)",
      type: "number",
      initialValue: 5,
      validation: (r) => r.required().min(1).max(5).integer(),
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description:
        "Lower numbers appear first. Leave blank to sort by creation date.",
    },
    {
      name: "published",
      title: "Show on website",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "featuredOnBlog",
      title: "Featured on Blog hero",
      type: "boolean",
      description:
        "If multiple are flagged, the first by display order is used.",
      initialValue: false,
    },
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "role", description: "quote" },
    prepare({ title, subtitle, description }) {
      return {
        title,
        subtitle,
        description:
          description?.length > 60
            ? `${description.slice(0, 60)}…`
            : description,
      };
    },
  },
};
