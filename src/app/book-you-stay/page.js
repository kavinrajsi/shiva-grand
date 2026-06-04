import Image from "next/image";
import BookingForm from "@/components/BookingForm";
import { BOOKING_GUESTS, BOOKING_ROOM_TYPES } from "@/lib/validations";
import { HOTEL_MAPS_URL } from "@/lib/address";
import JsonLd from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { sanityClient } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { ROOMS_QUERY } from "@/sanity/queries";

const BADGE_STYLES = {
  light: "bg-white/80 text-primary",
  highlight: "bg-secondary/80 text-on-primary",
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function pickInitial(sp) {
  const initial = {};
  if (sp?.checkIn && DATE_RE.test(sp.checkIn)) initial.checkIn = sp.checkIn;
  if (sp?.checkOut && DATE_RE.test(sp.checkOut)) initial.checkOut = sp.checkOut;
  if (sp?.guests && BOOKING_GUESTS.includes(sp.guests)) initial.guests = sp.guests;
  if (sp?.roomType && BOOKING_ROOM_TYPES.includes(sp.roomType))
    initial.roomType = sp.roomType;
  return initial;
}

export const metadata = {
  title: "Book Your Stay — Rooms in Coimbatore",
  description:
    "Reserve your room at Shiva Grand Residency, Coimbatore. Deluxe Room, Deluxe Room - Twin Bed, or Suite Room — no upfront payment, free cancellation up to 24h.",
  alternates: { canonical: "/book-you-stay" },
  openGraph: {
    title: "Book Your Stay — Shiva Grand Residency",
    description:
      "Reserve a Deluxe Room, Deluxe Room - Twin Bed, or Suite Room room. No upfront payment, free cancellation up to 24h.",
    url: "/book-you-stay",
  },
};

const ROOMS = [
  {
    title: "Deluxe Room",
    badge: "Standard",
    badgeStyle: "bg-white/80 text-primary",
    blurb:
      "Perfect for solo travelers or couples seeking a quiet retreat.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB8KHTiQVTOog-9_Rok5v_lrnzM8aHMIoALDnVkb5K1dmNp0sqJg5HVmu-NwV5oDb6YxRlSMiQVyGPWSCKvdMnHg15YETGIZnR2bgvPjkvZ9osDCvWkIZJCEAXPBcUnTaj1PAH_0HM3KixSq2TfNjvfw99gA2YE9uAy0PxhO_60TwDTRLK1FGqitlzzIGnmtkwsMeweVgIdrG5XQO8_rG4k9l7n8OxBjd4foqX1MxDfdUQj2LfgxoJ8jeiI4j9ym0MaBzwfIi5brIOq",
    alt: "Deluxe Room",
    features: [
      { icon: "wifi", label: "Free Wifi" },
      { icon: "ac_unit", label: "Non-AC" },
    ],
  },
  {
    title: "Deluxe Room - Twin Bed",
    badge: "Most Popular",
    badgeStyle: "bg-secondary/80 text-on-primary",
    blurb:
      "Spacious interiors with premium amenities for the modern guest.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBZLuQ5lCT22yd5ejTUAbgipYSuBPv4r4UPyVPevFYCcRZwm_lSQn8Zd8DHRyzbp4E4NX6cHJsEnRlbND8_ttXF1nEQcsOjMV38FinviCAdKp62fIRg7ceV3xowH8dS0-pQ7pSecOnxM_rmUSTqgZoGuojbsP9Ceo47uWKf9B4vQ24RS1KttLUf9gMDIKKFP1w7c_BSjo7O66u-7incPNZxz2QCOyi0EOMXVHPg0Ofe_W4ip8mSH3xhLecMwp_uswCSjxUzJz8ateHf",
    alt: "Deluxe Room - Twin Bed",
    features: [
      { icon: "wifi", label: "Free Wifi" },
      { icon: "ac_unit", label: "Climate Control" },
    ],
  },
  {
    title: "Suite Room",
    badge: "Premium",
    badgeStyle: "bg-white/80 text-primary",
    blurb:
      "Designed for families who value space, luxury, and togetherness.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuARCVTykjNdNaZaZt7n_abtgj-5GKIVfsSvgMm5-9Ey1rtx6jM6AfJnw-EqQzctrBA1pRy14G5lXpMxPvAZXE8jWmqvIzoEl8hcSSzMgdjpl1isyWyKe12ClD7LFXW-tvHopexuzXOwKf-rxKvCh0ACilfURdEFhI9DPFEB9O5KM5Aqri87IIkVRdXH3iUTxuHHegcSMz_YsaXUnRLnhROWFRH3ENefg7nKvs9P-ZDI7M2Lkq0vr2Bxx2v_obD4tw-umuEmNbCcsDEN",
    alt: "Suite Room",
    features: [
      { icon: "group", label: "4 Adults" },
      { icon: "tv", label: "Smart TV" },
    ],
  },
];

const LOCATIONS = [
  {
    icon: "train",
    title: "Railway Station",
    body: "Only 1.5km away, 5 minutes by taxi.",
  },
  {
    icon: "flight",
    title: "International Airport",
    body: "Located 12km away, 25 minutes commute.",
  },
  {
    icon: "shopping_bag",
    title: "Brookefields Mall",
    body: "Walkable distance to the city's premier shopping.",
  },
];

export default async function BookYourStayPage({ searchParams }) {
  const sp = await searchParams;
  const initial = pickInitial(sp);
  const sanityRooms = await sanityClient.fetch(ROOMS_QUERY);
  const rooms =
    sanityRooms.length > 0
      ? sanityRooms.map((r) => ({
          key: r._id,
          title: r.title,
          badge: r.badge || "",
          badgeStyle: BADGE_STYLES[r.badgeStyle] || BADGE_STYLES.light,
          blurb: r.blurb,
          image: urlFor(r.image).width(900).url(),
          alt: r.image?.alt || r.title,
          features: r.features || [],
        }))
      : ROOMS.map((r) => ({ ...r, key: r.title }));
  return (
    <div className="pt-28">
      <JsonLd
        data={webPageSchema({
          path: "/book-you-stay",
          name: "Book Your Stay — Shiva Grand Residency",
          description:
            "Reserve a Deluxe Room, Deluxe Room - Twin Bed, or Suite Room room. No upfront payment, free cancellation up to 24h.",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Rooms & Booking", path: "/book-you-stay" },
          ],
        })}
      />
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div className="relative group">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg bg-surface-container">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZLuQ5lCT22yd5ejTUAbgipYSuBPv4r4UPyVPevFYCcRZwm_lSQn8Zd8DHRyzbp4E4NX6cHJsEnRlbND8_ttXF1nEQcsOjMV38FinviCAdKp62fIRg7ceV3xowH8dS0-pQ7pSecOnxM_rmUSTqgZoGuojbsP9Ceo47uWKf9B4vQ24RS1KttLUf9gMDIKKFP1w7c_BSjo7O66u-7incPNZxz2QCOyi0EOMXVHPg0Ofe_W4ip8mSH3xhLecMwp_uswCSjxUzJz8ateHf"
                  alt="Selected Room"
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                    Selected Room
                  </p>
                  <p className="text-lg font-bold text-primary">
                    Deluxe Room - Twin Bed
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low p-6 rounded-2xl space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="room-category"
                  className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1"
                >
                  Select Room Category
                </label>
                <div className="relative">
                  <select
                    id="room-category"
                    name="room-category"
                    defaultValue="Deluxe Room - Twin Bed"
                    className="w-full bg-white bg-none border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary pl-4 pr-12 py-3 text-sm appearance-none cursor-pointer"
                  >
                    <option>Deluxe Room</option>
                    <option>Deluxe Room - Twin Bed</option>
                    <option>Suite Room</option>
                    <option>Executive Suite</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                    expand_more
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white py-3.5 rounded-xl font-bold tracking-wide transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-xl">
                  sync_alt
                </span>
                Change Room Type
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-surface-container-lowest p-8 lg:p-10 rounded-3xl shadow-sm border border-outline-variant/10">
            <BookingForm initial={initial} />
          </div>
        </div>
      </section>

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
            <button
              type="button"
              className="text-primary font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
            >
              View All Categories{" "}
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <div key={room.key} className="group">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-surface-container shadow-sm mb-6 transition-transform duration-500 hover:scale-[1.02]">
                  <Image
                    src={room.image}
                    alt={room.alt}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover"
                  />
                  {room.badge ? (
                    <div
                      className={`absolute bottom-4 left-4 backdrop-blur-md px-3 py-1 rounded-full ${room.badgeStyle}`}
                    >
                      <span className="text-[10px] font-bold tracking-widest uppercase">
                        {room.badge}
                      </span>
                    </div>
                  ) : null}
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  {room.title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                  {room.blurb}
                </p>
                <div className="flex items-center gap-4 text-xs font-bold text-secondary">
                  {room.features.map((f) => (
                    <span key={f.label} className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">
                        {f.icon}
                      </span>{" "}
                      {f.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden h-[500px] shadow-sm relative grayscale hover:grayscale-0 transition-all duration-700">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbFyCh0kqR7nN6eO4hXywN6hGMkzOf81eRNHFi-AGZu-Or1pZBEb7Jr-ofZ8yhLQGtHfvtejwscnkGhM5rnaMSx8RNMSLP8bo91DxgnvjjsUrtuKAT9rGzblEkJisyTeG7vK_ZlvxYSCr3JNIzCYUARFl7Hzgb3XbvUhroWlbOYCBFE4ZpFuRgkRVbvJqNgeWD1Q2srIADhKbO5Ql4UMFbXqYhtycAMRuCK_7cRqa831NQnflDznN8i3s5B-aNIhOzl2JVXMr8voOw"
                alt="Map of Coimbatore"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
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
              Situated in the heart of Coimbatore, we provide easy access to the
              city's business hubs, shopping centers, and transportation links.
            </p>
            <div className="space-y-6">
              {LOCATIONS.map((loc) => (
                <div key={loc.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-secondary-container">
                      {loc.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">{loc.title}</h4>
                    <p className="text-sm text-on-surface-variant">
                      {loc.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href={HOTEL_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block botanical-gradient text-on-primary px-8 py-3 rounded-full font-bold text-sm tracking-wide shadow-lg"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
