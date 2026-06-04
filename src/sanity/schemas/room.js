export default {
  name: "room",
  title: "Room",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Room Name",
      type: "string",
      description: 'e.g. "Deluxe Room", "Suite Room"',
      validation: (r) => r.required(),
    },
    {
      name: "price",
      title: "Price (₹ per night)",
      type: "number",
      description: "Numeric only, e.g. 1500. Displayed as ₹1,500.",
      validation: (r) => r.required().min(0),
    },
    {
      name: "blurb",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    },
    {
      name: "ctaLabel",
      title: "Button Label",
      type: "string",
      description: 'Home card button, e.g. "Book Deluxe". Defaults to "Book Now".',
    },
    {
      name: "badge",
      title: "Badge",
      type: "string",
      description: 'Booking-page label, e.g. "Most Popular", "Premium".',
    },
    {
      name: "badgeStyle",
      title: "Badge Style",
      type: "string",
      options: {
        list: [
          { title: "Light (default)", value: "light" },
          { title: "Highlight", value: "highlight" },
        ],
        layout: "radio",
      },
      initialValue: "light",
    },
    {
      name: "features",
      title: "Features",
      type: "array",
      description: "Shown on the booking page card.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icon",
              type: "string",
              description:
                'Material Symbols name, e.g. "wifi", "ac_unit", "group", "tv".',
            },
            { name: "label", title: "Label", type: "string" },
          ],
          preview: {
            select: { title: "label", subtitle: "icon" },
          },
        },
      ],
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
        { field: "price", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "title", price: "price", media: "image" },
    prepare({ title, price, media }) {
      return {
        title,
        subtitle: price != null ? `₹${price.toLocaleString("en-IN")}` : "",
        media,
      };
    },
  },
};
