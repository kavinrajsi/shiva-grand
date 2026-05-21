import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createServerSupabase } from '@/lib/supabase'
import { contactUserEmail, contactAdminEmail } from '@/lib/email-templates'
import { checkRateLimit } from '@/lib/rate-limit'
import { validateContactPayload } from '@/lib/validations'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  // Rate limit: 5 submissions per minute per IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!checkRateLimit(ip, 5)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment before trying again.' },
      { status: 429 }
    )
  }

  try {
    const body = await request.json()

    // Server-side validation
    const validationError = validateContactPayload(body)
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    const { name, email, phone, message } = body

    // Store in Supabase
    const supabase = createServerSupabase()
    const { error: dbError } = await supabase.from('contact_submissions').insert({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim(),
    })
    if (dbError) console.error('Supabase insert error:', dbError)

    const fromEmail = process.env.RESEND_FROM_EMAIL!
    const adminEmail = process.env.ADMIN_EMAIL!
    const cc = process.env.EMAIL_CC?.split(',').map(e => e.trim()).filter(Boolean)
    const bcc = process.env.EMAIL_BCC?.split(',').map(e => e.trim()).filter(Boolean)

    // Send confirmation to user
    await resend.emails.send({
      from: fromEmail,
      to: email.trim(),
      subject: 'We received your message — Shiva Grand Residency',
      html: contactUserEmail({ name, message }),
    })

    // Send notification to admin (with CC/BCC)
    await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      ...(cc?.length && { cc }),
      ...(bcc?.length && { bcc }),
      subject: `New contact form submission from ${name}`,
      html: contactAdminEmail({ name, email, phone, message }),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Failed to submit message' }, { status: 500 })
  }
}
