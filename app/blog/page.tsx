import Link from 'next/link'

export default function Blog() {
  return (
    <main className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <span className="text-primary font-bold tracking-[0.2em] text-[0.75rem] uppercase mb-4 block">
              The Residency Journal
            </span>
            <h1 className="text-[3.5rem] font-extrabold leading-[1.1] tracking-tighter text-on-surface mb-6">
              Stories from the <br />
              <span className="text-primary">Heart of Coimbatore</span>
            </h1>
            <p className="text-on-surface-variant text-lg max-w-xl leading-relaxed">
              Discover hidden culinary gems, travel essentials, and heartwarming guest experiences from our urban
              sanctuary.
            </p>
          </div>
          <div className="lg:col-span-5 hidden lg:block">
            <div className="bg-surface-container-low p-8 rounded-xl relative overflow-hidden">
              <div className="absolute -right-10 -top-10 opacity-10">
                <span className="material-symbols-outlined text-[12rem]">eco</span>
              </div>
              <p className="relative z-10 text-on-surface-variant italic font-medium">
                &quot;A clean and practical stay that offers exceptional value for money. The proximity to the station
                and the local food guides provided by the staff made it perfect for budget-conscious travelers.&quot;
              </p>
              <div className="mt-4 flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold">
                  A
                </div>
                <div>
                  <p className="text-sm font-bold">Ananya R.</p>
                  <p className="text-xs text-on-surface-variant">Business Traveler</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Story (Asymmetric Layout) */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="relative group cursor-pointer overflow-hidden rounded-xl">
          <div className="aspect-[21/9] w-full bg-surface-container-high overflow-hidden">
            <img
              alt="Coimbatore Local Food"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              data-alt="Vibrant South Indian breakfast spread with dosa and culinary details"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKMQoT3mzboobWfQKFiIYC40DJsHLTtz8jupDRlRpvb24xp7IbBJy2eTA0soTBcA-R_3EMHtCylcijwSfnVZ5d-ak9zTNhiCAg8GunjI9NuiJfSf3tgGhENsA5QQKxY1LWDhvd1CGgvvouCSzYlVe2wVG_TMWCBIGJaPmxAgM95nme--0SR_8U7MOb8UoLt5A0vMN0dkl1qeROXVtdUJOUBRDpuTBZRex5FVfyBZHyZwIri6J73fkvXaNAxOS04J82J_joqo9sPC1O"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
            <div className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-wider mb-4">
              LOCAL FLAVORS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              5 Authentic Eateries within 1km of Shiva Grand
            </h2>
            <p className="text-white/80 text-lg mb-6 line-clamp-2">
              From the perfect filter coffee to the legendary Ghee Roast, here is your walking guide to the best flavors
              of Coimbatore&apos;s main junction.
            </p>
            <span className="text-white font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
              Read Story <span className="material-symbols-outlined">arrow_forward</span>
            </span>
          </div>
        </div>
      </section>
      {/* Blog Grid (Bento Style/Asymmetric) */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Post 1 */}
        <div className="flex flex-col gap-4 group">
          <div className="aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-low relative">
            <img
              alt="Travel Tips"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              data-alt="Person looking at a map on a wooden table with camera"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvMGBUe7QZ6wM5xKErPxEdiD9jgI_qHhSMiVWpP85Z1PrhVUp6LHvr9L7xakNvpM0BdgJveaFszyEuSWvSujDgcUdsvb-2ApyJGK3ZokvAx630K7QFGxlzr56SU10BVOHXLRDqw3vue2ddVGgw8CBN6jCe3ZjnWscdSVNS9YE55v1Rr2xw2EGqg1HjVF4gGdS8JsDXI7U2y6s22YK2jieQ-4W829ain_k8oAICD6ABtEi41MRXDRy06Bz7SX6FH3TGsxfi5sxNtlRA"
            />
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-primary">
              TRAVEL TIPS
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              A Smart Traveler&apos;s Guide to Coimbatore Railway Station
            </h3>
            <p className="text-on-surface-variant text-sm line-clamp-2">
              Navigating the junction can be tricky. Here&apos;s how to save time and stay stress-free on your transit.
            </p>
            <div className="mt-4 flex items-center justify-between text-[11px] font-bold text-outline uppercase tracking-wider">
              <span>5 MIN READ</span>
              <span>MAY 12, 2024</span>
            </div>
          </div>
        </div>
        {/* Post 2 */}
        <div className="flex flex-col gap-4 group">
          <div className="aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-low relative">
            <img
              alt="Guest Story"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              data-alt="Cozy well-lit hotel room interior with soft shadows"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6dno-hg4Gc3anqNKxxfrXjPwxpQFCtv16q4xv1SvgjudCUEXzlQaIv58T43LFfmdzznphkVGTjMtQwQEI4xmKocYkD4WMmX6N--6QR5TJnIl3iHdMYQsCnbYo_m_cynB3qFKULfu_mRQdYYpLjTK44LYnTFDatipG4ykBIAnTdTE8mm_QR1vXcdjwSEQ1oVoqvcWGLN463dcWTdyx8yAsD8VUpIzAqh2MDaNTB0sVjIpXrUJRn8DgHyqwE5DrkljTHsy3OvqVLtOr"
            />
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-primary">
              GUEST STORY
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              Finding Peace in the City Center: My Weekend at Shiva Grand
            </h3>
            <p className="text-on-surface-variant text-sm line-clamp-2">
              How a business trip turned into a relaxing getaway thanks to the botanical ambiance and hospitality.
            </p>
            <div className="mt-4 flex items-center justify-between text-[11px] font-bold text-outline uppercase tracking-wider">
              <span>8 MIN READ</span>
              <span>APR 28, 2024</span>
            </div>
          </div>
        </div>
        {/* Post 3 */}
        <div className="flex flex-col gap-4 group">
          <div className="aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-low relative">
            <img
              alt="Nature"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              data-alt="Lush green tropical plants in a courtyard"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5n2GFPHcLgddV57nxEQfjdGCdGKYEjU2VNF37UpZ4dxF9lx3JWf1fIdEc1bB_WCuzPvnRa9t3PsFEXB61qfB4DTVBsjXNCzdMW7x9ElJvKhVzgtq0177q2-mZ6m2rnHiYwlwd8SRB3t9Qu1WlLP92IKq06SbP7xEr3_z36Kjn31Vqo3gHm_foei_Q56PzRif42mo-gYMdIg6ll4Pi4-408_ifCTonaM76LMKDxA55fG66Uo_cJSU6t8NlzwmXchWHN8unqvef4ihj"
            />
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-primary">
              HIDDEN GEMS
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              3 Botanical Parks in Coimbatore You Must Visit
            </h3>
            <p className="text-on-surface-variant text-sm line-clamp-2">
              Escape the concrete jungle and breathe fresh air at these local green sanctuaries just minutes away.
            </p>
            <div className="mt-4 flex items-center justify-between text-[11px] font-bold text-outline uppercase tracking-wider">
              <span>4 MIN READ</span>
              <span>APR 15, 2024</span>
            </div>
          </div>
        </div>
      </section>
      {/* Pagination / Load More */}
      <div className="max-w-7xl mx-auto px-6 mt-16 text-center">
        <button className="px-10 py-4 border-2 border-outline-variant text-on-surface-variant font-bold rounded-full hover:bg-surface-container-low transition-colors inline-flex items-center gap-3 group">
          Show More Stories
          <span className="material-symbols-outlined group-hover:rotate-180 transition-transform">expand_more</span>
        </button>
      </div>
    </main>
  )
}
