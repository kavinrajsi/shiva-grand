import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { sanityClient } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import {
  POST_BY_SLUG_QUERY,
  POST_SLUGS_QUERY,
  RELATED_POSTS_QUERY,
} from "@/sanity/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch(POST_SLUGS_QUERY);
  return (slugs || []).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await sanityClient.fetch(POST_BY_SLUG_QUERY, { slug });
  if (!post) return { title: "Post not found — Shiva Grand" };
  return {
    title: `${post.title} — Shiva Grand`,
    description: post.excerpt || undefined,
  };
}

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const portableComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold text-on-surface mt-12 mb-4 tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold text-on-surface mt-10 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="text-xl leading-relaxed text-on-surface my-8 italic border-l-4 border-primary pl-6 py-2">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-6 leading-relaxed text-on-surface-variant">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-on-surface-variant">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-on-surface-variant">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline hover:no-underline"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-on-surface">{children}</strong>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <div className="relative my-8 aspect-[16/9] rounded-xl overflow-hidden">
          <Image
            src={urlFor(value).width(1400).url()}
            alt={value.alt || ""}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
        </div>
      );
    },
  },
};

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const [post, related] = await Promise.all([
    sanityClient.fetch(POST_BY_SLUG_QUERY, { slug }),
    sanityClient.fetch(RELATED_POSTS_QUERY, { slug }),
  ]);

  if (!post) notFound();

  return (
    <div className="pt-20">
      <header className="relative w-full h-[716px] flex items-end overflow-hidden">
        {post.mainImage ? (
          <Image
            src={urlFor(post.mainImage).width(2000).url()}
            alt={post.mainImage?.alt || post.title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 pb-16 w-full">
          {post.category ? (
            <span className="inline-block px-3 py-1 bg-primary text-on-primary text-[0.75rem] font-bold uppercase tracking-[0.05em] rounded-full mb-6">
              {post.category}
            </span>
          ) : null}
          <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-tighter max-w-3xl mb-4 leading-tight">
            {post.title}
          </h1>
          {post.excerpt ? (
            <p className="text-emerald-50/90 text-lg md:text-xl max-w-2xl font-light">
              {post.excerpt}
            </p>
          ) : null}
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <article className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-10 pb-8 border-b border-outline-variant/20">
              <div className="relative w-12 h-12 rounded-full bg-surface-container-high overflow-hidden">
                {post.author?.image ? (
                  <Image
                    src={urlFor(post.author.image).width(96).url()}
                    alt={post.author?.name || "Author"}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div>
                <p className="font-bold text-on-surface">
                  {post.author?.name || "Shiva Grand"}
                </p>
                <p className="text-sm text-on-surface-variant leading-none">
                  {[
                    post.author?.role,
                    formatDate(post.publishedAt),
                    post.readTime,
                  ]
                    .filter(Boolean)
                    .join(" • ")}
                </p>
              </div>
            </div>

            <div className="prose prose-stone prose-lg max-w-none text-on-surface-variant leading-relaxed">
              {post.body ? (
                <PortableText
                  value={post.body}
                  components={portableComponents}
                />
              ) : null}
            </div>
          </article>

          <aside className="lg:col-span-4 space-y-12">
            <div className="bg-surface-container-low p-8 rounded-xl sticky top-28 border border-outline-variant/10">
              {related?.length > 0 ? (
                <>
                  <h4 className="text-xl font-bold mb-6">
                    You might also like
                  </h4>
                  <div className="space-y-8">
                    {related.map((r) => (
                      <Link
                        key={r._id}
                        href={`/blog/${r.slug}`}
                        className="group block"
                      >
                        <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                          {r.mainImage ? (
                            <Image
                              src={urlFor(r.mainImage).width(640).url()}
                              alt={r.mainImage?.alt || r.title}
                              fill
                              sizes="(min-width: 1024px) 25vw, 100vw"
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : null}
                        </div>
                        <h5 className="font-bold group-hover:text-primary transition-colors">
                          {r.title}
                        </h5>
                        {r.excerpt ? (
                          <p className="text-sm text-on-surface-variant mt-2">
                            {r.excerpt}
                          </p>
                        ) : null}
                      </Link>
                    ))}
                  </div>
                </>
              ) : null}
              <div
                className={`${related?.length > 0 ? "mt-12 pt-12 border-t border-outline-variant/20" : ""}`}
              >
                <div className="bg-primary-container/30 p-6 rounded-xl">
                  <h5 className="font-bold text-primary mb-2">
                    Book Your Sanctuary
                  </h5>
                  <p className="text-sm text-on-secondary-container mb-4">
                    Stay steps away from these amazing eateries. Rooms starting
                    at ₹1800.
                  </p>
                  <Link
                    href="/book-you-stay"
                    className="block text-center w-full botanical-gradient text-on-primary py-3 rounded-full font-bold shadow-md active:scale-95 transition-transform"
                  >
                    Reserve Now
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mt-24 bg-surface-container-low py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="material-symbols-outlined fill-1 text-4xl text-primary mb-4">
            restaurant
          </span>
          <h2 className="text-3xl font-bold mb-4 tracking-tight">
            Craving something specific?
          </h2>
          <p className="text-on-surface-variant max-w-xl mx-auto mb-8">
            Need help with your next stay? We can assist with future bookings
            ahead—just inform us at our reception desk.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact-us"
              className="px-8 py-3 rounded-full border border-primary text-primary font-bold hover:bg-primary/5 transition-colors"
            >
              Chat with us
            </Link>
            <Link
              href="/local-guide"
              className="px-8 py-3 rounded-full bg-primary text-on-primary font-bold shadow-lg hover:opacity-90 transition-all"
            >
              Explore Full City Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
