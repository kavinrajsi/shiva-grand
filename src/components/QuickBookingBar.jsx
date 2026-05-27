"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BOOKING_GUESTS,
  todayISO,
  validateQuickInquiry,
} from "@/lib/validations";

const INPUT_BASE =
  "w-full rounded-lg py-3 px-3 text-sm transition-colors disabled:opacity-60";
const INPUT_OK =
  "border border-zinc-200 focus:ring-primary focus:border-primary";
const INPUT_BAD =
  "border border-red-500 focus:ring-1 focus:ring-red-500 focus:border-red-500";

function inputCx(touched, error) {
  return `${INPUT_BASE} ${touched && error ? INPUT_BAD : INPUT_OK}`;
}

const EMPTY = { checkIn: "", checkOut: "", guests: "2 Guests" };

export default function QuickBookingBar() {
  const router = useRouter();
  const today = todayISO();
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const { fieldErrors, valid, data } = validateQuickInquiry(values);
  const visible = {};
  for (const key of Object.keys(fieldErrors)) {
    if (touched[key] || submitAttempted) visible[key] = fieldErrors[key];
  }

  function set(name, value) {
    setValues((v) => ({ ...v, [name]: value }));
  }
  function markTouched(name) {
    setTouched((t) => ({ ...t, [name]: true }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitAttempted(true);
    if (!valid) return;
    const params = new URLSearchParams({
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: data.guests,
    });
    router.push(`/book-you-stay?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl p-8 flex flex-col lg:flex-row gap-8 items-center border border-zinc-100"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-start">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="quick-checkIn"
            className="uppercase tracking-widest text-[10px] font-bold text-zinc-500"
          >
            Check In <span className="text-red-500">*</span>
          </label>
          <input
            id="quick-checkIn"
            name="checkIn"
            type="date"
            min={today}
            value={values.checkIn}
            onChange={(e) => set("checkIn", e.target.value)}
            onBlur={() => markTouched("checkIn")}
            className={inputCx(
              touched.checkIn || submitAttempted,
              visible.checkIn
            )}
            aria-invalid={
              (touched.checkIn || submitAttempted) && Boolean(visible.checkIn)
            }
            aria-describedby={
              visible.checkIn ? "quick-checkIn-error" : undefined
            }
          />
          {visible.checkIn ? (
            <p id="quick-checkIn-error" className="text-xs text-red-600">
              {visible.checkIn}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="quick-checkOut"
            className="uppercase tracking-widest text-[10px] font-bold text-zinc-500"
          >
            Check Out <span className="text-red-500">*</span>
          </label>
          <input
            id="quick-checkOut"
            name="checkOut"
            type="date"
            min={values.checkIn || today}
            value={values.checkOut}
            onChange={(e) => set("checkOut", e.target.value)}
            onBlur={() => markTouched("checkOut")}
            className={inputCx(
              touched.checkOut || submitAttempted,
              visible.checkOut
            )}
            aria-invalid={
              (touched.checkOut || submitAttempted) && Boolean(visible.checkOut)
            }
            aria-describedby={
              visible.checkOut ? "quick-checkOut-error" : undefined
            }
          />
          {visible.checkOut ? (
            <p id="quick-checkOut-error" className="text-xs text-red-600">
              {visible.checkOut}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="quick-guests"
            className="uppercase tracking-widest text-[10px] font-bold text-zinc-500"
          >
            Guests <span className="text-red-500">*</span>
          </label>
          <select
            id="quick-guests"
            name="guests"
            value={values.guests}
            onChange={(e) => set("guests", e.target.value)}
            onBlur={() => markTouched("guests")}
            className={inputCx(
              touched.guests || submitAttempted,
              visible.guests
            )}
            aria-invalid={
              (touched.guests || submitAttempted) && Boolean(visible.guests)
            }
            aria-describedby={
              visible.guests ? "quick-guests-error" : undefined
            }
          >
            {BOOKING_GUESTS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {visible.guests ? (
            <p id="quick-guests-error" className="text-xs text-red-600">
              {visible.guests}
            </p>
          ) : null}
        </div>
      </div>
      <button
        type="submit"
        className="w-full lg:w-auto bg-primary text-white px-10 py-4 rounded-lg uppercase tracking-widest text-sm font-bold hover:bg-[#1e4d33] transition-colors whitespace-nowrap"
      >
        Enquire Now
      </button>
    </form>
  );
}
