'use client'

import { useState } from 'react'

interface Values {
  name: string
  email: string
  phone: string
  message: string
}

interface Errors {
  name?: string
  email?: string
  phone?: string
  message?: string
}

function validate(v: Values): Errors {
  const e: Errors = {}

  if (!v.name.trim()) e.name = 'Name is required'
  else if (v.name.trim().length < 2) e.name = 'Enter at least 2 characters'

  if (!v.email.trim()) e.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Enter a valid email address'

  if (!v.phone.trim()) e.phone = 'Phone number is required'
  else if (!/^[+]?[\d\s\-()]{8,15}$/.test(v.phone.trim())) e.phone = 'Enter a valid phone number'

  if (!v.message.trim()) e.message = 'Message is required'
  else if (v.message.trim().length < 10) e.message = 'Message must be at least 10 characters'

  return e
}

function inputClass(field: string, errors: Errors, touched: Record<string, boolean>) {
  const base = 'w-full bg-surface-container-low border-none rounded-xl p-4 text-on-surface placeholder:text-outline/50 focus:ring-1 focus:outline-none transition-all'
  if (!touched[field]) return `${base} focus:ring-emerald-500`
  if (errors[field as keyof Errors]) return `${base} ring-2 ring-red-400 bg-red-50 placeholder:text-red-300`
  return `${base} ring-2 ring-green-500`
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><span className="material-symbols-outlined text-sm">error</span>{msg}</p>
}

export default function ContactForm() {
  const [values, setValues] = useState<Values>({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function handleChange(field: keyof Values, value: string) {
    const next = { ...values, [field]: value }
    setValues(next)
    if (touched[field]) setErrors(validate(next))
  }

  function handleBlur(field: keyof Values) {
    setTouched(prev => ({ ...prev, [field]: true }))
    setErrors(validate(values))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const allTouched = Object.keys(values).reduce((acc, k) => ({ ...acc, [k]: true }), {})
    setTouched(allTouched)
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-emerald-900/5 text-center">
        <span className="material-symbols-outlined text-5xl text-green-500 mb-4 block">check_circle</span>
        <h3 className="text-2xl font-bold text-primary mb-2">Message Sent!</h3>
        <p className="text-on-surface-variant">We'll respond within <strong>24 hours</strong>. Check your inbox for a confirmation.</p>
        <p className="text-sm text-on-surface-variant mt-3">Urgent? Call <strong>090477 57777</strong></p>
      </div>
    )
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-emerald-900/5">
      <form className="space-y-8" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-1">
            <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1">Name *</label>
            <input type="text" placeholder="Your full name" value={values.name}
              onChange={e => handleChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              className={inputClass('name', errors, touched)} />
            <FieldError msg={touched.name ? errors.name : undefined} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1">Email *</label>
            <input type="email" placeholder="email@example.com" value={values.email}
              onChange={e => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              className={inputClass('email', errors, touched)} />
            <FieldError msg={touched.email ? errors.email : undefined} />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1">Phone Number *</label>
          <input type="tel" placeholder="+91 00000 00000" value={values.phone}
            onChange={e => handleChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            className={inputClass('phone', errors, touched)} />
          <FieldError msg={touched.phone ? errors.phone : undefined} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1">Message *</label>
          <textarea rows={5} placeholder="How can we help you?" value={values.message}
            onChange={e => handleChange('message', e.target.value)}
            onBlur={() => handleBlur('message')}
            className={inputClass('message', errors, touched) + ' resize-none'} />
          <FieldError msg={touched.message ? errors.message : undefined} />
        </div>
        {status === 'error' && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">error</span>
            Something went wrong. Please try again or call 090477 57777.
          </p>
        )}
        <button type="submit" disabled={status === 'loading'}
          className="w-full bg-emerald-900 text-white py-5 rounded-xl font-bold tracking-wide shadow-lg hover:bg-emerald-800 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {status === 'loading' ? (
            <><span className="material-symbols-outlined animate-spin text-sm">progress_activity</span> Sending…</>
          ) : 'Send Inquiry'}
        </button>
        <p className="text-center text-xs text-on-surface-variant/60 italic">
          By submitting this form, you agree to our privacy policy and terms of service.
        </p>
      </form>
    </div>
  )
}
