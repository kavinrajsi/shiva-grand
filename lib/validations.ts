const PHONE_RE = /^[+]?[\d\s\-()]{8,15}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateBookingPayload(data: Record<string, unknown>): string | null {
  const { name, phone, email, checkIn, checkOut, roomType } = data as Record<string, string>

  if (!name?.trim() || name.trim().length < 2) return 'Name must be at least 2 characters'
  if (!phone?.trim() || !PHONE_RE.test(phone.trim())) return 'A valid phone number is required'
  if (email && !EMAIL_RE.test(email)) return 'Invalid email format'
  if (!checkIn) return 'Check-in date is required'
  if (!checkOut) return 'Check-out date is required'
  if (checkOut <= checkIn) return 'Check-out must be after check-in'
  if (!roomType?.trim()) return 'Room type is required'

  return null
}

export function validateContactPayload(data: Record<string, unknown>): string | null {
  const { name, email, phone, message } = data as Record<string, string>

  if (!name?.trim() || name.trim().length < 2) return 'Name must be at least 2 characters'
  if (!email?.trim() || !EMAIL_RE.test(email)) return 'A valid email is required'
  if (!phone?.trim() || !PHONE_RE.test(phone.trim())) return 'A valid phone number is required'
  if (!message?.trim() || message.trim().length < 10) return 'Message must be at least 10 characters'

  return null
}
