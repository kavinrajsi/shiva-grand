import {
  HOTEL_ADDRESS_PARTS,
  HOTEL_GEO,
  HOTEL_NAME,
  HOTEL_PHONE_TEL,
  HOTEL_PRICE_RANGE,
} from "@/lib/address";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shivagrand.com";

const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: HOTEL_ADDRESS_PARTS.streetAddress,
  addressLocality: HOTEL_ADDRESS_PARTS.addressLocality,
  addressRegion: HOTEL_ADDRESS_PARTS.addressRegion,
  postalCode: HOTEL_ADDRESS_PARTS.postalCode,
  addressCountry: HOTEL_ADDRESS_PARTS.addressCountry,
};

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const HOTEL_ID = `${SITE_URL}/#hotel`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function siteUrl(path = "/") {
  if (!path.startsWith("/")) return `${SITE_URL}/${path}`;
  return `${SITE_URL}${path}`;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: HOTEL_NAME,
    url: SITE_URL,
    telephone: HOTEL_PHONE_TEL,
    address: POSTAL_ADDRESS,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: HOTEL_NAME,
    url: SITE_URL,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function hotelSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": HOTEL_ID,
    name: HOTEL_NAME,
    url: SITE_URL,
    telephone: HOTEL_PHONE_TEL,
    priceRange: HOTEL_PRICE_RANGE,
    currenciesAccepted: "INR",
    address: POSTAL_ADDRESS,
    geo: {
      "@type": "GeoCoordinates",
      latitude: HOTEL_GEO.lat,
      longitude: HOTEL_GEO.lng,
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Air conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "Family rooms", value: true },
    ],
    makesOffer: [
      {
        "@type": "Offer",
        name: "Standard Double",
        price: "1500",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Deluxe AC",
        price: "1850",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Premium Family",
        price: "2000",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
    ],
  };
}

export function webPageSchema({ path, name, description, breadcrumbs }) {
  const url = siteUrl(path);
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": HOTEL_ID },
  };
  if (breadcrumbs?.length) {
    schema.breadcrumb = breadcrumbsSchema(breadcrumbs);
  }
  return schema;
}

export function breadcrumbsSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: siteUrl(item.path),
    })),
  };
}

export function blogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteUrl("/blog")}#blog`,
    url: siteUrl("/blog"),
    name: "The Residency Journal",
    description:
      "Stories, travel tips, hidden gems, and guest experiences from Shiva Grand Residency in Coimbatore.",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function blogPostingSchema({
  title,
  slug,
  description,
  imageUrl,
  publishedAt,
  authorName,
}) {
  const url = siteUrl(`/blog/${slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: title,
    description,
    url,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: publishedAt || undefined,
    dateModified: publishedAt || undefined,
    author: authorName ? { "@type": "Person", name: authorName } : undefined,
    publisher: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: HOTEL_NAME,
    },
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: siteUrl("/contact-us"),
    name: "Contact Shiva Grand Residency",
    about: { "@id": HOTEL_ID },
  };
}

export function reservationActionSchema() {
  // Surface "Book Your Stay" as a ReserveAction on the Hotel.
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": HOTEL_ID,
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: siteUrl("/book-you-stay"),
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: { "@type": "LodgingReservation", name: "Hotel reservation" },
    },
  };
}
