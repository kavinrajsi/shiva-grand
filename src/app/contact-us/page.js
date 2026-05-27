import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { HOTEL_ADDRESS } from "@/lib/address";

export const metadata = {
  title: "Contact Us — Shiva Grand",
  description: "Get in touch with Shiva Grand Residency, Coimbatore.",
};

export default function ContactUsPage() {
  return (
    <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-4">
            <span className="text-primary font-semibold tracking-widest text-xs uppercase">
              Get in Touch
            </span>
            <h1 className="text-5xl font-extrabold tracking-tight text-primary leading-tight font-headline">
              Shiva Grand{" "}
            </h1>
            <p className="text-lg text-on-surface-variant font-light italic">
              A Comfortable Stay, Every Time
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4 group">
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-900">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <h3 className="font-bold text-primary mb-1">Our Location</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  {HOTEL_ADDRESS}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-900">
                <span className="material-symbols-outlined">phone_in_talk</span>
              </div>
              <div>
                <h3 className="font-bold text-primary mb-1">Phone Number</h3>
                <p>
                  <a
                    href="tel:+919047757777"
                    className="text-on-surface-variant hover:text-primary transition-colors"
                  >
                    090477 57777
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl aspect-[16/10] bg-surface-container-low shadow-sm group">
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="inline-block p-4 bg-white shadow-xl rounded-full mb-2">
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    location_on
                  </span>
                </div>
                <p className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase bg-white/80 backdrop-blur px-3 py-1 rounded-full">
                  View on Google Maps
                </p>
              </div>
            </div>
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyTFBkGccI9QhXH-yQpuyX4nGcm32rtJJ07Fyu2t8bWgUtRiZ8iqAJYBexdCw_T3yUvp7qgm8wBfkZKREf7EQkZ983ChnAfmWNmJhFGZDchPjvm2wf-afLk_iX3oP8ocoz3MhCz6YyMpvzNBleUAVydOSa12nTNbKxuQ20TGYJzzjAzKqGz-d1gFbatz8iUlc2ApOFiL20fLu1yD4lAtEnAq2tDVihgsX9H1yw_K36ugpKX5td5U-qvkphdRfHwhhJ3EpHOe29gSWo"
              alt="Detailed map showing Shiva Grand near Coimbatore Railway Station and Collectorate"
              fill
              sizes="(min-width: 1024px) 41vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur p-2 rounded text-[10px] text-primary font-medium shadow-sm">
              Near Coimbatore Junction &amp; Collectorate
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-emerald-900/5">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
