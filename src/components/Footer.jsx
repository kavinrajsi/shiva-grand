"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HOTEL_ADDRESS,
  HOTEL_PHONE_DISPLAY,
  HOTEL_PHONE_TEL,
} from "@/lib/address";

const QUICK_LINKS = [
  { href: "/book-you-stay", label: "Rooms" },
  { href: "/blog", label: "Blog" },
  { href: "/local-guide", label: "Local Guide" },
  { href: "/contact-us", label: "Contact" },
  { href: "/", label: "Home" },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) return null;

  return (
    <footer className="bg-[#2C6E49] text-white pt-20 pb-24 md:pb-12 border-t border-[#2C6E49]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <h3 className="text-2xl font-bold tracking-tighter">
            Hotel Shiva Grand
          </h3>
          <p className="text-white/80 max-w-sm leading-relaxed">
            A Comfortable Stay, Every Time
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/60">
            Quick Links
          </h4>
          <ul className="space-y-4 text-sm text-white/80">
            {QUICK_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link className="hover:underline" href={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/60">
            Contact
          </h4>
          <ul className="space-y-4 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm">
                location_on
              </span>
              <span>{HOTEL_ADDRESS}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">call</span>
              <a
                href={`tel:${HOTEL_PHONE_TEL}`}
                className="hover:text-white transition-colors"
              >
                {HOTEL_PHONE_DISPLAY}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-20 pt-8 border-t border-white/10 text-center text-xs text-white/60">
        © 2026 Hotel Shiva Grand. All rights reserved.
      </div>
    </footer>
  );
}
