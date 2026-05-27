// All GROQ queries used by the blog.

// Listing — newest first, excludes drafts.
export const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  readTime,
  publishedAt,
  mainImage,
  featured,
  "author": author->{name, role}
}`;

// One post by slug.
export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  readTime,
  publishedAt,
  mainImage,
  body,
  "author": author->{name, role, image}
}`;

// All slugs (for generateStaticParams).
export const POST_SLUGS_QUERY = `*[_type == "post" && defined(slug.current)][].slug.current`;

// Facility gallery items, ordered by `order` then creation date.
export const GALLERY_QUERY = `*[_type == "galleryItem" && (published == true || !defined(published))] | order(coalesce(order, 9999) asc, _createdAt asc) {
  _id,
  caption,
  image
}`;

// Published testimonials, ordered by `order` then creation date.
export const TESTIMONIALS_QUERY = `*[_type == "testimonial" && (published == true || !defined(published))] | order(coalesce(order, 9999) asc, _createdAt desc) {
  _id,
  name,
  role,
  quote,
  rating
}`;

// The single testimonial flagged for the Blog hero card.
export const BLOG_HERO_TESTIMONIAL_QUERY = `*[_type == "testimonial" && featuredOnBlog == true && (published == true || !defined(published))] | order(coalesce(order, 9999) asc, _createdAt desc)[0] {
  _id,
  name,
  role,
  quote
}`;

// Two related posts, excluding the current one.
export const RELATED_POSTS_QUERY = `*[_type == "post" && slug.current != $slug && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc)[0...2] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage
}`;
