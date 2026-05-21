import RoomsForm from '@/components/RoomsForm'

export default function Rooms() {
  return (
    <main className="pt-28">
      {/* Hero Section with Room Selection */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Room Selection Area */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative group">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg bg-surface-container">
                <img
                  alt="Selected Room"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZLuQ5lCT22yd5ejTUAbgipYSuBPv4r4UPyVPevFYCcRZwm_lSQn8Zd8DHRyzbp4E4NX6cHJsEnRlbND8_ttXF1nEQcsOjMV38FinviCAdKp62fIRg7ceV3xowH8dS0-pQ7pSecOnxM_rmUSTqgZoGuojbsP9Ceo47uWKf9B4vQ24RS1KttLUf9gMDIKKFP1w7c_BSjo7O66u-7incPNZxz2QCOyi0EOMXVHPg0Ofe_W4ip8mSH3xhLecMwp_uswCSjxUzJz8ateHf"
                />
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                    Selected Room
                  </p>
                  <p className="text-lg font-bold text-primary">Deluxe AC Room</p>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-low p-6 rounded-2xl space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">
                  Select Room Category
                </label>
                <div className="relative">
                  <select className="w-full bg-white border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary px-4 py-3 text-sm appearance-none cursor-pointer">
                    <option>Standard Double</option>
                    <option defaultValue="">Deluxe AC</option>
                    <option>Premium Family</option>
                    <option>Executive Suite</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                    expand_more
                  </span>
                </div>
              </div>
              <button className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white py-3.5 rounded-xl font-bold tracking-wide transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-xl">sync_alt</span>
                Change Room Type
              </button>
            </div>
          </div>
          {/* Right Column: Booking Form */}
          <RoomsForm />
        </div>
      </section>
      {/* Our Curated Rooms Section */}
      <section className="bg-surface-container-low py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="label-md uppercase tracking-[0.2em] text-secondary font-bold text-xs">
                Stay in Excellence
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tighter text-primary mt-2">
                Our Curated Rooms
              </h2>
            </div>
            <button className="text-primary font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
              View All Categories{' '}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Standard Double */}
            <div className="group">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-surface-container shadow-sm mb-6 transition-transform duration-500 hover:scale-[1.02]">
                <img
                  alt="Standard Double Room"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8KHTiQVTOog-9_Rok5v_lrnzM8aHMIoALDnVkb5K1dmNp0sqJg5HVmu-NwV5oDb6YxRlSMiQVyGPWSCKvdMnHg15YETGIZnR2bgvPjkvZ9osDCvWkIZJCEAXPBcUnTaj1PAH_0HM3KixSq2TfNjvfw99gA2YE9uAy0PxhO_60TwDTRLK1FGqitlzzIGnmtkwsMeweVgIdrG5XQO8_rG4k9l7n8OxBjd4foqX1MxDfdUQj2LfgxoJ8jeiI4j9ym0MaBzwfIi5brIOq"
                />
                <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full">
                  <span className="text-[10px] font-bold tracking-widest text-primary uppercase">Standard</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Standard Double</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                Perfect for solo travelers or couples seeking a quiet retreat.
              </p>
              <div className="flex items-center gap-4 text-xs font-bold text-secondary">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">wifi</span> Free Wifi
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">ac_unit</span> Non-AC
                </span>
              </div>
            </div>
            {/* Deluxe AC */}
            <div className="group">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-surface-container shadow-sm mb-6 transition-transform duration-500 hover:scale-[1.02]">
                <img
                  alt="Deluxe AC Room"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZLuQ5lCT22yd5ejTUAbgipYSuBPv4r4UPyVPevFYCcRZwm_lSQn8Zd8DHRyzbp4E4NX6cHJsEnRlbND8_ttXF1nEQcsOjMV38FinviCAdKp62fIRg7ceV3xowH8dS0-pQ7pSecOnxM_rmUSTqgZoGuojbsP9Ceo47uWKf9B4vQ24RS1KttLUf9gMDIKKFP1w7c_BSjo7O66u-7incPNZxz2QCOyi0EOMXVHPg0Ofe_W4ip8mSH3xhLecMwp_uswCSjxUzJz8ateHf"
                />
                <div className="absolute bottom-4 left-4 bg-secondary/80 backdrop-blur-md px-3 py-1 rounded-full">
                  <span className="text-[10px] font-bold tracking-widest text-on-primary uppercase">Most Popular</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Deluxe AC</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                Spacious interiors with premium amenities for the modern guest.
              </p>
              <div className="flex items-center gap-4 text-xs font-bold text-secondary">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">wifi</span> Free Wifi
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">ac_unit</span> Climate Control
                </span>
              </div>
            </div>
            {/* Premium Family */}
            <div className="group">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-surface-container shadow-sm mb-6 transition-transform duration-500 hover:scale-[1.02]">
                <img
                  alt="Premium Family Suite"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuARCVTykjNdNaZaZt7n_abtgj-5GKIVfsSvgMm5-9Ey1rtx6jM6AfJnw-EqQzctrBA1pRy14G5lXpMxPvAZXE8jWmqvIzoEl8hcSSzMgdjpl1isyWyKe12ClD7LFXW-tvHopexuzXOwKf-rxKvCh0ACilfURdEFhI9DPFEB9O5KM5Aqri87IIkVRdXH3iUTxuHHegcSMz_YsaXUnRLnhROWFRH3ENefg7nKvs9P-ZDI7M2Lkq0vr2Bxx2v_obD4tw-umuEmNbCcsDEN"
                />
                <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full">
                  <span className="text-[10px] font-bold tracking-widest text-primary uppercase">Premium</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Premium Family</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                Designed for families who value space, luxury, and togetherness.
              </p>
              <div className="flex items-center gap-4 text-xs font-bold text-secondary">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">group</span> 4 Adults
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">tv</span> Smart TV
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Centrally Located Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden h-[500px] shadow-sm relative grayscale hover:grayscale-0 transition-all duration-700">
              <img
                alt="Map of Coimbatore"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbFyCh0kqR7nN6eO4hXywN6hGMkzOf81eRNHFi-AGZu-Or1pZBEb7Jr-ofZ8yhLQGtHfvtejwscnkGhM5rnaMSx8RNMSLP8bo91DxgnvjjsUrtuKAT9rGzblEkJisyTeG7vK_ZlvxYSCr3JNIzCYUARFl7Hzgb3XbvUhroWlbOYCBFE4ZpFuRgkRVbvJqNgeWD1Q2srIADhKbO5Ql4UMFbXqYhtycAMRuCK_7cRqa831NQnflDznN8i3s5B-aNIhOzl2JVXMr8voOw"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <span className="label-md uppercase tracking-[0.2em] text-secondary font-bold text-xs">
                Prime Connectivity
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tighter text-primary mt-2">
                Centrally Located
              </h2>
            </div>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Situated in the heart of Coimbatore, we provide easy access to the city&apos;s business hubs, shopping
              centers, and transportation links.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-secondary-container">train</span>
                </div>
                <div>
                  <h4 className="font-bold text-primary">Railway Station</h4>
                  <p className="text-sm text-on-surface-variant">Only 1.5km away, 5 minutes by taxi.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-secondary-container">flight</span>
                </div>
                <div>
                  <h4 className="font-bold text-primary">International Airport</h4>
                  <p className="text-sm text-on-surface-variant">Located 12km away, 25 minutes commute.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-secondary-container">shopping_bag</span>
                </div>
                <div>
                  <h4 className="font-bold text-primary">Brookefields Mall</h4>
                  <p className="text-sm text-on-surface-variant">Walkable distance to the city&apos;s premier shopping.</p>
                </div>
              </div>
            </div>
            <button className="botanical-gradient text-on-primary px-8 py-3 rounded-full font-bold text-sm tracking-wide shadow-lg">
              Get Directions
            </button>
          </div>
        </div>
      </section>
      {/* BottomNavBar (Mobile) */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 md:hidden bg-white/90 dark:bg-stone-900/90 backdrop-blur-xl rounded-t-3xl z-50 shadow-[0_-12px_32px_rgba(25,28,27,0.06)]">
        <a
          className="flex flex-col items-center justify-center bg-emerald-100 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-100 rounded-full px-5 py-2 active:scale-90 transition-transform"
          href="#"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>
            bed
          </span>
          <span className="font-manrope text-[10px] uppercase tracking-widest font-bold mt-1">Rooms</span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-stone-500 dark:text-stone-400 px-5 py-2 hover:bg-stone-100 dark:hover:bg-stone-800 active:scale-90 transition-transform"
          href="#"
        >
          <span className="material-symbols-outlined">collections</span>
          <span className="font-manrope text-[10px] uppercase tracking-widest font-bold mt-1">Gallery</span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-stone-500 dark:text-stone-400 px-5 py-2 hover:bg-stone-100 dark:hover:bg-stone-800 active:scale-90 transition-transform"
          href="#"
        >
          <span className="material-symbols-outlined">restaurant</span>
          <span className="font-manrope text-[10px] uppercase tracking-widest font-bold mt-1">Dining</span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-stone-500 dark:text-stone-400 px-5 py-2 hover:bg-stone-100 dark:hover:bg-stone-800 active:scale-90 transition-transform"
          href="#"
        >
          <span className="material-symbols-outlined">location_on</span>
          <span className="font-manrope text-[10px] uppercase tracking-widest font-bold mt-1">Location</span>
        </a>
      </nav>
    </main>
  )
}
