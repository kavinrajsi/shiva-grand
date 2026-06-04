import Image from "next/image";
import Link from "next/link";
import { sanityClient } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { BLOG_HERO_TESTIMONIAL_QUERY, POSTS_QUERY } from "@/sanity/queries";
import JsonLd from "@/components/JsonLd";
import { blogSchema, webPageSchema } from "@/lib/schema";

export const revalidate = 60;

export const metadata = {
  title: "Blog — The Residency Journal",
  description:
    "Stories, travel tips, hidden gems, and guest experiences from Shiva Grand Residency in the heart of Coimbatore.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "The Residency Journal — Shiva Grand Blog",
    description:
      "Stories, travel tips, and guest experiences from Shiva Grand Residency, Coimbatore.",
    url: "/blog",
  },
};

const SAMPLE_POSTS = [
  {
    _id: "sample-eateries",
    title: "5 Authentic Eateries within 1km of Shiva Grand",
    excerpt:
      "From the perfect filter coffee to the legendary Ghee Roast, here is your walking guide to the best flavors of Coimbatore's main junction.",
    category: "Local Flavors",
    readTime: "6 MIN READ",
    publishedAt: "2024-10-24",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAKMQoT3mzboobWfQKFiIYC40DJsHLTtz8jupDRlRpvb24xp7IbBJy2eTA0soTBcA-R_3EMHtCylcijwSfnVZ5d-ak9zTNhiCAg8GunjI9NuiJfSf3tgGhENsA5QQKxY1LWDhvd1CGgvvouCSzYlVe2wVG_TMWCBIGJaPmxAgM95nme--0SR_8U7MOb8UoLt5A0vMN0dkl1qeROXVtdUJOUBRDpuTBZRex5FVfyBZHyZwIri6J73fkvXaNAxOS04J82J_joqo9sPC1O",
    imageAlt:
      "Vibrant South Indian breakfast spread with dosa and culinary details",
    featured: true,
    href: null,
  },
  {
    _id: "sample-railway",
    title: "A Smart Traveler's Guide to Coimbatore Railway Station",
    excerpt:
      "Navigating the junction can be tricky. Here's how to save time and stay stress-free on your transit.",
    category: "Travel Tips",
    readTime: "5 MIN READ",
    publishedAt: "2024-05-12",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBvMGBUe7QZ6wM5xKErPxEdiD9jgI_qHhSMiVWpP85Z1PrhVUp6LHvr9L7xakNvpM0BdgJveaFszyEuSWvSujDgcUdsvb-2ApyJGK3ZokvAx630K7QFGxlzr56SU10BVOHXLRDqw3vue2ddVGgw8CBN6jCe3ZjnWscdSVNS9YE55v1Rr2xw2EGqg1HjVF4gGdS8JsDXI7U2y6s22YK2jieQ-4W829ain_k8oAICD6ABtEi41MRXDRy06Bz7SX6FH3TGsxfi5sxNtlRA",
    imageAlt: "Person looking at a map on a wooden table with camera",
    featured: false,
    href: null,
  },
  {
    _id: "sample-peace",
    title: "Finding Peace in the City Center: My Weekend at Shiva Grand",
    excerpt:
      "How a business trip turned into a relaxing getaway thanks to the botanical ambiance and hospitality.",
    category: "Guest Story",
    readTime: "8 MIN READ",
    publishedAt: "2024-04-28",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD6dno-hg4Gc3anqNKxxfrXjPwxpQFCtv16q4xv1SvgjudCUEXzlQaIv58T43LFfmdzznphkVGTjMtQwQEI4xmKocYkD4WMmX6N--6QR5TJnIl3iHdMYQsCnbYo_m_cynB3qFKULfu_mRQdYYpLjTK44LYnTFDatipG4ykBIAnTdTE8mm_QR1vXcdjwSEQ1oVoqvcWGLN463dcWTdyx8yAsD8VUpIzAqh2MDaNTB0sVjIpXrUJRn8DgHyqwE5DrkljTHsy3OvqVLtOr",
    imageAlt: "Cozy well-lit hotel room interior with soft shadows",
    featured: false,
    href: null,
  },
  {
    _id: "sample-parks",
    title: "3 Botanical Parks in Coimbatore You Must Visit",
    excerpt:
      "Escape the concrete jungle and breathe fresh air at these local green sanctuaries just minutes away.",
    category: "Hidden Gems",
    readTime: "4 MIN READ",
    publishedAt: "2024-04-15",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB5n2GFPHcLgddV57nxEQfjdGCdGKYEjU2VNF37UpZ4dxF9lx3JWf1fIdEc1bB_WCuzPvnRa9t3PsFEXB61qfB4DTVBsjXNCzdMW7x9ElJvKhVzgtq0177q2-mZ6m2rnHiYwlwd8SRB3t9Qu1WlLP92IKq06SbP7xEr3_z36Kjn31Vqo3gHm_foei_Q56PzRif42mo-gYMdIg6ll4Pi4-408_ifCTonaM76LMKDxA55fG66Uo_cJSU6t8NlzwmXchWHN8unqvef4ihj",
    imageAlt: "Lush green tropical plants in a courtyard",
    featured: false,
    href: null,
  },
];

const SAMPLE_HERO_TESTIMONIAL = {
  _id: "sample-ananya",
  name: "Ananya R.",
  role: "Business Traveler",
  quote:
    "A clean and practical stay that offers exceptional value for money. The proximity to the station and the local food guides provided by the staff made it perfect for budget-conscious travelers.",
};

function initialsFor(name) {
  if (!name) return "";
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
}

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d
    .toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    .toUpperCase();
}

function normalizeSanityPost(post) {
  return {
    _id: post._id,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    readTime: post.readTime,
    publishedAt: post.publishedAt,
    imageUrl: post.mainImage ? urlFor(post.mainImage).width(1600).url() : null,
    imageAlt: post.mainImage?.alt || post.title,
    featured: Boolean(post.featured),
    href: `/blog/${post.slug}`,
  };
}

function CardLink({ href, className, children }) {
  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return <article className={className}>{children}</article>;
}

export default async function BlogPage() {
  const [sanityPosts, sanityHeroTestimonial] = await Promise.all([
    sanityClient.fetch(POSTS_QUERY),
    sanityClient.fetch(BLOG_HERO_TESTIMONIAL_QUERY),
  ]);
  const posts =
    sanityPosts.length > 0 ? sanityPosts.map(normalizeSanityPost) : SAMPLE_POSTS;
  const heroTestimonial = sanityHeroTestimonial || SAMPLE_HERO_TESTIMONIAL;

  const featured = posts.find((p) => p.featured) || posts[0];
  const rest = posts.filter((p) => p._id !== featured?._id);

  return (
    <div className="pt-32 pb-20">
      <JsonLd
        data={[
          webPageSchema({
            path: "/blog",
            name: "Blog — The Residency Journal",
            description:
              "Stories, travel tips, hidden gems, and guest experiences from Shiva Grand Residency.",
            breadcrumbs: [
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
            ],
          }),
          blogSchema(),
        ]}
      />
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <span className="text-primary font-bold tracking-[0.2em] text-[0.75rem] uppercase mb-4 block">
              The Residency Journal
            </span>
            <h1 className="text-[3.5rem] font-extrabold leading-[1.1] tracking-tighter text-on-surface mb-6">
              Stories from the <br />
              <span className="text-primary">Heart of Coimbatore</span>
            </h1>
            <p className="text-on-surface-variant text-lg max-w-xl leading-relaxed">
              Discover hidden culinary gems, travel essentials, and heartwarming
              guest experiences from our urban sanctuary.
            </p>
          </div>
        </div>
      </section>

      {featured ? (
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <CardLink
            href={featured.href}
            className="relative group cursor-pointer overflow-hidden rounded-xl block"
          >
            <div className="relative aspect-[21/9] w-full bg-surface-container-high overflow-hidden">
              {featured.imageUrl ? (
                <Image
                  src={featured.imageUrl}
                  alt={featured.imageAlt}
                  fill
                  sizes="(min-width: 768px) 80rem, 100vw"
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : null}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
              {featured.category ? (
                <div className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-wider mb-4 uppercase">
                  {featured.category}
                </div>
              ) : null}
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {featured.title}
              </h2>
              {featured.excerpt ? (
                <p className="text-white/80 text-lg mb-6 line-clamp-2">
                  {featured.excerpt}
                </p>
              ) : null}
              {featured.href ? (
                <span className="text-white font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                  Read Story{" "}
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </span>
              ) : null}
            </div>
          </CardLink>
        </section>
      ) : null}

      {rest.length > 0 ? (
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((post) => (
            <CardLink
              key={post._id}
              href={post.href}
              className="flex flex-col gap-4 group"
            >
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-low">
                {post.imageUrl ? (
                  <Image
                    src={post.imageUrl}
                    alt={post.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : null}
                {post.category ? (
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-primary uppercase">
                    {post.category}
                  </div>
                ) : null}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                {post.excerpt ? (
                  <p className="text-on-surface-variant text-sm line-clamp-2">
                    {post.excerpt}
                  </p>
                ) : null}
                <div className="mt-4 flex items-center justify-between text-[11px] font-bold text-outline uppercase tracking-wider">
                  <span>{post.readTime || ""}</span>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
              </div>
            </CardLink>
          ))}
        </section>
      ) : null}
    </div>
  );
}
