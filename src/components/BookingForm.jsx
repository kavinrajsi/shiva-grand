"use client";

import { useActionState, useEffect, useState } from "react";
import { sendBookingInquiry } from "@/app/book-you-stay/actions";
import {
  validateBookingInquiry,
  BOOKING_GUESTS,
  BOOKING_ROOM_TYPES,
} from "@/lib/validations";

const INPUT_BASE =
  "w-full bg-surface-container-high border rounded-xl focus:ring-0 focus:border-b-2 px-4 py-3 text-sm transition-all disabled:opacity-60";
const INPUT_OK = "border-transparent focus:border-primary";
const INPUT_BAD =
  "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500";

function inputCx(touched, error) {
  return `${INPUT_BASE} ${touched && error ? INPUT_BAD : INPUT_OK}`;
}

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  checkIn: "",
  checkOut: "",
  guests: "2 Guests",
  roomType: "Deluxe AC",
  requests: "",
};

export default function BookingForm({ initial }) {
  const [state, formAction, isPending] = useActionState(
    sendBookingInquiry,
    null
  );
  const [values, setValues] = useState({ ...EMPTY, ...(initial || {}) });
  const [touched, setTouched] = useState(() => {
    const t = {};
    for (const key of Object.keys(initial || {})) {
      if (initial[key]) t[key] = true;
    }
    return t;
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state?.ok) {
      setShowSuccess(true);
      setValues(EMPTY);
      setTouched({});
    }
  }, [state]);

  const { fieldErrors: liveErrors } = validateBookingInquiry(values);
  const serverErrors = state?.fieldErrors || {};
  const visible = {};
  for (const key of Object.keys(liveErrors)) {
    if (touched[key]) visible[key] = liveErrors[key];
  }
  for (const [key, msg] of Object.entries(serverErrors)) {
    visible[key] = msg;
  }

  if (showSuccess) {
    return (
      <div className="text-center py-8">
        <span className="material-symbols-outlined fill-1 text-5xl text-primary mb-4">
          mark_email_read
        </span>
        <h3 className="text-2xl font-bold text-primary mb-2">
          Request received.
        </h3>
        <p className="text-on-surface-variant max-w-md mx-auto">
          Your reservation is pending. We&apos;ll call you shortly to confirm.
          A copy is on its way to your inbox.
        </p>
        <button
          type="button"
          onClick={() => setShowSuccess(false)}
          className="mt-6 text-primary font-bold hover:underline"
        >
          Make another request
        </button>
      </div>
    );
  }

  function set(name, value) {
    setValues((v) => ({ ...v, [name]: value }));
  }

  function markTouched(name) {
    setTouched((t) => ({ ...t, [name]: true }));
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-primary mb-8 tracking-tight">
        Reserve Your Room
      </h2>
      <form action={formAction} className="space-y-6" noValidate>
        <div className="grid grid-cols-2 gap-4">
          <DateField
            id="checkIn"
            label="Check-in"
            value={values.checkIn}
            onChange={(v) => set("checkIn", v)}
            onBlur={() => markTouched("checkIn")}
            error={visible.checkIn}
            touched={Boolean(touched.checkIn)}
            disabled={isPending}
          />
          <DateField
            id="checkOut"
            label="Check-out"
            value={values.checkOut}
            onChange={(v) => set("checkOut", v)}
            onBlur={() => markTouched("checkOut")}
            error={visible.checkOut}
            touched={Boolean(touched.checkOut)}
            disabled={isPending}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SelectField
            id="guests"
            label="Guests"
            options={BOOKING_GUESTS}
            value={values.guests}
            onChange={(v) => set("guests", v)}
            onBlur={() => markTouched("guests")}
            error={visible.guests}
            touched={Boolean(touched.guests)}
            disabled={isPending}
          />
          <SelectField
            id="roomType"
            label="Room Type"
            options={BOOKING_ROOM_TYPES}
            value={values.roomType}
            onChange={(v) => set("roomType", v)}
            onBlur={() => markTouched("roomType")}
            error={visible.roomType}
            touched={Boolean(touched.roomType)}
            disabled={isPending}
          />
        </div>

        <TextField
          id="name"
          label="Full Name"
          type="text"
          placeholder="John Doe"
          value={values.name}
          onChange={(v) => set("name", v)}
          onBlur={() => markTouched("name")}
          error={visible.name}
          touched={Boolean(touched.name)}
          disabled={isPending}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <TextField
            id="phone"
            label="Phone Number"
            type="tel"
            placeholder="+91 00000 00000"
            value={values.phone}
            onChange={(v) => set("phone", v)}
            onBlur={() => markTouched("phone")}
            error={visible.phone}
            touched={Boolean(touched.phone)}
            disabled={isPending}
            required
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={values.email}
            onChange={(v) => set("email", v)}
            onBlur={() => markTouched("email")}
            error={visible.email}
            touched={Boolean(touched.email)}
            disabled={isPending}
            required
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="requests"
            className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1"
          >
            Special Requests
          </label>
          <textarea
            id="requests"
            name="requests"
            rows={2}
            disabled={isPending}
            placeholder="Late check-in, extra towels..."
            value={values.requests}
            onChange={(e) => set("requests", e.target.value)}
            onBlur={() => markTouched("requests")}
            className={`${inputCx(touched.requests, visible.requests)} resize-none`}
            aria-invalid={touched.requests && Boolean(visible.requests)}
            aria-describedby={
              visible.requests ? "requests-error" : undefined
            }
          />
          {visible.requests ? (
            <p id="requests-error" className="text-xs text-red-600 ml-1">
              {visible.requests}
            </p>
          ) : null}
        </div>

        {state?.error ? (
          <div
            role="alert"
            className="bg-error-container/50 border border-error/20 text-on-error-container text-sm rounded-xl p-4"
          >
            {state.error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isPending}
          className="w-full botanical-gradient text-on-primary py-4 rounded-xl font-bold tracking-widest uppercase text-xs shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <span className="material-symbols-outlined animate-spin">
                progress_activity
              </span>
              Sending…
            </>
          ) : (
            "Confirm Reservation"
          )}
        </button>

        <p className="text-center text-[10px] text-on-surface-variant tracking-wide mt-4">
          NO UPFRONT PAYMENT REQUIRED • FREE CANCELLATION UP TO 24H
        </p>
      </form>
    </>
  );
}

function FieldLabel({ id, children, required }) {
  return (
    <label
      htmlFor={id}
      className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1"
    >
      {children}
      {required ? <span className="text-red-500"> *</span> : null}
    </label>
  );
}

function ErrorMsg({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="text-xs text-red-600 ml-1">
      {message}
    </p>
  );
}

function TextField({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  disabled,
  required,
}) {
  const errorId = `${id}-error`;
  return (
    <div className="space-y-1.5">
      <FieldLabel id={id} required={required}>
        {label}
      </FieldLabel>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={inputCx(touched, error)}
        aria-invalid={touched && Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      <ErrorMsg id={errorId} message={error} />
    </div>
  );
}

function DateField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
  disabled,
}) {
  const errorId = `${id}-error`;
  return (
    <div className="space-y-1.5">
      <FieldLabel id={id} required>
        {label}
      </FieldLabel>
      <input
        id={id}
        name={id}
        type="date"
        required
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={inputCx(touched, error)}
        aria-invalid={touched && Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      <ErrorMsg id={errorId} message={error} />
    </div>
  );
}

function SelectField({
  id,
  label,
  options,
  value,
  onChange,
  onBlur,
  error,
  touched,
  disabled,
}) {
  const errorId = `${id}-error`;
  return (
    <div className="space-y-1.5">
      <FieldLabel id={id} required>
        {label}
      </FieldLabel>
      <select
        id={id}
        name={id}
        required
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`${inputCx(touched, error)} appearance-none`}
        aria-invalid={touched && Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ErrorMsg id={errorId} message={error} />
    </div>
  );
}
