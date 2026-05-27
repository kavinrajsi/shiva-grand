"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/book-you-stay", label: "Rooms" },
  { href: "/local-guide", label: "Local Guide" },
  { href: "/blog", label: "Blog" },
  { href: "/contact-us", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();

  if (pathname?.startsWith("/studio")) return null;

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-emerald-900/5">
      <nav className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tighter text-emerald-900"
        >
          Shiva Grand
        </Link>

        <div className="hidden md:flex items-center gap-8 font-manrope text-sm font-medium tracking-wide">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={
                  isActive
                    ? "text-emerald-700 border-b-2 border-emerald-700 pb-1 transition-colors duration-300"
                    : "text-emerald-900/70 hover:text-emerald-900 transition-colors duration-300"
                }
              >
                {label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/book-you-stay"
          className="inline-block text-center bg-emerald-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-emerald-800 active:scale-95 transition-all"
        >
          Book Now
        </Link>
      </nav>
    </header>
  );
}
