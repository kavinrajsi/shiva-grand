@AGENTS.md

## Claude Code specifics

The shared agent rules above (`@AGENTS.md` import) are the authoritative source. Notes that only apply when working through Claude Code:

- **Default to no comments and no docstrings** unless the *why* is non-obvious. Don't restate what the code does.
- **Don't introduce TypeScript** without asking — this project is intentionally JavaScript with `jsconfig.json` + auto-generated `types/*.d.ts`.
- **Use Tailwind v4 utilities** for new styling by default. Reach for CSS Modules only when utilities don't fit (complex animations, deeply scoped tweaks).
- **Memory & secrets**: never put values from `.env*` into committed code, memory files, or chat summaries.
- **Verify before claiming UI works**: `npm run dev` and open `http://localhost:3000` rather than relying on type-check / lint alone.
