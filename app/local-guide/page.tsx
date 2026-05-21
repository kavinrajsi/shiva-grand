export default function LocalGuide() {
  return (
    <main className="pt-20">
      {/* Shortened Text-Only Header */}
      <section className="py-16 bg-surface-container-low border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-8">
          <span className="label-md text-primary font-bold tracking-[0.2em] uppercase mb-4 block">
            Coimbatore Local Guide
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-on-surface mb-6 leading-tight">
            Pulse of the <span className="text-primary">Manchester</span> of South.
          </h1>
          <p className="text-lg text-on-surface-variant leading-relaxed max-w-3xl font-medium">
            Strategically located near the Railway Station &amp; Collectorate, Shiva Grand serves as your gateway to
            Coimbatore&apos;s spiritual sanctuaries and urban treasures.
          </p>
        </div>
      </section>
      {/* Curated Attractions */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight mb-4">Curated Attractions</h2>
              <p className="text-on-surface-variant max-w-lg">
                Experience the perfect blend of Dravidian architecture, lush parks, and modern retail therapy—all within
                easy reach.
              </p>
            </div>
            <div className="hidden md:flex gap-4">
              <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <span className="material-symbols-outlined">west</span>
              </button>
              <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <span className="material-symbols-outlined">east</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[800px]">
            {/* Marudhamalai Temple */}
            <div className="md:col-span-8 group relative rounded-xl overflow-hidden bg-white shadow-sm transition-transform duration-500 hover:scale-[1.01]">
              <img
                alt="Ancient Indian temple architecture"
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwdDqFCBzbaEV4BsqxJt6gvnHU3Xz7rVhu0wEZTWcjQ7HKs1Hwrf_3er8vYVgiSV9J61P4PtYV9JXiRHe_Elh7vwJAPSzfeXmnSLaDpg7BvgRa7r1I9_vQof5zotye5b7KyAN1QOpKoZ4gNWzGl3P0nv5fa0PJNbGcdJPuRFC4MmQvucw4tvppXzCrXalNLbwVlhi_0nUYD_rCgLYXNNqJ0dd95RZplOLLZSg_UhTcxjg62fHCdijR9cqhwGbYrAnFAX0bo8ngWLXK"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="bg-surface/80 backdrop-blur-md inline-block px-3 py-1 rounded-full mb-4">
                  <span className="text-xs font-bold text-primary tracking-widest uppercase">Spiritual Heritage</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Marudhamalai Temple</h3>
                <p className="text-white/80 max-w-md">
                  Perched on a hill 15km away, this 12th-century Murugan temple offers panoramic views of the Western
                  Ghats.
                </p>
              </div>
            </div>
            {/* VOC Park */}
            <div className="md:col-span-4 group relative rounded-xl overflow-hidden bg-white shadow-sm transition-transform duration-500 hover:scale-[1.01]">
              <img
                alt="Lush green city park"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAX1xoai1Q4KOL0lS6s0iadq5axm1XJgp67j_m3cFFTWbetRr1v53A9VILwxHPhXga144ndcybTmWKa0bdamcGGle63XckC1mJBBNyCatmkhRFcS17sLlREGEF-5quTSjSc7sYRG-kx-7Tsvnsrsf5Os5PNLfZt9IWuBiTsNWYM59jPF7jS5wudXWCOq-i4HbInP_pY4buXkWyr3C77Zv7Pwdkr4JT2fQ3t5tGbcbcxlmSEQUB7-EzgpaFlei9pzhMHaQm-QmSNTwk1"
              />
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-all"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">VOC Park &amp; Zoo</h3>
                <p className="text-white/80 text-sm">
                  Perfect for morning walks. Features a mini zoo, toy train, and lush gardens only 10 mins away.
                </p>
              </div>
            </div>
            {/* Brookefields Mall */}
            <div className="md:col-span-4 group relative rounded-xl overflow-hidden bg-white shadow-sm transition-transform duration-500 hover:scale-[1.01]">
              <img
                alt="Modern shopping mall interior"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhu202OiEAWw9enxoI0Vae_-IAP3h727Owg4SIKawq84OA-n0e94XXICSHHciszwI9KJQVzHDU4aGieQA3k7HhXadjm7nPHcWN3EMymAfoOG0sJxNZchCULRwXlx1wcNaUqgWLf414vbA13wXEWrL3-_Rd6EGn_5nkYYQsrYxveGpq7IcQ54GR4fY_wA34mC8MtgJPdCS1GEEh334qmzz1iC1p24XVMQKgCKWFZRNUwlXJFgBYEAHkYDgmzuEsXRMQ0Bx55SPYRmqf"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                <span className="material-symbols-outlined text-white text-4xl mb-4">shopping_bag</span>
                <h3 className="text-2xl font-bold text-white mb-2">Brookefields Mall</h3>
                <p className="text-white/70 text-sm">Premier shopping destination for global brands and local delicacies.</p>
              </div>
            </div>
            {/* Perur Temple */}
            <div className="md:col-span-8 group relative rounded-xl overflow-hidden bg-white shadow-sm transition-transform duration-500 hover:scale-[1.01]">
              <div className="grid grid-cols-2 h-full">
                <div className="p-10 flex flex-col justify-center bg-white">
                  <span className="text-primary font-bold mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined" data-weight="fill">
                      location_on
                    </span>{' '}
                    7.5 KM Away
                  </span>
                  <h3 className="text-3xl font-extrabold mb-4">Perur Pateeswarar Temple</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    Famous for its architectural grandeur, particularly the &apos;Kanaka Sabha&apos; featuring
                    intricately carved stone pillars from the 2nd century.
                  </p>
                  <button className="mt-8 text-primary font-bold flex items-center gap-2 hover:translate-x-2 transition-transform">
                    Get Directions <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
                <div className="relative overflow-hidden">
                  <img
                    alt="Ancient stone pillars in a south indian temple"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6OGA9H5Pq7ETCqe2HMOGxp1xjQcYOP_xoVHnw340NKVhJKKNzMWx9aWFoASGcCx6XFmdCt7HpuA4BG95Bikfwtqw0L5M5y2ui1q4-1Y4SrNcxThewirNjRa2ZO6A3pLDeih1TC4V7EtkdAQytFm96cVg6WieXXktOW3mfXRug6Q7VzpoDbWHMf9ZqAkaMp8hH18La193b-BGMsXOxFr-CWu64ikvB04ht7RE3DxQPB0wVCIDDdV81U2uCg2Et2NutVrXAv8SZdgtN"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Travel Tips & Location */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight mb-8">Traveler&apos;s Handbook</h2>
              <div className="space-y-6">
                <div className="flex gap-6 p-6 bg-white rounded-xl shadow-sm border border-outline-variant/10">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">directions_car</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Local Commute</h4>
                    <p className="text-on-surface-variant text-sm">
                      Uber and Ola are highly reliable in Coimbatore. For an authentic experience, try the city
                      buses—they are known for being the most efficient in TN.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 p-6 bg-white rounded-xl shadow-sm border border-outline-variant/10">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">restaurant</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Must-Try Food</h4>
                    <p className="text-on-surface-variant text-sm">
                      Don&apos;t miss the Annapoorna Sambar and the famous &apos;Kalaan&apos; (spicy mushroom) street
                      food near VOC park.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 p-6 bg-white rounded-xl shadow-sm border border-outline-variant/10">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">sunny</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Best Time to Visit</h4>
                    <p className="text-on-surface-variant text-sm">
                      September to March offers pleasant weather. Avoid the peak summer months of April and May if
                      possible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 bg-white p-0 rounded-2xl shadow-2xl border border-outline-variant/10 overflow-hidden flex flex-col h-full">
              {/* Clean, expanded Map Container */}
              <div className="flex-grow relative min-h-[400px]">
                <img
                  alt="Map of Coimbatore Railway Station area"
                  className="w-full h-full object-cover grayscale contrast-125 brightness-95"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTgmFh_2aiICjQy45hcglgf7rDErFgZ6Qh8AI4mMT8GAKOrJlGnwfMXel2bX5iAYOKv4sp5L3yqEGP1RI7hJbcWurZoAHJk7qMjQyiJV1IVVaImGNTiX8TeNfx-m3lsrH7qPMaRWkG5zCOn-96GDUZvvFnmmb8KY_aour4HFQCDD3Bqoz1yMn8ZhRZS6a2tB_-v31ftgZrnXpqNX-ibIBsXBUvgK43UX26uqwsmKMfS15UFTk-S0B2fBlnmchgUmNwdApNTj0OPZmT"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-10 h-10 bg-primary/30 rounded-full animate-ping absolute -top-1 -left-1"></div>
                    <div className="w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-xs">home</span>
                    </div>
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap font-bold text-sm border border-outline-variant/10">
                      Shiva Grand Residency
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white border-t border-outline-variant/10 space-y-4">
                <div className="flex justify-between items-center text-sm border-b border-outline-variant/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">train</span>
                    <span className="text-on-surface-variant">Railway Station</span>
                  </div>
                  <span className="font-bold text-primary">5 mins walk</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-outline-variant/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">apartment</span>
                    <span className="text-on-surface-variant">Collectorate</span>
                  </div>
                  <span className="font-bold text-primary">2 mins walk</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">flight_takeoff</span>
                    <span className="text-on-surface-variant">Airport (CJB)</span>
                  </div>
                  <span className="font-bold text-primary">25 mins drive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 max-w-7xl mx-auto px-8">
        <div className="botanical-gradient rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 relative z-10">Ready to explore Coimbatore?</h2>
          <p className="text-lg text-white/90 mb-10 max-w-xl mx-auto relative z-10">
            Stay at the heart of the city with rooms starting from 1500 INR. Comfort &amp; convenience both under one
            roof.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center relative z-10">
            <button className="bg-white text-primary px-10 py-4 rounded-lg font-bold text-lg hover:bg-surface-container transition-colors">
              Book Your Stay
            </button>
            <button className="border-2 border-white/30 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors">
              Download City Map
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
