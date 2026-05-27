"use client";

import { useActionState, useEffect, useState } from "react";
import { sendContactMessage } from "@/app/contact-us/actions";
import { validateContact } from "@/lib/validations";

const INPUT_BASE =
  "w-full bg-surface-container-low border rounded-xl p-4 text-on-surface placeholder:text-outline/50 transition-all disabled:opacity-60";
const INPUT_OK = "border-transparent focus:ring-1 focus:ring-emerald-500";
const INPUT_BAD =
  "border-red-500 focus:ring-1 focus:ring-red-500 focus:border-red-500";

function fieldClass(touched, error) {
  return `${INPUT_BASE} ${touched && error ? INPUT_BAD : INPUT_OK}`;
}

const EMPTY = { name: "", email: "", phone: "", message: "" };

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    sendContactMessage,
    null
  );
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

  const { fieldErrors: liveErrors } = validateContact(values);
  const serverFieldErrors = state?.fieldErrors || {};

  const visibleErrors = {};
  for (const key of Object.keys(liveErrors)) {
    if (touched[key]) visibleErrors[key] = liveErrors[key];
  }
  for (const [key, msg] of Object.entries(serverFieldErrors)) {
    visibleErrors[key] = msg;
  }

  if (showSuccess) {
    return (
      <div className="bg-secondary-container/40 border border-primary/10 rounded-2xl p-10 text-center">
        <span className="material-symbols-outlined fill-1 text-5xl text-primary mb-4">
          mark_email_read
        </span>
        <h3 className="text-2xl font-bold text-primary mb-2">
          Message sent.
        </h3>
        <p className="text-on-surface-variant max-w-md mx-auto">
          Thanks — we&apos;ve received your enquiry and a confirmation copy is
          on its way to your inbox.
        </p>
        <button
          type="button"
          onClick={() => setShowSuccess(false)}
          className="mt-6 text-primary font-bold hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  function handleBlur(event) {
    setTouched((t) => ({ ...t, [event.target.name]: true }));
  }

  return (
    <form action={formAction} className="space-y-8" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Field
          id="name"
          label="Name"
          type="text"
          placeholder="Your full name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={visibleErrors.name}
          touched={Boolean(touched.name)}
          disabled={isPending}
          required
        />
        <Field
          id="email"
          label="Email"
          type="email"
          placeholder="email@example.com"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={visibleErrors.email}
          touched={Boolean(touched.email)}
          disabled={isPending}
          required
        />
      </div>

      <Field
        id="phone"
        label="Phone Number"
        type="tel"
        placeholder="+91 00000 00000"
        value={values.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        error={visibleErrors.phone}
        touched={Boolean(touched.phone)}
        disabled={isPending}
      />

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1"
        >
          Message
          <span className="text-red-500"> *</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          disabled={isPending}
          placeholder="How can we help you?"
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${fieldClass(touched.message, visibleErrors.message)} resize-none`}
          aria-invalid={touched.message && Boolean(visibleErrors.message)}
          aria-describedby={visibleErrors.message ? "message-error" : undefined}
        />
        {visibleErrors.message ? (
          <p id="message-error" className="text-xs text-red-600 ml-1">
            {visibleErrors.message}
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
        className="w-full bg-emerald-900 text-white py-5 rounded-xl font-bold tracking-wide shadow-lg hover:bg-emerald-800 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <span className="material-symbols-outlined animate-spin">
              progress_activity
            </span>
            Sending…
          </>
        ) : (
          "Send Inquiry"
        )}
      </button>

      <p className="text-center text-xs text-on-surface-variant/60 italic">
        By submitting this form, you agree to our privacy policy and terms of
        service.
      </p>
    </form>
  );
}

function Field({
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
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1"
      >
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={fieldClass(touched, error)}
        aria-invalid={touched && Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <p id={`${id}-error`} className="text-xs text-red-600 ml-1">
          {error}
        </p>
      ) : null}
    </div>
  );
}
