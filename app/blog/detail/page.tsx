import Link from 'next/link'

export default function BlogDetail() {
  return (
    <main className="pt-20">
      <header className="relative w-full h-[716px] flex items-end overflow-hidden">
        <img
          alt="Ghee Roast Dosa"
          className="absolute inset-0 w-full h-full object-cover"
          data-alt="Crispy golden ghee roast dosa served on a banana leaf"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAo3kIdmWY_vUQ4ebJZAw-h1rwJC0t5P7_iybSFJ54w4u-1okWqnqRQFmU_N6HTKkNm4NU4tkddYc9RXr_6N5i0hlBdeVxUT5dqM9TOFXzFPI4Cz4m6I5EEEX2yIYhFl2lHwNdRTxYItU_J3_hAi9-WAWkxzqIjhrKRUmUVI4hj1-rkcRKKSNJrXaBdf75F9OPJK-fTPCRFBmsb2asaJqN8dA2PkfvU-WpwBk2pklPamg-DomMxZXre4iedNB85KYrRsHGaKfy9QT9p"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6 pb-16 w-full">
          <span className="inline-block px-3 py-1 bg-primary text-on-primary text-[0.75rem] font-bold uppercase tracking-[0.05em] rounded-full mb-6">
            Local Guide
          </span>
          <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-tighter max-w-3xl mb-4 leading-tight">
            5 Authentic Eateries within 1km of Shiva Grand
          </h1>
          <p className="text-emerald-50/90 text-lg md:text-xl max-w-2xl font-light">
            Embark on a culinary journey through Coimbatore&apos;s most cherished local flavors, all just a short walk
            from your stay.
          </p>
        </div>
      </header>
      <section className="max-w-7xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <article className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-10 pb-8 border-b border-outline-variant/20">
              <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden">
                <img
                  alt="Arjun K. Varma"
                  data-alt="Portrait of the travel writer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDU1iXj0JpXegxn7l2H0bQKDEEODuH8dUBFmy9a0bOqgVaCvla9ewcJqUcZ6pFimYNGGxieZwsduJb-Hyq0D-FDMHgl_U07W66svyVDinx_tWFJGPyeG51zPFMhXLPnNgL0doTRLMLJO0ghDRy8gr2TRhQ9Np-fPbBwiEYfttP9buxxMWiWnli8UM88C2awU2TRffAoas55qxFDs-PpNmI85n04kKmq6uc46TpSiNPdKCH_QLN2EHLic4Ib2VKjCIgVSOKv7LH6Tvuu"
                />
              </div>
              <div>
                <p className="font-bold text-on-surface">Arjun K. Varma</p>
                <p className="text-sm text-on-surface-variant leading-none">
                  Food &amp; Travel Writer • Oct 24, 2023 • 6 min read
                </p>
              </div>
            </div>
            <div className="prose prose-stone prose-lg max-w-none text-on-surface-variant leading-relaxed">
              <p className="text-xl leading-relaxed text-on-surface mb-8 italic border-l-4 border-primary pl-6 py-2">
                Coimbatore, the Manchester of South India, is not just about textiles and industry. It is a melting pot
                of flavors, where the Kongu Nadu cuisine meets modern culinary artistry.
              </p>
              <p className="mb-12">
                Staying at Shiva Grand Residency places you in the heart of the city&apos;s food district. From the
                aromatic filter coffee of heritage establishments to the spicy biryanis that define the region, you
                don&apos;t need a cab to find world-class South Indian food. Here are our top 5 picks located within a
                1km radius of the sanctuary.
              </p>
              <div className="space-y-16">
                <div className="group relative">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[0.7rem] font-bold text-primary uppercase tracking-widest">
                        0.4 km • 5 mins walk
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-on-surface mb-2">1. Sree Annapoorna</h3>
                    <p className="text-on-surface-variant mb-4">
                      A Coimbatore legend. You haven&apos;t truly visited the city until you&apos;ve tasted their
                      signature Sambar. The atmosphere is bustling and authentic.
                    </p>
                    <div className="bg-surface-container-low p-4 rounded-xl">
                      <p className="text-sm font-bold text-on-surface mb-1">Must Order:</p>
                      <p className="text-sm text-on-surface-variant">
                        The Ghee Roast Dosa and their world-famous Filter Coffee.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="group relative">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[0.7rem] font-bold text-primary uppercase tracking-widest">
                        0.7 km • 8 mins walk
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-on-surface mb-2">2. Haribhavanam</h3>
                    <p className="text-on-surface-variant mb-4">
                      If you are in the mood for authentic Kongu-style non-vegetarian fare, this is the destination.
                      Located right at the main junction, it&apos;s a meat lover&apos;s paradise.
                    </p>
                    <div className="bg-surface-container-low p-4 rounded-xl">
                      <p className="text-sm font-bold text-on-surface mb-1">Must Order:</p>
                      <p className="text-sm text-on-surface-variant">Pallipalayam Chicken and Mutton Biryani.</p>
                    </div>
                  </div>
                </div>
                <div className="group relative">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[0.7rem] font-bold text-primary uppercase tracking-widest">
                        0.9 km • 12 mins walk
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-on-surface mb-2">3. Valarmathi Mess</h3>
                    <p className="text-on-surface-variant mb-4">
                      A humble &apos;mess&apos; style eatery that punches way above its weight class in flavor. Expect
                      long queues during lunch—a testament to its quality.
                    </p>
                    <div className="bg-surface-container-low p-4 rounded-xl">
                      <p className="text-sm font-bold text-on-surface mb-1">Must Order:</p>
                      <p className="text-sm text-on-surface-variant">
                        The full South Indian Lunch Meal on a banana leaf.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="group relative">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[0.7rem] font-bold text-primary uppercase tracking-widest">
                        0.3 km • 4 mins walk
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-on-surface mb-2">4. Bird on Tree</h3>
                    <p className="text-on-surface-variant mb-4">
                      For those seeking a more fine-dining experience with global options, this lush, garden-themed
                      restaurant offers a serene escape.
                    </p>
                    <div className="bg-surface-container-low p-4 rounded-xl">
                      <p className="text-sm font-bold text-on-surface mb-1">Must Order:</p>
                      <p className="text-sm text-on-surface-variant">Their Thai Green Curry and signature Desserts.</p>
                    </div>
                  </div>
                </div>
                <div className="group relative">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[0.7rem] font-bold text-primary uppercase tracking-widest">
                        0.1 km • 2 mins walk
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-on-surface mb-2">
                      5. The Residency Junction Street Food
                    </h3>
                    <p className="text-on-surface-variant mb-4">
                      Sometimes, the best food is found right on the curb. In the evenings, the junction comes alive
                      with vendors selling local snacks.
                    </p>
                    <div className="bg-surface-container-low p-4 rounded-xl">
                      <p className="text-sm font-bold text-on-surface mb-1">Must Order:</p>
                      <p className="text-sm text-on-surface-variant">
                        Kaalan (Coimbatore-style mushroom fry) and Chilli Bajji.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <aside className="lg:col-span-4 space-y-12">
            <div className="bg-surface-container-low p-8 rounded-xl sticky top-28 border border-outline-variant/10">
              <h4 className="text-xl font-bold mb-6">You might also like</h4>
              <div className="space-y-8">
                <Link className="group block" href="/blog">
                  <div className="aspect-video rounded-lg overflow-hidden mb-3">
                    <img
                      alt="Parks"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      data-alt="Lush green botanical garden with tropical trees"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhrOhszT66j0V_vNi8BqNLuZGK1TrmMkpsqJxIgJu2xznFJp3qn6k6g4SnDPD1p_dqTc9yB2lm6oPhQgTyA8-enXZbduT-oP5gFmbLNFkCC6cU_TwHog0d5wIuQmyoU53hOZq0LmHIYKnUTLdo_Zs7npT4099qcT4B1RRGG2vAFzttzoE63hTdFCSBEsYWt0A8AKtLY-mLmKC7hKP_L2lEq5m8wKNqpsmlojuDPA2Onu9OSkVJ5pW5Kr-sL2fJpoyH4TEIsM3kkp29"
                    />
                  </div>
                  <h5 className="font-bold group-hover:text-primary transition-colors">
                    3 Botanical Parks in Coimbatore for a Morning Walk
                  </h5>
                  <p className="text-sm text-on-surface-variant mt-2">
                    Discover the green lungs of our beautiful city.
                  </p>
                </Link>
                <Link className="group block" href="/blog">
                  <div className="aspect-video rounded-lg overflow-hidden mb-3">
                    <img
                      alt="Shopping"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      data-alt="Traditional South Indian silk sarees displayed"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOAbGYj3pmbEwAp11DL4S7wbTGLr2SQaIquFhSzeCx8vY3IrR0P5-Tlt8yGDo0HAnaRuad7rwW_fSbrCYu4kFGujQs-1icl5Q4cKbMzC2uSdpzZOD7N6miuBRf1sq_PJO7ZF0SXn4baF8mdnKis6KOWdm4OFhgLsrqjE34Ntev151XY1YSozpcR9d03cJ5LHQikVIWthvgIhDoeVx_d5A2ZwwoFDEXHJO54FSn3QOqXK1UITz0q95NDpjsizkz-H-Wag8r0PbfQmML"
                    />
                  </div>
                  <h5 className="font-bold group-hover:text-primary transition-colors">
                    A Silk Lover&apos;s Guide to Shopping in Coimbatore
                  </h5>
                  <p className="text-sm text-on-surface-variant mt-2">
                    Where to find the finest Kanchipuram and local weaves.
                  </p>
                </Link>
              </div>
              <div className="mt-12 pt-12 border-t border-outline-variant/20">
                <div className="bg-primary-container/30 p-6 rounded-xl">
                  <h5 className="font-bold text-primary mb-2">Book Your Sanctuary</h5>
                  <p className="text-sm text-on-secondary-container mb-4">
                    Stay steps away from these amazing eateries. Rooms starting at ₹1800.
                  </p>
                  <button className="w-full botanical-gradient text-on-primary py-3 rounded-full font-bold shadow-md active:scale-95 transition-transform">
                    Reserve Now
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <section className="mt-24 bg-surface-container-low py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="material-symbols-outlined text-4xl text-primary mb-4" data-weight="fill">
            restaurant
          </span>
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Craving something specific?</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto mb-8">
            Need help with your next stay? We can assist with future bookings ahead—just inform us at our reception
            desk.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 rounded-full border border-primary text-primary font-bold hover:bg-primary/5 transition-colors">
              Chat with us
            </button>
            <button className="px-8 py-3 rounded-full bg-primary text-on-primary font-bold shadow-lg hover:opacity-90 transition-all">
              Explore Full City Guide
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
