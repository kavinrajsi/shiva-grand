'use client'

import { useState } from 'react'

interface Values {
  checkIn: string
  checkOut: string
  guests: string
  roomType: string
  name: string
  phone: string
  email: string
  notes: string
}

interface Errors {
  checkIn?: string
  checkOut?: string
  guests?: string
  roomType?: string
  name?: string
  phone?: string
  email?: string
}

const today = new Date().toISOString().split('T')[0]

function validate(v: Values): Errors {
  const e: Errors = {}
  if (!v.checkIn) e.checkIn = 'Check-in date is required'
  else if (v.checkIn < today) e.checkIn = 'Check-in cannot be in the past'

  if (!v.checkOut) e.checkOut = 'Check-out date is required'
  else if (v.checkIn && v.checkOut <= v.checkIn) e.checkOut = 'Check-out must be after check-in'

  if (!v.guests) e.guests = 'Select number of guests'
  if (!v.roomType) e.roomType = 'Select a room type'

  if (!v.name.trim()) e.name = 'Name is required'
  else if (v.name.trim().length < 2) e.name = 'Enter at least 2 characters'

  if (!v.phone.trim()) e.phone = 'Phone number is required'
  else if (!/^[+]?[\d\s\-()]{8,15}$/.test(v.phone.trim())) e.phone = 'Enter a valid phone number'

  if (!v.email.trim()) e.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Enter a valid email'

  return e
}

function inputClass(field: string, errors: Errors, touched: Record<string, boolean>) {
  const base = 'w-full bg-surface-container-high border-none rounded-xl focus:ring-2 focus:outline-none px-4 py-3 text-sm transition-colors'
  if (!touched[field]) return `${base} focus:ring-primary/20`
  if (errors[field as keyof Errors]) return `${base} ring-2 ring-red-400 bg-red-50`
  return `${base} ring-2 ring-green-400`
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><span className="material-symbols-outlined text-sm">error</span>{msg}</p>
}

export default function RoomsForm() {
  const [values, setValues] = useState<Values>({
    checkIn: '', checkOut: '', guests: '', roomType: '', name: '', phone: '', email: '', notes: '',
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
        body: JSON.stringify({ ...values, source: 'rooms' }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-surface-container-lowest p-8 lg:p-10 rounded-3xl shadow-sm border border-outline-variant/10 text-center">
        <span className="material-symbols-outlined text-5xl text-green-500 mb-4 block">check_circle</span>
        <h3 className="text-2xl font-bold text-primary mb-2">Reservation Requested!</h3>
        <p className="text-on-surface-variant text-sm">Check your email for confirmation. We'll call you within <strong>30 minutes</strong>.</p>
        <p className="text-xs text-on-surface-variant mt-3">Need help now? <strong>090477 57777</strong></p>
      </div>
    )
  }

  return (
    <div className="bg-surface-container-lowest p-8 lg:p-10 rounded-3xl shadow-sm border border-outline-variant/10">
      <h2 className="text-2xl font-bold text-primary mb-8 tracking-tight">Reserve Your Room</h2>
      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">Check-in *</label>
            <input type="date" min={today} value={values.checkIn}
              onChange={e => handleChange('checkIn', e.target.value)}
              onBlur={() => handleBlur('checkIn')}
              className={inputClass('checkIn', errors, touched)} />
            <FieldError msg={touched.checkIn ? errors.checkIn : undefined} />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">Check-out *</label>
            <input type="date" min={values.checkIn || today} value={values.checkOut}
              onChange={e => handleChange('checkOut', e.target.value)}
              onBlur={() => handleBlur('checkOut')}
              className={inputClass('checkOut', errors, touched)} />
            <FieldError msg={touched.checkOut ? errors.checkOut : undefined} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">Guests *</label>
            <select value={values.guests}
              onChange={e => handleChange('guests', e.target.value)}
              onBlur={() => handleBlur('guests')}
              className={inputClass('guests', errors, touched) + ' appearance-none'}>
              <option value="">Select guests</option>
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>4+ Guests</option>
            </select>
            <FieldError msg={touched.guests ? errors.guests : undefined} />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">Room Type *</label>
            <select value={values.roomType}
              onChange={e => handleChange('roomType', e.target.value)}
              onBlur={() => handleBlur('roomType')}
              className={inputClass('roomType', errors, touched) + ' appearance-none'}>
              <option value="">Select room</option>
              <option>Standard Double</option>
              <option>Deluxe AC</option>
              <option>Premium Family</option>
            </select>
            <FieldError msg={touched.roomType ? errors.roomType : undefined} />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">Full Name *</label>
          <input type="text" placeholder="John Doe" value={values.name}
            onChange={e => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            className={inputClass('name', errors, touched)} />
          <FieldError msg={touched.name ? errors.name : undefined} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">Phone *</label>
            <input type="tel" placeholder="+91 00000 00000" value={values.phone}
              onChange={e => handleChange('phone', e.target.value)}
              onBlur={() => handleBlur('phone')}
              className={inputClass('phone', errors, touched)} />
            <FieldError msg={touched.phone ? errors.phone : undefined} />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">Email *</label>
            <input type="email" placeholder="john@example.com" value={values.email}
              onChange={e => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              className={inputClass('email', errors, touched)} />
            <FieldError msg={touched.email ? errors.email : undefined} />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">Special Requests</label>
          <textarea rows={2} placeholder="Late check-in, extra towels…"
            value={values.notes}
            onChange={e => handleChange('notes', e.target.value)}
            className="w-full bg-surface-container-high border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:outline-none px-4 py-3 text-sm resize-none" />
        </div>
        {status === 'error' && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">error</span>
            Something went wrong. Please try again or call 090477 57777.
          </p>
        )}
        <button type="submit" disabled={status === 'loading'}
          className="w-full botanical-gradient text-on-primary py-4 rounded-xl font-bold tracking-widest uppercase text-xs shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {status === 'loading' ? (
            <><span className="material-symbols-outlined animate-spin text-sm">progress_activity</span> Sending…</>
          ) : 'Confirm Reservation'}
        </button>
        <p className="text-center text-[10px] text-on-surface-variant tracking-wide">
          NO UPFRONT PAYMENT REQUIRED • FREE CANCELLATION UP TO 24H
        </p>
      </form>
    </div>
  )
}
