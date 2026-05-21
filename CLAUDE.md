# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

Next.js 14 (App Router) marketing and booking website for Shiva Grand Residency — a hotel in Coimbatore, Tamil Nadu. TypeScript throughout. Tailwind CSS for styling. Sanity CMS for blog content. Supabase for form data. Resend for transactional email.

## File Layout

```
app/
  page.tsx                  — home page
  rooms/page.tsx            — rooms + booking form
  booking/page.tsx          — booking confirmation screen
  contact/page.tsx          — contact info + form
  local-guide/page.tsx      — Coimbatore attractions + tips
  blog/page.tsx             — blog listing (fetches from Sanity)
  blog/[slug]/page.tsx      — dynamic blog post (Sanity Portable Text)
  studio/[[...tool]]/       — Sanity Studio admin panel
  api/booking/route.ts      — POST: save booking + send emails
  api/contact/route.ts      — POST: save contact + send emails

components/
  Navbar.tsx                — fixed top nav ('use client' for usePathname)
  Footer.tsx                — site footer
  BookingForm.tsx           — home page booking form ('use client')
  RoomsForm.tsx             — rooms page booking form ('use client')
  ContactForm.tsx           — contact page form ('use client')

lib/
  supabase.ts               — createServerSupabase() — service role client for API routes
  email-templates.ts        — HTML email templates (booking + contact, user + admin)
  rate-limit.ts             — IP-based rate limiter (5 req/min, LRU cache)
  validations.ts            — server-side payload validators for both API routes

sanity/
  config.ts                 — Sanity client (next-sanity)
  lib/client.ts             — Sanity fetch client
  lib/image.ts              — urlFor() image URL builder
  lib/queries.ts            — GROQ queries
  schemas/blogPost.ts       — blog post document schema
  schemas/index.ts          — schema registry

supabase/
  migrations/001_create_tables.sql — booking_inquiries + contact_submissions tables

public/
  llms.txt                  — LLM site index (llmstxt.org format)
  llms-full.txt             — full site content for LLMs
```

## Conventions

- **Styling**: Tailwind utility classes. Brand color is `#2C6E49` / `#0d5533` (primary green). Font is Manrope loaded via `next/font/google`.
- **Navigation**: Use `<Link>` (from `next/link`) for all internal routes. Use `<a target="_blank" rel="noopener noreferrer">` for external URLs.
- **Images**: Hosted on `lh3.googleusercontent.com` CDN — do not download or inline them. Blog images come from `cdn.sanity.io`. Both domains are in `next.config.mjs` remotePatterns.
- **Icons**: Material Symbols Outlined, loaded via `<link>` in `app/layout.tsx`.
- **'use client'**: Only on components that use hooks or event handlers. Pages are server components by default.

## API Routes

Both routes enforce:
1. **Rate limiting** — 5 requests/minute per IP (returns 429)
2. **Server-side validation** — payload validated via `lib/validations.ts` (returns 400 with message)
3. **Supabase write** — uses service role key via `createServerSupabase()`
4. **Resend emails** — user confirmation + admin notification with optional CC/BCC

## Forms

All 3 forms (`BookingForm`, `RoomsForm`, `ContactForm`) have:
- Inline validation on blur, re-validates live as the user types after first blur
- Red border + error message for invalid fields, green border for valid
- Loading spinner during submission, success screen on completion
- Server error message if API returns non-2xx

## Sanity Blog

- Studio is at `/studio` — requires `NEXT_PUBLIC_SANITY_PROJECT_ID` in env
- Blog listing page (`/blog`) uses ISR with `revalidate = 60`
- Blog post page (`/blog/[slug]`) uses SSG via `generateStaticParams()`
- The `featured` boolean on a post makes it the hero on the blog listing page

## Environment Variables

All required vars are documented in `.env.local` (not committed). See README for the full list.

## Running

```sh
npm install
npm run dev      # http://localhost:3000
```

## Things to be Careful About

- Do not add a `'use client'` directive to a page or layout that imports server-only modules (Supabase service role client, Resend, etc.).
- The Sanity Studio page (`app/studio/[[...tool]]/page.tsx`) must have `export const dynamic = 'force-dynamic'` to prevent static generation.
- `.env.local` is in `.gitignore` — never commit it.
- When changing nav links, update `components/Navbar.tsx` — it is the single source of truth for navigation (no per-page duplication).
