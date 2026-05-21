import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createServerSupabase } from '@/lib/supabase'
import { contactUserEmail, contactAdminEmail } from '@/lib/email-templates'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    // Store in Supabase
    const supabase = createServerSupabase()
    const { error: dbError } = await supabase.from('contact_submissions').insert({
      name,
      email,
      phone,
      message,
    })
    if (dbError) console.error('Supabase insert error:', dbError)

    const fromEmail = process.env.RESEND_FROM_EMAIL!
    const adminEmail = process.env.ADMIN_EMAIL!
    const cc = process.env.EMAIL_CC?.split(',').map(e => e.trim()).filter(Boolean)
    const bcc = process.env.EMAIL_BCC?.split(',').map(e => e.trim()).filter(Boolean)

    // Send confirmation to user
    await resend.emails.send({
      from: fromEmail,
      to: email,
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
