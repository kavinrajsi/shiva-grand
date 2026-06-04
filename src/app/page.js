import Image from "next/image";
import Link from "next/link";
import HomeInquiryForm from "@/components/HomeInquiryForm";
import QuickBookingBar from "@/components/QuickBookingBar";
import { sanityClient } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { GALLERY_QUERY, TESTIMONIALS_QUERY } from "@/sanity/queries";
import JsonLd from "@/components/JsonLd";
import { reservationActionSchema, webPageSchema } from "@/lib/schema";
import {
  HOTEL_ADDRESS,
  HOTEL_MAPS_URL,
  HOTEL_PHONE_DISPLAY,
  HOTEL_PHONE_TEL,
} from "@/lib/address";

export const revalidate = 60;

export const metadata = {
  title: {
    absolute: "Shiva Grand Residency — Hotel in Coimbatore | Rooms from ₹1,500",
  },
  description:
    "Comfortable, clean hotel rooms in Coimbatore. 5 minutes from the railway station, walking distance to the Collectorate. Deluxe, Twin Bed, and Suite rooms from ₹1,500.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Shiva Grand Residency — Hotel in Coimbatore | Rooms from ₹1,500",
    description:
      "Comfortable, clean hotel rooms in Coimbatore. 5 minutes from the railway station, walking distance to the Collectorate.",
    url: "/",
  },
};

const ROOM_CARDS = [
  {
    title: "Deluxe Room",
    price: "₹1,500",
    blurb:
      "Spacious comfort with modern amenities for a relaxing and productive stay.",
    cta: "Book Deluxe",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCoaHAylQeH7kicD7prK7Q15mhGp3hFaebiudTMZFrrWPCzQGhSmZyrwKtHf02OqA6CSKtDCAOdJU3R_rDsDz7CfxFhfV5zO3kG39dSmoh8dLEhYYzUMG-OXCuq53RJTX4X1x4TwEJJqfboOcgsCKs8u0iTOJfpOxsi8EhUaW9-OHC0HlhfzdWNmHBbano6h9L2lti91itWVc1WR8Nr0r77BMbGmxPbUi5o50jxyoWV_wznz9Jq5qHETBsK6NiXMLT8bKs5GGKI-XM7",
    alt: "Deluxe Room",
  },
  {
    title: "Deluxe Room - Twin Bed",
    price: "₹1,850",
    blurb:
      "Thoughtfully designed twin-bed accommodation, ideal for friends, colleagues, or shared stays.",
    cta: "Book Twin Bed",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCU9rqlVfSpasG92DxbJwWHHdf1Ch2EIxgd8jj2uFnKB6CSPuJVHuPmkncSfotMsZZVOe50LFXBAzP3usAYU6Sp-HVwgWJQR_AYh7UGTpRxeU7qAQ9tFNMGXWmhcsDorUdqrzJs3Gb_clF9OaKJM4Wfneo_GsOnHhoYc-zCpoAuvCIOulqp_RKQ9grqlJUnpvyrEg2_m2O6OZOUwe8sS-BcWArQtvfskuze0gxz2ebwukI5JwYzkejbtX8pZP__1bR9e8_LmQL85Yvc",
    alt: "Deluxe Room - Twin Bed",
  },
  {
    title: "Suite Room",
    price: "₹2,000",
    blurb: "Spacious accommodation for families visiting the city center.",
    cta: "Book Suite",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDWe27OqclQsyp-MN4OKuHSIaicLDsnQEOZyAE9lntsvji59QLA-sGPbdUh_U_8Pz1LNEz5KxcjZETNmzQoKoqGG8aiBdQ3xue9Bm0wsl3VLUZyJdZyQ3PsfkvI6KRJ1LWpaMq1ZAUDLHt2gHCGB4XnujdezWlTueuH63NeqiioEJCl5WTqevbaUFH27IDyS2A3hVfd2P_FcrOBna3d5EyFhGcYlhK7SV1Es83M7-Wsl8BefX6rqidTLFHhD2hy-puUDIYU5ryrbqHh",
    alt: "Suite Room",
  },
];

const GALLERY_SIZES = [
  "w-[300px] md:w-[450px] aspect-[4/3]",
  "w-[300px] md:w-[350px] aspect-[3/4]",
  "w-[300px] md:w-[500px] aspect-[16/9]",
  "w-[300px] md:w-[350px] aspect-square",
];

const SAMPLE_GALLERY = [
  {
    alt: "Lobby",
    size: GALLERY_SIZES[0],
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxF31nCTdJgHvpNvLMABjwQmzH_ilKeCyxHm_wiCFhI5SjluN4KpDKxHGf20pIvzVkGUKhYBeH90Xga2M9NdXld9bT3wMiD_tKTU9lQYwUjOwWfxVLUVpPhx5nWlJ1vSkPC64faRfmrqAHdnAXLCahlh8OvrCsz-FU4STHC5l_ksNA3B-2aNQhcq84RzY70Yq9LcY3z9GnhXMQaKeeENViSYM1BhdNQmr_T1D9M1xrpe9X3I5NWBV-EQzS1vVSRvChuucq7zMB8QVm",
  },
  {
    alt: "Dining Area",
    size: GALLERY_SIZES[1],
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpdjSlKJwmaSVhMollGrNmQaUYIk9qimlyktaE-aiGbsbraVKSiP2m6Mzx-HFop5zUjjYOYQDlQvsOWx6pgy1ZQVqyarunEqvgoKgWOatA39Oka7RbLVOuhOXVuNvT0JabA3wn1RcPcWhIQ0MVKI7142v1PZZIGyjTRT0OwMEvu62H7arsHjJE7zN0nW65k0Gi-KFENX71mWvLiBbPyN_nir5Ff6Qt9ylHMp05MCKRSZg7Fm0Ah1XMZh4ebXuzXXEu6ns6iZrObm_B",
  },
  {
    alt: "Corridor",
    size: GALLERY_SIZES[2],
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBV5tEe3XaXxwkffRNQ3_-8zjCOTEdfc_sGbTuj2H48q82zWL8KKtMayz1T_5s7SOmY4knsaaOtQ6hk6-Kf2Gwyc3poCifxcveS6nEdGWDGTV48_cBUMH6E075z_iwxFzfH6S9tgVqt5IG7RGldHnUNUDFFwrJT1WwztSeVveDf0-Q9iAZ8JE1Ft4MB5Cr5iEAqYagFQaF0kzXbh29psVeFeC28lNAgnC2hum542FI8_VsO0DP4g2cAOo6YLmrvAn8wI8r0mElHoBbm",
  },
  {
    alt: "Roof Garden",
    size: GALLERY_SIZES[3],
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuO_8_JQQeuwZb56ZpQPspobyMd0UmLSCq29cClpZR50VdmQPqEgdpCzu0nKbaVYRo7YHshImy17bjokFA2dlNk6sUP1_OxhEWXYjuSAVEHPfUYqO9HP_Y7Hwdnp8--jzrp38P0FVi6SKZSjYnlLQTPGpXcewf1-AyW1u5j5FLZl9RsqK85e7NHm5l_b5WWKbLczux5ra-40RR1TP-lbeNYiSCEKi2E8DrqICelde33ZV08J8Hih7tRJ8uAb-xpCmKZDUeUmDs7BdT",
  },
];

function Stars({ count = 5 }) {
  const safe = Math.max(0, Math.min(5, Math.round(count)));
  return (
    <div className="flex text-yellow-400 mb-4">
      {Array.from({ length: safe }).map((_, i) => (
        <span key={i} className="material-symbols-outlined fill-1">
          star
        </span>
      ))}
    </div>
  );
}

const SAMPLE_TESTIMONIALS = [
  {
    _id: "sample-rk",
    name: "Rajesh Kumar",
    role: "Google Reviewer",
    rating: 5,
    quote:
      "Very clean rooms and the location is excellent, just a short walk from the railway station. Great value for money in the city center.",
  },
  {
    _id: "sample-ms",
    name: "Meera S.",
    role: "Google Reviewer",
    rating: 5,
    quote:
      "Excellent service and cleanliness. Highly recommended for business travelers needing to be near the collectorate and railway station.",
  },
  {
    _id: "sample-av",
    name: "Arjun Varma",
    role: "Google Reviewer",
    rating: 5,
    quote:
      "The room was spotless. Exceptional location and pricing. Will definitely stay here again on my next trip to Coimbatore.",
  },
];

function initialsFor(name) {
  if (!name) return "";
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
}

export default async function HomePage() {
  const [sanityTestimonials, sanityGallery] = await Promise.all([
    sanityClient.fetch(TESTIMONIALS_QUERY),
    sanityClient.fetch(GALLERY_QUERY),
  ]);
  const testimonials =
    sanityTestimonials.length > 0 ? sanityTestimonials : SAMPLE_TESTIMONIALS;
  const gallery =
    sanityGallery.length > 0
      ? sanityGallery.map((item, i) => ({
          key: item._id,
          src: urlFor(item.image).width(900).url(),
          alt: item.image?.alt || item.caption || "Facility",
          size: GALLERY_SIZES[i % GALLERY_SIZES.length],
        }))
      : SAMPLE_GALLERY.map((g) => ({ ...g, key: g.alt }));

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: "/",
            name: "Shiva Grand Residency — Hotel in Coimbatore",
            description:
              "Comfortable, clean hotel rooms in Coimbatore. 5 minutes from the railway station, walking distance to the Collectorate.",
          }),
          reservationActionSchema(),
        ]}
      />
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/home-page-banner.jpeg"
            alt="Modern Residency Exterior"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 px-6 max-w-7xl mx-auto w-full">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight max-w-3xl tracking-tight">
            A Comfortable Stay, Every Time
          </h1>
          <p className="text-white/90 text-lg md:text-xl mt-6 max-w-xl font-medium">
            Clean rooms and a hassle-free stay every time.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/book-you-stay"
              className="bg-white text-primary px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-zinc-100 transition-colors"
            >
              View Rooms
            </Link>
            <a
              href={HOTEL_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              Location Map
            </a>
          </div>
        </div>
      </section>

      <section className="relative z-20 -mt-16 px-6">
        <QuickBookingBar />
      </section>

      <section className="py-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <span className="text-secondary font-bold text-sm tracking-widest uppercase">
                Connectivity First
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-on-surface mt-4 leading-tight">
                Perfectly Located for Business &amp; Travel.
              </h2>
            </div>
            <p className="text-zinc-600 text-lg leading-relaxed">
              Shiva Grand offers clean, comfortable, and reliable stays designed
              for your convenience. Whether you're traveling for work or
              leisure, we provide a space that feels just right.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-zinc-100">
                <span className="material-symbols-outlined text-secondary text-3xl">
                  train
                </span>
                <div>
                  <p className="font-bold text-sm">Railway Station</p>
                  <p className="text-xs text-zinc-500">5 min walk</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-zinc-100">
                <span className="material-symbols-outlined text-secondary text-3xl">
                  account_balance
                </span>
                <div>
                  <p className="font-bold text-sm">Collectorate</p>
                  <p className="text-xs text-zinc-500">1 min walk</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-square bg-zinc-200 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/perfectly-located-for-business-travel.jpeg"
                alt="Modern Room Interior"
                fill
                sizes="(min-width: 1024px) 41vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-zinc-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-secondary font-bold text-sm tracking-widest uppercase">
                Stay Options
              </span>
              <h2 className="text-4xl font-bold mt-2">
                Clean &amp; Essential Rooms
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ROOM_CARDS.map((room) => (
              <div
                key={room.title}
                className="bg-white rounded-xl overflow-hidden border border-zinc-200 group hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{room.title}</h3>
                    <span className="text-primary font-bold">{room.price}</span>
                  </div>
                  <p className="text-zinc-500 text-sm mb-6">{room.blurb}</p>
                  <Link
                    href={`/book-you-stay?roomType=${encodeURIComponent(room.title)}`}
                    className="block w-full text-center py-3 bg-zinc-100 text-zinc-800 rounded-lg font-bold text-sm hover:bg-zinc-200 transition-colors"
                  >
                    {room.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white overflow-hidden">
        <div className="px-6 max-w-7xl mx-auto mb-12">
          <span className="text-secondary font-bold text-sm tracking-widest uppercase">
            Take a Look
          </span>
          <h2 className="text-4xl font-bold mt-2">Facility Gallery</h2>
        </div>
        <div className="flex gap-6 overflow-x-auto px-6 no-scrollbar pb-8">
          {gallery.map((g) => (
            <div
              key={g.key}
              className={`relative flex-none ${g.size} rounded-xl overflow-hidden shadow-md`}
            >
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes="(min-width: 768px) 500px, 300px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div>
              <span className="text-secondary font-bold text-sm tracking-widest uppercase">
                Explore the Local Flavors
              </span>
              <h2 className="text-4xl font-bold mt-2">
                Best spots to eat in Coimbatore
              </h2>
            </div>
            <p className="text-zinc-600 text-lg">
              Discover the rich culinary heritage of Coimbatore, from
              traditional South Indian breakfasts to modern cafe culture, all
              within minutes of Shiva Grand.
            </p>
            <Link
              href="/local-guide"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold tracking-wide hover:bg-[#1e4d33] transition-colors"
            >
              Explore Now
            </Link>
          </div>
          <div className="flex-1 w-full">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/best-spots-to-eat-in-coimbatore.jpeg"
                alt="Coimbatore Local Cuisine"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-secondary font-bold text-sm tracking-widest uppercase">
              Verified Reviews
            </span>
            <h2 className="text-4xl font-bold mt-2">Guest Testimonials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t._id}
                className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <Stars count={t.rating} />
                  <p className="text-zinc-600 italic leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {initialsFor(t.name)}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    {t.role ? (
                      <p className="text-xs text-zinc-400">{t.role}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-[#1e4d33] transition-all shadow-md active:scale-95"
            >
              <span className="material-symbols-outlined">rate_review</span>
              Leave a Review on Google
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPOLSyQFDp-ddCuMierPloF56Jnt75hOnSf4g95EsPirIVLqnVo0WgyoAEv7CsHOKoHRf7dsFajlUov39E2l8Gebiij4AnFve8Rwvyl97PIm7YHQqW96jAoW9Or1QtIO1yRyCqH2qLlGn2Gi1jlXAhVFEXXbvF5v1TuXpnA5k8jZsq5H_e5KxsC2Ah7tsR0UBCn6RRsXPdjjNS_vO6nlFoK7s6CnomiKCDk27FB6aiEfurKfKgx4BINHv78NI2Q5mrHPDMx9kbl8Rv"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
              Ready to book <br /> your stay?
            </h2>
            <p className="text-white/80 text-lg mb-12">
              Submit an inquiry and our team will get back to you within 30
              minutes with the best available rates.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-white p-2 bg-white/10 rounded-lg">
                  location_on
                </span>
                <div>
                  <p className="font-bold text-xs uppercase tracking-widest mb-1 text-white/60">
                    Location
                  </p>
                  <p className="text-white">{HOTEL_ADDRESS}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-white p-2 bg-white/10 rounded-lg">
                  call
                </span>
                <div>
                  <p className="font-bold text-xs uppercase tracking-widest mb-1 text-white/60">
                    Direct Line
                  </p>
                  <p>
                    <a
                      href={`tel:${HOTEL_PHONE_TEL}`}
                      className="text-white hover:underline"
                    >
                      {HOTEL_PHONE_DISPLAY}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl">
            <HomeInquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
