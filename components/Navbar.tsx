'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/rooms', label: 'Rooms' },
  { href: '/local-guide', label: 'Local Guide' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()

  const activeClass =
    'text-[#0d5533] dark:text-[#a7f3c3] font-semibold border-b-2 border-[#0d5533] dark:border-[#a7f3c3] pb-1'
  const inactiveClass =
    'text-zinc-600 dark:text-zinc-400 font-medium hover:text-[#2c6e49] dark:hover:text-[#4c956c] transition-colors'

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-sm dark:shadow-none font-['Manrope'] antialiased">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-20">
        <Link
          className="text-2xl font-bold tracking-tight text-[#0d5533] dark:text-[#a7f3c3]"
          href="/"
        >
          Shiva Grand
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={pathname === href ? activeClass : inactiveClass}
            >
              {label}
            </Link>
          ))}
        </div>
        <Link
          href="/booking"
          className="inline-block text-center bg-[#2C6E49] text-white px-6 py-2.5 rounded-lg font-bold text-sm tracking-wide hover:opacity-90 transition-all duration-300 active:scale-95"
        >
          Book Now
        </Link>
      </div>
    </nav>
  )
}
