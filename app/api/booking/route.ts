import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createServerSupabase } from '@/lib/supabase'
import { bookingUserEmail, bookingAdminEmail } from '@/lib/email-templates'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, checkIn, checkOut, guests, roomType, notes, source } = body

    // Store in Supabase
    const supabase = createServerSupabase()
    const { error: dbError } = await supabase.from('booking_inquiries').insert({
      name,
      phone,
      email: email || null,
      check_in: checkIn,
      check_out: checkOut,
      guests: guests || null,
      room_type: roomType,
      notes: notes || null,
      source: source || 'home',
    })
    if (dbError) console.error('Supabase insert error:', dbError)

    const fromEmail = process.env.RESEND_FROM_EMAIL!
    const adminEmail = process.env.ADMIN_EMAIL!
    const cc = process.env.EMAIL_CC?.split(',').map(e => e.trim()).filter(Boolean)
    const bcc = process.env.EMAIL_BCC?.split(',').map(e => e.trim()).filter(Boolean)

    // Send confirmation to user if email provided
    if (email) {
      await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: 'Your booking inquiry — Shiva Grand Residency',
        html: bookingUserEmail({ name, checkIn, checkOut, roomType, guests, email }),
      })
    }

    // Send notification to admin (with CC/BCC)
    await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      ...(cc?.length && { cc }),
      ...(bcc?.length && { bcc }),
      subject: `New booking inquiry from ${name}`,
      html: bookingAdminEmail({ name, phone, email, checkIn, checkOut, roomType, guests, notes, source }),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Booking API error:', error)
    return NextResponse.json({ error: 'Failed to submit booking' }, { status: 500 })
  }
}
