export default function Contact() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Main Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Information */}
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-4">
            <span className="text-primary font-semibold tracking-widest text-xs uppercase">Get in Touch</span>
            <h1 className="text-5xl font-extrabold tracking-tight text-primary leading-tight font-headline">
              Shiva Grand&nbsp;
            </h1>
            <p className="text-lg text-on-surface-variant font-light italic">A Comfortable Stay, Every Time</p>
          </div>
          <div className="space-y-8">
            {/* Address Card */}
            <div className="flex items-start gap-4 group">
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-900">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <h3 className="font-bold text-primary mb-1">Our Location</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  54, Old Post Office Rd, Near Collector Office,
                  <br />
                  Gopalapuram, Coimbatore,
                  <br />
                  Tamil Nadu 641018
                </p>
              </div>
            </div>
            {/* Phone Card */}
            <div className="flex items-start gap-4 group">
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-900">
                <span className="material-symbols-outlined">phone_in_talk</span>
              </div>
              <div>
                <h3 className="font-bold text-primary mb-1">Phone Number</h3>
                <p className="text-on-surface-variant">090477 57777</p>
              </div>
            </div>
          </div>
          {/* Map Representation */}
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
            <img
              alt="Detailed map showing Shiva Grand near Coimbatore Railway Station and Collectorate"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyTFBkGccI9QhXH-yQpuyX4nGcm32rtJJ07Fyu2t8bWgUtRiZ8iqAJYBexdCw_T3yUvp7qgm8wBfkZKREf7EQkZ983ChnAfmWNmJhFGZDchPjvm2wf-afLk_iX3oP8ocoz3MhCz6YyMpvzNBleUAVydOSa12nTNbKxuQ20TGYJzzjAzKqGz-d1gFbatz8iUlc2ApOFiL20fLu1yD4lAtEnAq2tDVihgsX9H1yw_K36ugpKX5td5U-qvkphdRfHwhhJ3EpHOe29gSWo"
            />
            <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur p-2 rounded text-[10px] text-primary font-medium shadow-sm">
              Near Coimbatore Junction &amp; Collectorate
            </div>
          </div>
        </div>
        {/* Right Side: Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-emerald-900/5">
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1">
                  Name
                </label>
                <input
                  className="w-full bg-surface-container-low border-none rounded-xl p-4 text-on-surface placeholder:text-outline/50 focus:ring-1 focus:ring-emerald-500 transition-all"
                  placeholder="Your full name"
                  type="text"
                />
              </div>
              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1">
                  Email
                </label>
                <input
                  className="w-full bg-surface-container-low border-none rounded-xl p-4 text-on-surface placeholder:text-outline/50 focus:ring-1 focus:ring-emerald-500 transition-all"
                  placeholder="email@example.com"
                  type="email"
                />
              </div>
            </div>
            {/* Phone */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1">
                Phone Number
              </label>
              <input
                className="w-full bg-surface-container-low border-none rounded-xl p-4 text-on-surface placeholder:text-outline/50 focus:ring-1 focus:ring-emerald-500 transition-all"
                placeholder="+91 00000 00000"
                type="tel"
              />
            </div>
            {/* Message */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1">
                Message
              </label>
              <textarea
                className="w-full bg-surface-container-low border-none rounded-xl p-4 text-on-surface placeholder:text-outline/50 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
                placeholder="How can we help you?"
                rows={5}
              ></textarea>
            </div>
            <button
              className="w-full bg-emerald-900 text-white py-5 rounded-xl font-bold tracking-wide shadow-lg hover:bg-emerald-800 active:scale-[0.98] transition-all"
              type="submit"
            >
              Send Inquiry
            </button>
            <p className="text-center text-xs text-on-surface-variant/60 italic">
              By submitting this form, you agree to our privacy policy and terms of service.
            </p>
          </form>
        </div>
      </div>
    </main>
  )
}
