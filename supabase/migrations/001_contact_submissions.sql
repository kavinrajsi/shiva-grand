-- Contact form submissions table.
-- The Next.js server action inserts via the service role key, which bypasses RLS.
-- RLS is enabled with no policies, so anon/authenticated keys cannot read or write.

create table if not exists public.contact_submissions (
    id          uuid primary key default gen_random_uuid(),
    created_at  timestamptz not null default now(),
    name        text not null,
    email       text not null,
    phone       text,
    message     text not null,
    ip          text,
    user_agent  text
);

create index if not exists contact_submissions_created_at_idx
    on public.contact_submissions (created_at desc);

create index if not exists contact_submissions_email_idx
    on public.contact_submissions (email);

alter table public.contact_submissions enable row level security;
