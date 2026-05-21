# Shiva Grand Residency

Marketing and booking website for Shiva Grand Residency — a hotel in Coimbatore, Tamil Nadu.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 + custom design tokens |
| CMS | Sanity v3 (blog content) |
| Database | Supabase (form submissions) |
| Email | Resend (transactional emails) |
| Font | Manrope via `next/font/google` |
| Icons | Material Symbols Outlined via Google Fonts CDN |

---

## Pages

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Home — hero, room preview, gallery, testimonials, booking CTA |
| `/rooms` | `app/rooms/page.tsx` | Room showcase + booking form |
| `/booking` | `app/booking/page.tsx` | Booking confirmation / pending screen |
| `/contact` | `app/contact/page.tsx` | Contact info + enquiry form |
| `/local-guide` | `app/local-guide/page.tsx` | Coimbatore attractions and travel tips |
| `/blog` | `app/blog/page.tsx` | Blog listing — fetches from Sanity CMS |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Dynamic blog post — rendered from Sanity Portable Text |
| `/studio` | `app/studio/[[...tool]]/page.tsx` | Sanity Studio admin panel |

---

## Forms & API Routes

All forms have client-side inline validation and server-side validation. Submissions are rate-limited to 5 requests/minute per IP.

| Route | File | Description |
|---|---|---|
| `POST /api/booking` | `app/api/booking/route.ts` | Saves to Supabase, sends user confirmation + admin email |
| `POST /api/contact` | `app/api/contact/route.ts` | Saves to Supabase, sends user confirmation + admin email |

---

## Components

| Component | Description |
|---|---|
| `components/Navbar.tsx` | Fixed top nav with active route highlighting |
| `components/Footer.tsx` | Site footer |
| `components/BookingForm.tsx` | Booking inquiry form used on the home page |
| `components/RoomsForm.tsx` | Room reservation form used on the rooms page |
| `components/ContactForm.tsx` | Contact enquiry form used on the contact page |

---

## Sanity CMS (Blog)

Blog posts are managed via Sanity Studio at `/studio`.

**Schema fields:** title, slug, author, category, publishedAt, readTime, featured, excerpt, mainImage, body (Portable Text)

**Categories:** Local Flavors, Travel Tips, Guest Story, Hidden Gems, Local Guide

**Queries:** `sanity/lib/queries.ts` — all posts, featured post, post by slug, related posts

---

## Environment Variables

Create a `.env.local` file at the project root:

```env
# Resend (email)
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=bookings@shivagrand.com

# Admin notifications
ADMIN_EMAIL=admin@shivagrand.com
EMAIL_CC=                        # optional, comma-separated
EMAIL_BCC=                       # optional, comma-separated

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
```

---

## Supabase Schema

Run `supabase/migrations/001_create_tables.sql` in the Supabase SQL editor to create the required tables:

- `booking_inquiries` — stores room booking enquiries
- `contact_submissions` — stores contact form messages

---

## Running Locally

```sh
npm install
npm run dev
# open http://localhost:3000
```

**Sanity Studio** is available at `http://localhost:3000/studio` once the `NEXT_PUBLIC_SANITY_PROJECT_ID` env var is set.

---

## Brand

- **Primary colour:** `#2C6E49` (green)
- **Secondary colour:** `#0d5533` (dark green)
- **Font:** Manrope (200–800 weight)
- **Images:** hosted on `lh3.googleusercontent.com` — do not download or inline them
