export default {
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (r) => r.required() },
    { name: "role", title: "Role", type: "string" },
    {
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
};
