import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-24 md:pb-12 border-t border-primary-container">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <h3 className="text-2xl font-bold tracking-tighter">Hotel Shiva Grand</h3>
          <p className="text-white/80 max-w-sm leading-relaxed">
            A Comfortable Stay, Every Time
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/60">Quick Links</h4>
          <ul className="space-y-4 text-sm text-white/80">
            <li><Link className="hover:underline" href="/rooms">Rooms</Link></li>
            <li><Link className="hover:underline" href="/blog">Blog</Link></li>
            <li><Link className="hover:underline" href="/local-guide">Local Guide</Link></li>
            <li><Link className="hover:underline" href="/contact">Contact</Link></li>
            <li><Link className="hover:underline" href="/">Home</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/60">Contact</h4>
          <ul className="space-y-4 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm">location_on</span>
              <span>54, Old Post Office Rd, Near Collector Office, Gopalapuram, Coimbatore, Tamil Nadu 641018</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">call</span>
              <span>090477 57777</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-20 pt-8 border-t border-white/10 text-center text-xs text-white/60">
        © 2026 Hotel Shiva Grand. All rights reserved.
      </div>
    </footer>
  )
}
