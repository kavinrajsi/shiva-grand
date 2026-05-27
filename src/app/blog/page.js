import Image from "next/image";
import Link from "next/link";
import { sanityClient } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { POSTS_QUERY } from "@/sanity/queries";

export const revalidate = 60;

export const metadata = {
  title: "Blog — Shiva Grand",
  description:
    "The Residency Journal — stories, travel tips, and guest experiences from Shiva Grand Residency, Coimbatore.",
};

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

export default async function BlogPage() {
  const posts = await sanityClient.fetch(POSTS_QUERY);
  const featured = posts.find((p) => p.featured) || posts[0];
  const rest = posts.filter((p) => p._id !== featured?._id);

  return (
    <div className="pt-32 pb-20">
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
          <div className="lg:col-span-5 hidden lg:block">
            <div className="bg-surface-container-low p-8 rounded-xl relative overflow-hidden">
              <div className="absolute -right-10 -top-10 opacity-10">
                <span className="material-symbols-outlined text-[12rem]">
                  eco
                </span>
              </div>
              <p className="relative z-10 text-on-surface-variant italic font-medium">
                &ldquo;A clean and practical stay that offers exceptional value
                for money. The proximity to the station and the local food
                guides provided by the staff made it perfect for budget-conscious
                travelers.&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold">
                  A
                </div>
                <div>
                  <p className="text-sm font-bold">Ananya R.</p>
                  <p className="text-xs text-on-surface-variant">
                    Business Traveler
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {featured ? (
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <Link
            href={`/blog/${featured.slug}`}
            className="relative group cursor-pointer overflow-hidden rounded-xl block"
          >
            <div className="relative aspect-[21/9] w-full bg-surface-container-high overflow-hidden">
              {featured.mainImage ? (
                <Image
                  src={urlFor(featured.mainImage).width(1600).url()}
                  alt={featured.mainImage?.alt || featured.title}
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
              <span className="text-white font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                Read Story{" "}
                <span className="material-symbols-outlined">arrow_forward</span>
              </span>
            </div>
          </Link>
        </section>
      ) : null}

      {rest.length > 0 ? (
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="flex flex-col gap-4 group"
            >
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-low">
                {post.mainImage ? (
                  <Image
                    src={urlFor(post.mainImage).width(800).url()}
                    alt={post.mainImage?.alt || post.title}
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
            </Link>
          ))}
        </section>
      ) : null}

      {posts.length === 0 ? (
        <div className="max-w-7xl mx-auto px-6 text-center py-24">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant/40 mb-4">
            edit_note
          </span>
          <h2 className="text-2xl font-bold text-on-surface mb-2">
            Stories coming soon.
          </h2>
          <p className="text-on-surface-variant">
            Head to{" "}
            <Link href="/studio" className="text-primary underline">
              /studio
            </Link>{" "}
            to add your first post.
          </p>
        </div>
      ) : null}
    </div>
  );
}
