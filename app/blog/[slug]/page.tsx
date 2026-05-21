import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { postBySlugQuery, allSlugsQuery, relatedPostsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(allSlugsQuery)
  return slugs.map(s => ({ slug: s.slug }))
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

const portableComponents = {
  types: {
    image: ({ value }: { value: { asset: { _ref: string }; alt?: string; caption?: string } }) => (
      <figure className="my-10">
        <div className="relative aspect-video rounded-xl overflow-hidden">
          <Image
            src={urlFor(value).width(900).url()}
            alt={value.alt ?? ''}
            fill
            className="object-cover"
          />
        </div>
        {value.caption && <figcaption className="text-center text-sm text-on-surface-variant mt-2 italic">{value.caption}</figcaption>}
      </figure>
    ),
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => <h2 className="text-2xl font-bold text-on-surface mt-10 mb-4">{children}</h2>,
    h3: ({ children }: { children?: React.ReactNode }) => <h3 className="text-xl font-bold text-on-surface mt-8 mb-3">{children}</h3>,
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-xl text-on-surface bg-primary/5 rounded-r-xl">{children}</blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => <p className="mb-6 text-on-surface-variant leading-relaxed text-lg">{children}</p>,
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => <strong className="font-bold text-on-surface">{children}</strong>,
    link: ({ value, children }: { value?: { href: string }; children?: React.ReactNode }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-primary underline">{children}</a>
    ),
  },
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const [post, related] = await Promise.all([
    client.fetch(postBySlugQuery, { slug: params.slug }),
    client.fetch(relatedPostsQuery, { slug: params.slug }),
  ])

  if (!post) notFound()

  return (
    <main className="pt-20">
      {/* Hero */}
      <header className="relative w-full h-[480px] md:h-[640px] flex items-end overflow-hidden">
        {post.mainImage ? (
          <Image
            src={urlFor(post.mainImage).width(1400).height(640).url()}
            alt={post.mainImage.alt ?? post.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-primary/30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 pb-16 w-full">
          <span className="inline-block px-3 py-1 bg-primary text-white text-[0.75rem] font-bold uppercase tracking-widest rounded-full mb-6">
            {post.category}
          </span>
          <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-tighter max-w-3xl mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light">{post.excerpt}</p>
        </div>
      </header>

      {/* Article body */}
      <section className="max-w-7xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <article className="lg:col-span-8">
            {/* Author bar */}
            <div className="flex items-center gap-4 mb-10 pb-8 border-b border-outline-variant/20">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-lg">
                {post.author?.[0] ?? 'S'}
              </div>
              <div>
                <p className="font-bold text-on-surface">{post.author ?? 'Shiva Grand Team'}</p>
                <p className="text-sm text-on-surface-variant">
                  {formatDate(post.publishedAt)} • {post.readTime} min read
                </p>
              </div>
            </div>

            {/* Portable Text body */}
            <div className="prose-stone max-w-none">
              {post.body ? (
                <PortableText value={post.body} components={portableComponents as never} />
              ) : (
                <p className="text-on-surface-variant italic">No content yet.</p>
              )}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="bg-surface-container-low p-8 rounded-xl sticky top-28 border border-outline-variant/10">
              {related.length > 0 && (
                <>
                  <h4 className="text-xl font-bold mb-6">You might also like</h4>
                  <div className="space-y-8">
                    {related.map((r: { _id: string; title: string; slug: { current: string }; mainImage?: { asset: { _ref: string }; alt?: string }; excerpt?: string }) => (
                      <Link key={r._id} className="group block" href={`/blog/${r.slug.current}`}>
                        <div className="aspect-video rounded-lg overflow-hidden mb-3 relative">
                          {r.mainImage ? (
                            <Image
                              src={urlFor(r.mainImage).width(400).height(225).url()}
                              alt={r.mainImage.alt ?? r.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-primary/10" />
                          )}
                        </div>
                        <h5 className="font-bold group-hover:text-primary transition-colors line-clamp-2">{r.title}</h5>
                        {r.excerpt && <p className="text-sm text-on-surface-variant mt-2 line-clamp-2">{r.excerpt}</p>}
                      </Link>
                    ))}
                  </div>
                </>
              )}

              <div className="mt-10 pt-10 border-t border-outline-variant/20">
                <div className="bg-primary/10 p-6 rounded-xl">
                  <h5 className="font-bold text-primary mb-2">Book Your Stay</h5>
                  <p className="text-sm text-on-surface-variant mb-4">Stay steps away from the best of Coimbatore. Rooms from ₹1,500.</p>
                  <Link href="/rooms" className="block w-full text-center bg-primary text-white py-3 rounded-full font-bold shadow-md hover:bg-[#1e4d33] transition-colors">
                    Reserve Now
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA bottom */}
      <section className="mt-24 bg-surface-container-low py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Enjoyed this article?</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto mb-8">
            Explore more stories from the heart of Coimbatore.
          </p>
          <Link href="/blog" className="inline-block px-8 py-3 rounded-full bg-primary text-white font-bold shadow-lg hover:opacity-90 transition-all">
            Back to Blog
          </Link>
        </div>
      </section>
    </main>
  )
}
