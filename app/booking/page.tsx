export default function Booking() {
  return (
    <main className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-8">
        {/* Hero Section: Asymmetric Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 relative h-[500px] lg:h-[650px] rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover grayscale-[20%] hover:scale-105 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGVxaXJT-hEjL925HGU8n3wT6N6dWJW1AJ1H_DTxgSqj6qEG_SXm1unjN1BmJ3HcmDKx6AW5royVURs-KXvdNwoQd7vNGUxmbg0cKzO3B7V0q-RZ1vt8pyPD_mTL4vhBippUBju2-5-xc17125qvY2pS0xoqWGMMvW5sfNqk7bXlYdmEu4pZ8xqoSOf4gBpvW0bho2NKYB7387wU7mrrlBk0zi6Amo2oiI80oLAWaD2OFf8EQH8IYQVhsnGBveVnfCi2A0KJ2EvQEo"
              alt="Calm luxury hotel lobby with green plants"
            />
            <div className="absolute inset-0 bg-primary/10"></div>
          </div>
          <div className="lg:col-span-5 lg:-ml-24 z-10">
            <div className="bg-surface-container-lowest p-10 lg:p-16 shadow-lg rounded-xl">
              <span className="label-md text-primary font-bold tracking-[0.2em] mb-6 block">
                PENDING CONFIRMATION
              </span>
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tighter text-primary leading-tight mb-6">
                We&apos;ve received your request.
              </h1>
              <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
                Thank you for choosing Shiva Grand Residency. Your reservation is currently being processed and is{' '}
                <span className="font-bold text-primary">NOT yet confirmed</span>.
              </p>
              <div className="flex items-center gap-4 bg-secondary-container/30 p-4 rounded-xl border border-primary/5">
                <span className="material-symbols-outlined text-primary" data-weight="fill">
                  call
                </span>
                <p className="text-sm font-medium text-on-secondary-container">
                  Our staff will call you shortly on your provided number to finalize your stay.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Details Bento Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Reference Card */}
          <div className="bg-surface-container-low p-8 rounded-xl flex flex-col justify-between">
            <div>
              <span className="text-[0.65rem] uppercase tracking-widest text-on-surface-variant font-bold">
                Request Reference
              </span>
              <h2 className="text-3xl font-bold text-primary mt-2">#SGR-88429</h2>
            </div>
            <p className="text-sm text-on-surface-variant mt-4">
              Please quote this number if you need to contact us before our call.
            </p>
          </div>
          {/* Summary Card */}
          <div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-xl shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <span className="text-[0.65rem] uppercase tracking-widest text-on-surface-variant font-bold">
                  Check-In
                </span>
                <p className="font-bold text-lg text-primary mt-1">Oct 24, 2024</p>
              </div>
              <div>
                <span className="text-[0.65rem] uppercase tracking-widest text-on-surface-variant font-bold">
                  Check-Out
                </span>
                <p className="font-bold text-lg text-primary mt-1">Oct 26, 2024</p>
              </div>
              <div>
                <span className="text-[0.65rem] uppercase tracking-widest text-on-surface-variant font-bold">
                  Room Type
                </span>
                <p className="font-bold text-lg text-primary mt-1">Deluxe Suite</p>
              </div>
              <div>
                <span className="text-[0.65rem] uppercase tracking-widest text-on-surface-variant font-bold">
                  Guests
                </span>
                <p className="font-bold text-lg text-primary mt-1">2 Adults</p>
              </div>
            </div>
          </div>
        </div>
        {/* Next Steps & Support */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-8">What happens next?</h3>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold">01</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">Verification</h4>
                  <p className="text-on-surface-variant text-sm mt-1 leading-relaxed">
                    Our reservation desk verifies room availability for your selected dates.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold">02</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">Confirmation Call</h4>
                  <p className="text-on-surface-variant text-sm mt-1 leading-relaxed">
                    A team member will call you within 30 minutes to confirm details and payment options.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold">03</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">Digital Voucher</h4>
                  <p className="text-on-surface-variant text-sm mt-1 leading-relaxed">
                    Once confirmed via phone, a formal booking voucher will be sent to your email.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-primary p-12 rounded-xl text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Need immediate help?</h3>
              <p className="text-white/80 mb-8 leading-relaxed">
                If you haven&apos;t heard from us or need to change your request immediately, please reach out to our
                24/7 concierge.
              </p>
              <div className="space-y-4">
                <a
                  className="flex items-center gap-4 hover:translate-x-2 transition-transform"
                  href="tel:09047757777"
                >
                  <span className="material-symbols-outlined">call</span>
                  <span className="font-medium">090477 57777</span>
                </a>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined">location_on</span>
                  <span className="text-sm">54, Old Post Office Rd, Coimbatore</span>
                </div>
              </div>
            </div>
            {/* Background texture decoration */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </main>
  )
}
