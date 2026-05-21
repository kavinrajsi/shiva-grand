import Link from 'next/link'
import BookingForm from '@/components/BookingForm'

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            alt="Modern Residency Exterior"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida/ADBb0uiLzSlg-TAwy5wDZ3Xep7MOUxcsoCMmie3Zivhzkc7_CZ4IufuckxEjP3W2wgSCVhljwvNFbwyi3-mTPrqpzDoEBxQniVkc462ByiNKeaF_hnclCw7vXlM8RbLDDME_9LbC0ROMASnX5EJF_Mmk_5jtcmsom6PtI2U8oeZaGvXNl7tVBdOOvgVGbiIHuRANRI63odRJaRfJfmy-5KYewqwRDebf_yqtd-L6Al4k_44D9K0s_lhU7lWxGJBo8Fsrv4e9-PNHbDd-YA"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 px-6 max-w-7xl mx-auto w-full">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight max-w-3xl tracking-tight">
            A Comfortable Stay, Every Time
          </h1>
          <p className="text-white/90 text-lg md:text-xl mt-6 max-w-xl font-medium">
            Clean rooms and a hassle-free stay every time.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button className="bg-white text-primary px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-zinc-100 transition-colors">
              View Rooms
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors">
              Location Map
            </button>
          </div>
        </div>
      </section>
      {/* Booking Quick Bar */}
      <section className="relative z-20 -mt-16 px-6">
        <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl p-8 flex flex-col lg:flex-row gap-8 items-end border border-zinc-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <div className="flex flex-col gap-2">
              <label className="uppercase tracking-widest text-[10px] font-bold text-zinc-500">Check In</label>
              <input
                className="w-full border-zinc-200 rounded-lg py-3 focus:ring-primary focus:border-primary"
                type="date"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="uppercase tracking-widest text-[10px] font-bold text-zinc-500">Check Out</label>
              <input
                className="w-full border-zinc-200 rounded-lg py-3 focus:ring-primary focus:border-primary"
                type="date"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="uppercase tracking-widest text-[10px] font-bold text-zinc-500">Guests</label>
              <select className="w-full border-zinc-200 rounded-lg py-3 focus:ring-primary focus:border-primary">
                <option>1 Adult</option>
                <option>2 Adults</option>
                <option>Family Room</option>
              </select>
            </div>
          </div>
          <button className="w-full lg:w-auto bg-primary text-white px-10 py-4 rounded-lg uppercase tracking-widest text-sm font-bold hover:bg-[#1e4d33] transition-colors whitespace-nowrap">
            Enquire Now
          </button>
        </div>
      </section>
      {/* Strategic Location Section */}
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <span className="text-secondary font-bold text-sm tracking-widest uppercase">Connectivity First</span>
              <h2 className="text-4xl md:text-5xl font-bold text-on-surface mt-4 leading-tight">
                Perfectly Located for Business &amp; Travel.
              </h2>
            </div>
            <p className="text-zinc-600 text-lg leading-relaxed">
              Shiva Grand offers clean, comfortable, and reliable stays designed for your convenience. Whether
              you&apos;re traveling for work or leisure, we provide a space that feels just right.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-zinc-100">
                <span className="material-symbols-outlined text-secondary text-3xl">train</span>
                <div>
                  <p className="font-bold text-sm">Railway Station</p>
                  <p className="text-xs text-zinc-500">5 min walk</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-zinc-100">
                <span className="material-symbols-outlined text-secondary text-3xl">account_balance</span>
                <div>
                  <p className="font-bold text-sm">Collectorate</p>
                  <p className="text-xs text-zinc-500">1 min walk</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-zinc-200 rounded-2xl overflow-hidden shadow-lg">
              <img
                alt="Modern Room Interior"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIg12etvWx7wlL2FkymG0byyjhFQ4Vobv1p2irG7WBYHMaghEAbrGSBKXRlgsTg9UfZ2GVW4ZFbYCmTslDgtObnzqFzBzEREoaaqT00MPHFll60fna6nhq0ypUTkwk43xvNSXk8sMoydTlIur3BLlJxbH7C2wfpWnR6cxTwpCC1ox_rqpBaI0_4q5I-mZn9F_zGT5hZTdHAZy5osDXvV6DscSYaL9eS_u8J2zk-iJ6rDssFtlBofYUzeEjtpe97DnS2X6aL9crbydq"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-zinc-100 hidden sm:block">
              <p className="text-primary font-extrabold text-3xl">₹1,500+</p>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Starting Price / Night</p>
            </div>
          </div>
        </div>
      </section>
      {/* Room Categories */}
      <section className="py-24 bg-zinc-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-secondary font-bold text-sm tracking-widest uppercase">Stay Options</span>
              <h2 className="text-4xl font-bold mt-2">Clean &amp; Essential Rooms</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Room Card 1 */}
            <div className="bg-white rounded-xl overflow-hidden border border-zinc-200 group hover:shadow-lg transition-all">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  alt="Standard Double Room"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoaHAylQeH7kicD7prK7Q15mhGp3hFaebiudTMZFrrWPCzQGhSmZyrwKtHf02OqA6CSKtDCAOdJU3R_rsDz7CfxFhfV5zO3kG39dSmoh8dLEhYYzUMG-OXCuq53RJTX4X1x4TwEJJqfboOcgsCKs8u0iTOJfpOxsi8EhUaW9-OHC0HlhfzdWNmHBbano6h9L2lti91itWVc1WR8Nr0r77BMbGmxPbUi5o50jxyoWV_wznz9Jq5qHETBsK6NiXMLT8bKs5GGKI-XM7"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">Standard Double</h3>
                  <span className="text-primary font-bold">₹1,500</span>
                </div>
                <p className="text-zinc-500 text-sm mb-6">Perfect for solo travelers or couples needing a comfortable pitstop.</p>
                <button className="w-full py-3 bg-zinc-100 text-zinc-800 rounded-lg font-bold text-sm hover:bg-zinc-200 transition-colors">
                  Book Standard
                </button>
              </div>
            </div>
            {/* Room Card 2 */}
            <div className="bg-white rounded-xl overflow-hidden border border-zinc-200 group hover:shadow-lg transition-all">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  alt="Deluxe AC Room"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU9rqlVfSpasG92DxbJwWHHdf1Ch2EIxgd8jj2uFnKB6CSPuJVHuPmkncSfotMsZZVOe50LFXBAzP3usAYU6Sp-HVwgWJQR_AYh7UGTpRxeU7qAQ9tFNMGXWmhcsDorUdqrzJs3Gb_clF9OaKJM4Wfneo_GsOnHhoYc-zCpoAuvCIOulqp_RKQ9grqlJUnpvyrEg2_m2O6OZOUwe8sS-BcWArQtvfskuze0gxz2ebwukI5JwYzkejbtX8pZP__1bR9e8_LmQL85Yvc"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">Deluxe AC</h3>
                  <span className="text-primary font-bold">₹1,850</span>
                </div>
                <p className="text-zinc-500 text-sm mb-6">Enhanced comfort with climate control and premium workspace.</p>
                <button className="w-full py-3 bg-zinc-100 text-zinc-800 rounded-lg font-bold text-sm hover:bg-zinc-200 transition-colors">
                  Book Deluxe
                </button>
              </div>
            </div>
            {/* Room Card 3 */}
            <div className="bg-white rounded-xl overflow-hidden border border-zinc-200 group hover:shadow-lg transition-all">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  alt="Premium Family Room"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWe27OqclQsyp-MN4OKuHSIaicLDsnQEOZyAE9lntsvji59QLA-sGPbdUh_U_8Pz1LNEz5KxcjZETNmzQoKoqGG8aiBdQ3xue9Bm0wsl3VLUZyJdZyQ3PsfkvI6KRJ1LWpaMq1ZAUDLHt2gHCGB4XnujdezWlTueuH63NeqiioEJCl5WTqevbaUFH27IDyS2A3hVfd2P_FcrOBna3d5EyFhGcYlhK7SV1Es83M7-Wsl8BefX6rqidTLFHhD2hy-puUDIYU5ryrbqHh"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">Premium Family</h3>
                  <span className="text-primary font-bold">₹2,000</span>
                </div>
                <p className="text-zinc-500 text-sm mb-6">Spacious accommodation for families visiting the city center.</p>
                <button className="w-full py-3 bg-zinc-100 text-zinc-800 rounded-lg font-bold text-sm hover:bg-zinc-200 transition-colors">
                  Book Family
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Gallery Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="px-6 max-w-7xl mx-auto mb-12">
          <span className="text-secondary font-bold text-sm tracking-widest uppercase">Take a Look</span>
          <h2 className="text-4xl font-bold mt-2">Facility Gallery</h2>
        </div>
        <div className="flex gap-6 overflow-x-auto px-6 no-scrollbar pb-8">
          <div className="flex-none w-[300px] md:w-[450px] aspect-[4/3] rounded-xl overflow-hidden shadow-md">
            <img
              alt="Lobby"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxF31nCTdJgHvpNvLMABjwQmzH_ilKeCyxHm_wiCFhI5SjluN4KpDKxHGf20pIvzVkGUKhYBeH90Xga2M9NdXld9bT3wMiD_tKTU9lQYwUjOwWfxVLUVpPhx5nWlJ1vSkPC64faRfmrqAHdnAXLCahlh8OvrCsz-FU4STHC5l_ksNA3B-2aNQhcq84RzY70Yq9LcY3z9GnhXMQaKeeENViSYM1BhdNQmr_T1D9M1xrpe9X3I5NWBV-EQzS1vVSRvChuucq7zMB8QVm"
            />
          </div>
          <div className="flex-none w-[300px] md:w-[350px] aspect-[3/4] rounded-xl overflow-hidden shadow-md">
            <img
              alt="Dining Area"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpdjSlKJwmaSVhMollGrNmQaUYIk9qimlyktaE-aiGbsbraVKSiP2m6Mzx-HFop5zUjjYOYQDlQvsOWx6pgy1ZQVqyarunEqvgoKgWOatA39Oka7RbLVOuhOXVuNvT0JabA3wn1RcPcWhIQ0MVKI7142v1PZZIGyjTRT0OwMEvu62H7arsHjJE7zN0nW65k0Gi-KFENX71mWvLiBbPyN_nir5Ff6Qt9ylHMp05MCKRSZg7Fm0Ah1XMZh4ebXuzXXEu6ns6iZrObm_B"
            />
          </div>
          <div className="flex-none w-[300px] md:w-[500px] aspect-[16/9] rounded-xl overflow-hidden shadow-md">
            <img
              alt="Corridor"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV5tEe3XaXxwkffRNQ3_-8zjCOTEdfc_sGbTuj2H48q82zWL8KKtMayz1T_5s7SOmY4knsaaOtQ6hk6-Kf2Gwyc3poCifxcveS6nEdGWDGTV48_cBUMH6E075z_iwxFzfH6S9tgVqt5IG7RGldHnUNUDFFwrJT1WwztSeVveDf0-Q9iAZ8JE1Ft4MB5Cr5iEAqYagFQaF0kzXbh29psVeFeC28lNAgnC2hum542FI8_VsO0DP4g2cAOo6YLmrvAn8wI8r0mElHoBbm"
            />
          </div>
          <div className="flex-none w-[300px] md:w-[350px] aspect-square rounded-xl overflow-hidden shadow-md">
            <img
              alt="Roof Garden"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuO_8_JQQeuwZb56ZpQPspobyMd0UmLSCq29cClpZR50VdmQPqEgdpCzu0nKbaVYRo7YHshImy17bjokFA2dlNk6sUP1_OxhEWXYjuSAVEHPfUYqO9HP_Y7Hwdnp8--jzrp38P0FVi6SKZSjYnlLQTPGpXcewf1-AyW1u5j5FLZl9RsqK85e7NHm5l_b5WWKbLczux5ra-40RR1TP-lbeNYiSCEKi2E8DrqICelde33ZV08J8Hih7tRJ8uAb-xpCmKZDUeUmDs7BdT"
            />
          </div>
        </div>
      </section>
      {/* Explore the Local Flavors Section */}
      <section className="py-24 px-6 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div>
              <span className="text-secondary font-bold text-sm tracking-widest uppercase">Explore the Local Flavors</span>
              <h2 className="text-4xl font-bold mt-2">Best spots to eat in Coimbatore</h2>
            </div>
            <p className="text-zinc-600 text-lg">
              Discover the rich culinary heritage of Coimbatore, from traditional South Indian breakfasts to modern cafe
              culture, all within minutes of Shiva Grand.
            </p>
            <Link
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold tracking-wide hover:bg-[#1e4d33] transition-colors"
              href="/local-guide"
            >
              Explore Now
            </Link>
          </div>
          <div className="flex-1 w-full">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
              <img
                alt="Coimbatore Local Cuisine"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpdjSlKJwmaSVhMollGrNmQaUYIk9qimlyktaE-aiGbsbraVKSiP2m6Mzx-HFop5zUjjYOYQDlQvsOWx6pgy1ZQVqyarunEqvgoKgWOatA39Oka7RbLVOuhOXVuNvT0JabA3wn1RcPcWhIQ0MVKI7142v1PZZIGyjTRT0OwMEvu62H7arsHjJE7zN0nW65k0Gi-KFENX71mWvLiBbPyN_nir5Ff6Qt9ylHMp05MCKRSZg7Fm0Ah1XMZh4ebXuzXXEu6ns6iZrObm_B"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Guest Testimonials */}
      <section className="py-24 bg-surface px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-secondary font-bold text-sm tracking-widest uppercase">Verified Reviews</span>
            <h2 className="text-4xl font-bold mt-2">Guest Testimonials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-yellow-400 mb-4">
                  <span className="material-symbols-outlined fill-1">star</span>
                  <span className="material-symbols-outlined fill-1">star</span>
                  <span className="material-symbols-outlined fill-1">star</span>
                  <span className="material-symbols-outlined fill-1">star</span>
                  <span className="material-symbols-outlined fill-1">star</span>
                </div>
                <p className="text-zinc-600 italic leading-relaxed mb-6">
                  &quot;Very clean rooms and the location is excellent, just a short walk from the railway station. Great
                  value for money in the city center.&quot;
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  RK
                </div>
                <div>
                  <p className="font-bold text-sm">Rajesh Kumar</p>
                  <p className="text-xs text-zinc-400">Google Reviewer</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-yellow-400 mb-4">
                  <span className="material-symbols-outlined fill-1">star</span>
                  <span className="material-symbols-outlined fill-1">star</span>
                  <span className="material-symbols-outlined fill-1">star</span>
                  <span className="material-symbols-outlined fill-1">star</span>
                  <span className="material-symbols-outlined fill-1">star</span>
                </div>
                <p className="text-zinc-600 italic leading-relaxed mb-6">
                  &quot;Excellent service and cleanliness. Highly recommended for business travelers needing to be near
                  the collectorate and railway station.&quot;
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  MS
                </div>
                <div>
                  <p className="font-bold text-sm">Meera S.</p>
                  <p className="text-xs text-zinc-400">Google Reviewer</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-yellow-400 mb-4">
                  <span className="material-symbols-outlined fill-1">star</span>
                  <span className="material-symbols-outlined fill-1">star</span>
                  <span className="material-symbols-outlined fill-1">star</span>
                  <span className="material-symbols-outlined fill-1">star</span>
                  <span className="material-symbols-outlined fill-1">star</span>
                </div>
                <p className="text-zinc-600 italic leading-relaxed mb-6">
                  &quot;The room was spotless. Exceptional location and pricing. Will definitely stay here again on my
                  next trip to Coimbatore.&quot;
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  AV
                </div>
                <div>
                  <p className="font-bold text-sm">Arjun Varma</p>
                  <p className="text-xs text-zinc-400">Google Reviewer</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-12">
            <a
              className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-[#1e4d33] transition-all shadow-md active:scale-95"
              href="#"
            >
              <span className="material-symbols-outlined">rate_review</span>
              Leave a Review on Google
            </a>
          </div>
        </div>
      </section>
      {/* Reservation Inquiry */}
      <section className="py-24 px-6 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            alt="Pattern"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPOLSyQFDp-ddCuMierPloF56Jnt75hOnSf4g95EsPirIVLqnVo0WgyoAEv7CsHOKoHRf7dsFajlUov39E2l8Gebiij4AnFve8Rwvyl97PIm7YHQqW96jAoW9Or1QtIO1yRyCqH2qLlGn2Gi1jlXAhVFEXXbvF5v1TuXpnA5k8jZsq5H_e5KxsC2Ah7tsR0UBCn6RRsXPdjjNS_vO6nlFoK7s6CnomiKCDk27FB6aiEfurKfKgx4BINHv78NI2Q5mrHPDMx9kbl8Rv"
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
              Ready to book <br /> your stay?
            </h2>
            <p className="text-white/80 text-lg mb-12">
              Submit an inquiry and our team will get back to you within 30 minutes with the best available rates.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-white p-2 bg-white/10 rounded-lg">location_on</span>
                <div>
                  <p className="font-bold text-xs uppercase tracking-widest mb-1 text-white/60">Location</p>
                  <p className="text-white">
                    54, Old Post Office Rd, Near Collector Office, Gopalapuram, Coimbatore, Tamil Nadu 641018
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-white p-2 bg-white/10 rounded-lg">call</span>
                <div>
                  <p className="font-bold text-xs uppercase tracking-widest mb-1 text-white/60">Direct Line</p>
                  <p className="text-white">090477 57777</p>
                </div>
              </div>
            </div>
          </div>
          <BookingForm />
        </div>
      </section>
    </main>
  )
}
