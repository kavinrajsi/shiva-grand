# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

Static marketing site for Shiva Grand Residency (hotel in Coimbatore). Plain HTML + Tailwind via CDN — no build step, no package manager, no framework.

## File layout

All pages live at the repo root. There is no `src/`, no `dist/`, no asset pipeline.

- `index.html` — home
- `book-you-stay.html` — rooms / booking entry
- `booking.html` — booking confirmation
- `local-guide.html` — local guide content
- `blog.html` — blog listing
- `blog-detail.html` — single article view
- `contact-us.html` — contact info

## Conventions

- **Styling**: Tailwind utility classes inline on elements. Brand color is `#0d5533` / `#2c6e49` (primary green). Font is Manrope.
- **Cross-page nav**: top nav bar and footer link lists are duplicated on every page. When changing nav links, update all pages.
- **Icons**: Material Symbols Outlined, loaded via Google Fonts.
- **Images**: hosted on Google's `lh3.googleusercontent.com` CDN — do not download / inline them.

## Running

Open any HTML file directly in a browser, or `python3 -m http.server 8000`.

## Things to be careful about

- Tailwind is loaded via CDN — there is no `tailwind.config.js`. Custom colors used in classes (e.g. `text-primary`, `bg-surface`) rely on a config that may not be present; if styles look wrong, that's why.
- The same nav/footer markup is repeated across all 7 HTML files. There is no template engine — edits must be applied to each file (consider perl/sed for repeated patterns).
