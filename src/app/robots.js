const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shivagrand.com";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/api", "/booking"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
