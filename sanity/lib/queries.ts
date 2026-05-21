import { groq } from 'next-sanity'

export const allPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author,
    category,
    publishedAt,
    readTime,
    featured,
    excerpt,
    mainImage
  }
`

export const featuredPostQuery = groq`
  *[_type == "blogPost" && featured == true] | order(publishedAt desc)[0] {
    _id,
    title,
    slug,
    author,
    category,
    publishedAt,
    readTime,
    excerpt,
    mainImage
  }
`

export const postBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    author,
    category,
    publishedAt,
    readTime,
    excerpt,
    mainImage,
    body
  }
`

export const allSlugsQuery = groq`
  *[_type == "blogPost"] { "slug": slug.current }
`

export const relatedPostsQuery = groq`
  *[_type == "blogPost" && slug.current != $slug] | order(publishedAt desc)[0...2] {
    _id,
    title,
    slug,
    category,
    mainImage,
    excerpt
  }
`
