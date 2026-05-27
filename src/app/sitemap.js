import { sanityClient } from "@/sanity/client";
import { POST_SLUGS_QUERY } from "@/sanity/queries";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shivagrand.com";

const STATIC_ROUTES = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/book-you-stay", changeFrequency: "weekly", priority: 0.9 },
  { path: "/local-guide", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/contact-us", changeFrequency: "yearly", priority: 0.6 },
];

export default async function sitemap() {
  const slugs = await sanityClient.fetch(POST_SLUGS_QUERY).catch(() => []);
  const now = new Date();

  const staticEntries = STATIC_ROUTES.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })
  );

  const blogEntries = (slugs || []).map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
