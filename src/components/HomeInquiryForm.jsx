"use client";

import { useActionState, useEffect, useState } from "react";
import { sendHomeInquiry } from "@/lib/actions/home-inquiry";
import {
  validateHomeInquiry,
  HOME_INQUIRY_ROOM_TYPES,
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

const EMPTY = {
  name: "",
  phone: "",
  checkIn: "",
  checkOut: "",
  roomType: HOME_INQUIRY_ROOM_TYPES[0],
  notes: "",
};

export default function HomeInquiryForm() {
  const [state, formAction, isPending] = useActionState(sendHomeInquiry, null);
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state?.ok) {
      setShowSuccess(true);
      setValues(EMPTY);
      setTouched({});
    }
  }, [state]);

  const { fieldErrors: liveErrors } = validateHomeInquiry(values);
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
      <div className="text-center py-6">
        <span className="material-symbols-outlined fill-1 text-5xl text-primary mb-4">
          mark_email_read
        </span>
        <h3 className="text-2xl font-bold text-primary mb-2">
          Request received.
        </h3>
        <p className="text-zinc-600 max-w-md mx-auto">
          Thanks — our team will call you on the number you provided within 30
          minutes to confirm availability.
        </p>
        <button
          type="button"
          onClick={() => setShowSuccess(false)}
          className="mt-6 text-primary font-bold hover:underline"
        >
          Send another inquiry
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
    <form action={formAction} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DateField
          id="checkIn"
          label="Check-in Date"
          value={values.checkIn}
          onChange={(v) => set("checkIn", v)}
          onBlur={() => markTouched("checkIn")}
          error={visible.checkIn}
          touched={Boolean(touched.checkIn)}
          disabled={isPending}
        />
        <DateField
          id="checkOut"
          label="Check-out Date"
          value={values.checkOut}
          onChange={(v) => set("checkOut", v)}
          onBlur={() => markTouched("checkOut")}
          error={visible.checkOut}
          touched={Boolean(touched.checkOut)}
          disabled={isPending}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextField
          id="name"
          label="Name"
          type="text"
          placeholder="Enter your name"
          value={values.name}
          onChange={(v) => set("name", v)}
          onBlur={() => markTouched("name")}
          error={visible.name}
          touched={Boolean(touched.name)}
          disabled={isPending}
          required
        />
        <TextField
          id="phone"
          label="Phone"
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
      </div>

      <div className="flex flex-col gap-2">
        <FieldLabel id="roomType" required>
          Stay Type
        </FieldLabel>
        <select
          id="roomType"
          name="roomType"
          required
          disabled={isPending}
          value={values.roomType}
          onChange={(e) => set("roomType", e.target.value)}
          onBlur={() => markTouched("roomType")}
          className={inputCx(touched.roomType, visible.roomType)}
          aria-invalid={touched.roomType && Boolean(visible.roomType)}
          aria-describedby={
            visible.roomType ? "roomType-error" : undefined
          }
        >
          {HOME_INQUIRY_ROOM_TYPES.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ErrorMsg id="roomType-error" message={visible.roomType} />
      </div>

      <div className="flex flex-col gap-2">
        <FieldLabel id="notes">Notes</FieldLabel>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          disabled={isPending}
          placeholder="Late check-in, etc."
          value={values.notes}
          onChange={(e) => set("notes", e.target.value)}
          onBlur={() => markTouched("notes")}
          className={`${inputCx(touched.notes, visible.notes)} resize-none`}
          aria-invalid={touched.notes && Boolean(visible.notes)}
          aria-describedby={visible.notes ? "notes-error" : undefined}
        />
        <ErrorMsg id="notes-error" message={visible.notes} />
      </div>

      {state?.error ? (
        <div
          role="alert"
          className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-4"
        >
          {state.error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-primary text-white py-4 rounded-lg uppercase tracking-widest text-xs font-extrabold hover:bg-[#1e4d33] transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <span className="material-symbols-outlined animate-spin">
              progress_activity
            </span>
            Sending…
          </>
        ) : (
          "Send Booking Inquiry"
        )}
      </button>
    </form>
  );
}

function FieldLabel({ id, children, required }) {
  return (
    <label
      htmlFor={id}
      className="uppercase tracking-widest text-[10px] font-bold text-zinc-500"
    >
      {children}
      {required ? <span className="text-red-500"> *</span> : null}
    </label>
  );
}

function ErrorMsg({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="text-xs text-red-600">
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
    <div className="flex flex-col gap-2">
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
    <div className="flex flex-col gap-2">
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
