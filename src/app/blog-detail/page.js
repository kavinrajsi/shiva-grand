import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "5 Authentic Eateries within 1km of Shiva Grand — Shiva Grand",
  description:
    "A walking guide to Coimbatore's most cherished local flavors, all within a short walk of Shiva Grand Residency.",
};

const EATERIES = [
  {
    distance: "0.4 km • 5 mins walk",
    title: "1. Sree Annapoorna",
    body: "A Coimbatore legend. You haven't truly visited the city until you've tasted their signature Sambar. The atmosphere is bustling and authentic.",
    mustOrder: "The Ghee Roast Dosa and their world-famous Filter Coffee.",
  },
  {
    distance: "0.7 km • 8 mins walk",
    title: "2. Haribhavanam",
    body: "If you are in the mood for authentic Kongu-style non-vegetarian fare, this is the destination. Located right at the main junction, it's a meat lover's paradise.",
    mustOrder: "Pallipalayam Chicken and Mutton Biryani.",
  },
  {
    distance: "0.9 km • 12 mins walk",
    title: "3. Valarmathi Mess",
    body: "A humble 'mess' style eatery that punches way above its weight class in flavor. Expect long queues during lunch—a testament to its quality.",
    mustOrder: "The full South Indian Lunch Meal on a banana leaf.",
  },
  {
    distance: "0.3 km • 4 mins walk",
    title: "4. Bird on Tree",
    body: "For those seeking a more fine-dining experience with global options, this lush, garden-themed restaurant offers a serene escape.",
    mustOrder: "Their Thai Green Curry and signature Desserts.",
  },
  {
    distance: "0.1 km • 2 mins walk",
    title: "5. The Residency Junction Street Food",
    body: "Sometimes, the best food is found right on the curb. In the evenings, the junction comes alive with vendors selling local snacks.",
    mustOrder: "Kaalan (Coimbatore-style mushroom fry) and Chilli Bajji.",
  },
];

const RELATED = [
  {
    href: "/blog",
    alt: "Lush green botanical garden with tropical trees",
    title: "3 Botanical Parks in Coimbatore for a Morning Walk",
    blurb: "Discover the green lungs of our beautiful city.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhrOhszT66j0V_vNi8BqNLuZGK1TrmMkpsqJxIgJu2xznFJp3qn6k6g4SnDPD1p_dqTc9yB2lm6oPhQgTyA8-enXZbduT-oP5gFmbLNFkCC6cU_TwHog0d5wIuQmyoU53hOZq0LmHIYKnUTLdo_Zs7npT4099qcT4B1RRGG2vAFzttzoE63hTdFCSBEsYWt0A8AKtLY-mLmKC7hKP_L2lEq5m8wKNqpsmlojuDPA2Onu9OSkVJ5pW5Kr-sL2fJpoyH4TEIsM3kkp29",
  },
  {
    href: "/blog",
    alt: "Traditional South Indian silk sarees displayed",
    title: "A Silk Lover's Guide to Shopping in Coimbatore",
    blurb: "Where to find the finest Kanchipuram and local weaves.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDOAbGYj3pmbEwAp11DL4S7wbTGLr2SQaIquFhSzeCx8vY3IrR0P5-Tlt8yGDo0HAnaRuad7rwW_fSbrCYu4kFGujQs-1icl5Q4cKbMzC2uSdpzZOD7N6miuBRf1sq_PJO7ZF0SXn4baF8mdnKis6KOWdm4OFhgLsrqjE34Ntev151XY1YSozpcR9d03cJ5LHQikVIWthvgIhDoeVx_d5A2ZwwoFDEXHJO54FSn3QOqXK1UITz0q95NDpjsizkz-H-Wag8r0PbfQmML",
  },
];

export default function BlogDetailPage() {
  return (
    <div className="pt-20">
      <header className="relative w-full h-[716px] flex items-end overflow-hidden">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAo3kIdmWY_vUQ4ebJZAw-h1rwJC0t5P7_iybSFJ54w4u-1okWqnqRQFmU_N6HTKkNm4NU4tkddYc9RXr_6N5i0hlBdeVxUT5dqM9TOFXzFPI4Cz4m6I5EEEX2yIYhFl2lHwNdRTxYItU_J3_hAi9-WAWkxzqIjhrKRUmUVI4hj1-rkcRKKSNJrXaBdf75F9OPJK-fTPCRFBmsb2asaJqN8dA2PkfvU-WpwBk2pklPamg-DomMxZXre4iedNB85KYrRsHGaKfy9QT9p"
          alt="Crispy golden ghee roast dosa served on a banana leaf"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 pb-16 w-full">
          <span className="inline-block px-3 py-1 bg-primary text-on-primary text-[0.75rem] font-bold uppercase tracking-[0.05em] rounded-full mb-6">
            Local Guide
          </span>
          <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-tighter max-w-3xl mb-4 leading-tight">
            5 Authentic Eateries within 1km of Shiva Grand
          </h1>
          <p className="text-emerald-50/90 text-lg md:text-xl max-w-2xl font-light">
            Embark on a culinary journey through Coimbatore's most cherished
            local flavors, all just a short walk from your stay.
          </p>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <article className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-10 pb-8 border-b border-outline-variant/20">
              <div className="relative w-12 h-12 rounded-full bg-surface-container-high overflow-hidden">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDU1iXj0JpXegxn7l2H0bQKDEEODuH8dUBFmy9a0bOqgVaCvla9ewcJqUcZ6pFimYNGGxieZwsduJb-Hyq0D-FDMHgl_U07W66svyVDinx_tWFJGPyeG51zPFMhXLPnNgL0doTRLMLJO0ghDRy8gr2TRhQ9Np-fPbBwiEYfttP9buxxMWiWnli8UM88C2awU2TRffAoas55qxFDs-PpNmI85n04kKmq6uc46TpSiNPdKCH_QLN2EHLic4Ib2VKjCIgVSOKv7LH6Tvuu"
                  alt="Portrait of the travel writer Arjun K. Varma"
                  fill
                  sizes="48px"
                  className="object-cover"
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
                Coimbatore, the Manchester of South India, is not just about
                textiles and industry. It is a melting pot of flavors, where the
                Kongu Nadu cuisine meets modern culinary artistry.
              </p>
              <p className="mb-12">
                Staying at Shiva Grand Residency places you in the heart of the
                city's food district. From the aromatic filter coffee of
                heritage establishments to the spicy biryanis that define the
                region, you don't need a cab to find world-class South Indian
                food. Here are our top 5 picks located within a 1km radius of
                the sanctuary.
              </p>

              <div className="space-y-16">
                {EATERIES.map((e) => (
                  <div key={e.title} className="group relative">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[0.7rem] font-bold text-primary uppercase tracking-widest">
                          {e.distance}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-on-surface mb-2">
                        {e.title}
                      </h3>
                      <p className="text-on-surface-variant mb-4">{e.body}</p>
                      <div className="bg-surface-container-low p-4 rounded-xl">
                        <p className="text-sm font-bold text-on-surface mb-1">
                          Must Order:
                        </p>
                        <p className="text-sm text-on-surface-variant">
                          {e.mustOrder}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <aside className="lg:col-span-4 space-y-12">
            <div className="bg-surface-container-low p-8 rounded-xl sticky top-28 border border-outline-variant/10">
              <h4 className="text-xl font-bold mb-6">You might also like</h4>
              <div className="space-y-8">
                {RELATED.map((r) => (
                  <Link key={r.title} href={r.href} className="group block">
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                      <Image
                        src={r.image}
                        alt={r.alt}
                        fill
                        sizes="(min-width: 1024px) 25vw, 100vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h5 className="font-bold group-hover:text-primary transition-colors">
                      {r.title}
                    </h5>
                    <p className="text-sm text-on-surface-variant mt-2">
                      {r.blurb}
                    </p>
                  </Link>
                ))}
              </div>
              <div className="mt-12 pt-12 border-t border-outline-variant/20">
                <div className="bg-primary-container/30 p-6 rounded-xl">
                  <h5 className="font-bold text-primary mb-2">
                    Book Your Sanctuary
                  </h5>
                  <p className="text-sm text-on-secondary-container mb-4">
                    Stay steps away from these amazing eateries. Rooms starting
                    at ₹1800.
                  </p>
                  <Link
                    href="/book-you-stay"
                    className="block text-center w-full botanical-gradient text-on-primary py-3 rounded-full font-bold shadow-md active:scale-95 transition-transform"
                  >
                    Reserve Now
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mt-24 bg-surface-container-low py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="material-symbols-outlined fill-1 text-4xl text-primary mb-4">
            restaurant
          </span>
          <h2 className="text-3xl font-bold mb-4 tracking-tight">
            Craving something specific?
          </h2>
          <p className="text-on-surface-variant max-w-xl mx-auto mb-8">
            Need help with your next stay? We can assist with future bookings
            ahead—just inform us at our reception desk.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              className="px-8 py-3 rounded-full border border-primary text-primary font-bold hover:bg-primary/5 transition-colors"
            >
              Chat with us
            </button>
            <Link
              href="/local-guide"
              className="px-8 py-3 rounded-full bg-primary text-on-primary font-bold shadow-lg hover:opacity-90 transition-all"
            >
              Explore Full City Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
