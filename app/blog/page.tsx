import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { allPostsQuery, featuredPostQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  author: string
  category: string
  publishedAt: string
  readTime: number
  excerpt: string
  mainImage?: { asset: { _ref: string }; alt?: string }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function readLabel(min: number) {
  return `${min} MIN READ`
}

export const revalidate = 60

export default async function Blog() {
  const [featured, allPosts]: [Post | null, Post[]] = await Promise.all([
    client.fetch(featuredPostQuery),
    client.fetch(allPostsQuery),
  ])

  const hero = featured ?? allPosts[0] ?? null
  const gridPosts = hero ? allPosts.filter(p => p._id !== hero._id) : allPosts

  return (
    <main className="pt-32 pb-20">
      {/* Hero Section */}
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
              Discover hidden culinary gems, travel essentials, and heartwarming guest experiences from our urban sanctuary.
            </p>
          </div>
          <div className="lg:col-span-5 hidden lg:block">
            <div className="bg-surface-container-low p-8 rounded-xl relative overflow-hidden">
              <div className="absolute -right-10 -top-10 opacity-10">
                <span className="material-symbols-outlined text-[12rem]">eco</span>
              </div>
              <p className="relative z-10 text-on-surface-variant italic font-medium">
                &quot;A clean and practical stay that offers exceptional value for money. The proximity to the station and the local food guides provided by the staff made it perfect for budget-conscious travelers.&quot;
              </p>
              <div className="mt-4 flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold">A</div>
                <div>
                  <p className="text-sm font-bold">Ananya R.</p>
                  <p className="text-xs text-on-surface-variant">Business Traveler</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Story */}
      {hero && (
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <Link href={`/blog/${hero.slug.current}`} className="relative group cursor-pointer overflow-hidden rounded-xl block">
            <div className="aspect-[21/9] w-full bg-surface-container-high overflow-hidden relative">
              {hero.mainImage ? (
                <Image
                  src={urlFor(hero.mainImage).width(1400).height(600).url()}
                  alt={hero.mainImage.alt ?? hero.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full bg-primary/20" />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
              <div className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-wider mb-4">
                {hero.category}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{hero.title}</h2>
              <p className="text-white/80 text-lg mb-6 line-clamp-2">{hero.excerpt}</p>
              <span className="text-white font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                Read Story <span className="material-symbols-outlined">arrow_forward</span>
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* Blog Grid */}
      {gridPosts.length > 0 ? (
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridPosts.map(post => (
            <Link key={post._id} href={`/blog/${post.slug.current}`} className="flex flex-col gap-4 group">
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-low relative">
                {post.mainImage ? (
                  <Image
                    src={urlFor(post.mainImage).width(600).height(750).url()}
                    alt={post.mainImage.alt ?? post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary/40 text-6xl">article</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-primary">
                  {post.category}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-on-surface-variant text-sm line-clamp-2">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-[11px] font-bold text-outline uppercase tracking-wider">
                  <span>{readLabel(post.readTime)}</span>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <section className="max-w-7xl mx-auto px-6 text-center py-20">
          <span className="material-symbols-outlined text-5xl text-primary/30 mb-4 block">article</span>
          <p className="text-on-surface-variant text-lg">No posts published yet. Add your first post in the <Link href="/studio" className="text-primary font-bold underline">Studio</Link>.</p>
        </section>
      )}

      {/* Load More — static for now */}
      {gridPosts.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mt-16 text-center">
          <button className="px-10 py-4 border-2 border-outline-variant text-on-surface-variant font-bold rounded-full hover:bg-surface-container-low transition-colors inline-flex items-center gap-3 group">
            Show More Stories
            <span className="material-symbols-outlined group-hover:rotate-180 transition-transform">expand_more</span>
          </button>
        </div>
      )}
    </main>
  )
}
