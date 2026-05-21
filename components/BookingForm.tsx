'use client'

import { useState } from 'react'

interface Values {
  checkIn: string
  checkOut: string
  name: string
  email: string
  phone: string
  roomType: string
  notes: string
}

interface Errors {
  checkIn?: string
  checkOut?: string
  name?: string
  email?: string
  phone?: string
  roomType?: string
}

const today = new Date().toISOString().split('T')[0]

function validate(v: Values): Errors {
  const e: Errors = {}
  if (!v.checkIn) e.checkIn = 'Check-in date is required'
  else if (v.checkIn < today) e.checkIn = 'Check-in cannot be in the past'

  if (!v.checkOut) e.checkOut = 'Check-out date is required'
  else if (v.checkIn && v.checkOut <= v.checkIn) e.checkOut = 'Check-out must be after check-in'

  if (!v.name.trim()) e.name = 'Name is required'
  else if (v.name.trim().length < 2) e.name = 'Enter at least 2 characters'

  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Enter a valid email'

  if (!v.phone.trim()) e.phone = 'Phone number is required'
  else if (!/^[+]?[\d\s\-()]{8,15}$/.test(v.phone.trim())) e.phone = 'Enter a valid phone number'

  if (!v.roomType) e.roomType = 'Please select a room type'

  return e
}

function inputClass(field: string, errors: Errors, touched: Record<string, boolean>) {
  const base = 'w-full border rounded-lg py-3 px-3 text-sm focus:outline-none focus:ring-2 transition-colors'
  if (!touched[field]) return `${base} border-zinc-200 focus:ring-primary/30 focus:border-primary`
  if (errors[field as keyof Errors]) return `${base} border-red-400 bg-red-50 focus:ring-red-200`
  return `${base} border-green-500 focus:ring-green-200`
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><span className="material-symbols-outlined text-sm">error</span>{msg}</p>
}

export default function BookingForm() {
  const [values, setValues] = useState<Values>({
    checkIn: '', checkOut: '', name: '', email: '', phone: '', roomType: '', notes: '',
  })
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
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, source: 'home' }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl text-center">
        <span className="material-symbols-outlined text-5xl text-green-500 mb-4 block">check_circle</span>
        <h3 className="text-2xl font-bold text-primary mb-2">Inquiry Sent!</h3>
        <p className="text-zinc-600">We'll get back to you within <strong>30 minutes</strong>. Check your email for confirmation.</p>
        <p className="text-sm text-zinc-400 mt-2">Need help now? Call <strong>090477 57777</strong></p>
      </div>
    )
  }

  return (
    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl">
      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label className="uppercase tracking-widest text-[10px] font-bold text-zinc-500">Check-in Date *</label>
            <input type="date" min={today} value={values.checkIn}
              onChange={e => handleChange('checkIn', e.target.value)}
              onBlur={() => handleBlur('checkIn')}
              className={inputClass('checkIn', errors, touched)} />
            <FieldError msg={touched.checkIn ? errors.checkIn : undefined} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="uppercase tracking-widest text-[10px] font-bold text-zinc-500">Check-out Date *</label>
            <input type="date" min={values.checkIn || today} value={values.checkOut}
              onChange={e => handleChange('checkOut', e.target.value)}
              onBlur={() => handleBlur('checkOut')}
              className={inputClass('checkOut', errors, touched)} />
            <FieldError msg={touched.checkOut ? errors.checkOut : undefined} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label className="uppercase tracking-widest text-[10px] font-bold text-zinc-500">Name *</label>
            <input type="text" placeholder="Your full name" value={values.name}
              onChange={e => handleChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              className={inputClass('name', errors, touched)} />
            <FieldError msg={touched.name ? errors.name : undefined} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="uppercase tracking-widest text-[10px] font-bold text-zinc-500">Phone *</label>
            <input type="tel" placeholder="+91 00000 00000" value={values.phone}
              onChange={e => handleChange('phone', e.target.value)}
              onBlur={() => handleBlur('phone')}
              className={inputClass('phone', errors, touched)} />
            <FieldError msg={touched.phone ? errors.phone : undefined} />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="uppercase tracking-widest text-[10px] font-bold text-zinc-500">Email <span className="text-zinc-400 normal-case font-normal">(optional — for confirmation)</span></label>
          <input type="email" placeholder="you@example.com" value={values.email}
            onChange={e => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            className={inputClass('email', errors, touched)} />
          <FieldError msg={touched.email ? errors.email : undefined} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="uppercase tracking-widest text-[10px] font-bold text-zinc-500">Stay Type *</label>
          <select value={values.roomType}
            onChange={e => handleChange('roomType', e.target.value)}
            onBlur={() => handleBlur('roomType')}
            className={inputClass('roomType', errors, touched)}>
            <option value="">Select a room type</option>
            <option>Standard Double (₹1,500)</option>
            <option>Deluxe AC (₹1,850)</option>
            <option>Family Room (₹2,000)</option>
          </select>
          <FieldError msg={touched.roomType ? errors.roomType : undefined} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="uppercase tracking-widest text-[10px] font-bold text-zinc-500">Notes</label>
          <textarea rows={3} placeholder="Late check-in, special requests, etc."
            value={values.notes}
            onChange={e => handleChange('notes', e.target.value)}
            className="w-full border border-zinc-200 rounded-lg py-3 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none transition-colors" />
        </div>
        {status === 'error' && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">error</span>
            Something went wrong. Please try again or call 090477 57777.
          </p>
        )}
        <button type="submit" disabled={status === 'loading'}
          className="w-full bg-primary text-white py-4 rounded-lg uppercase tracking-widest text-xs font-extrabold hover:bg-[#1e4d33] transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {status === 'loading' ? (
            <><span className="material-symbols-outlined animate-spin text-sm">progress_activity</span> Sending…</>
          ) : 'Send Booking Inquiry'}
        </button>
      </form>
    </div>
  )
}
