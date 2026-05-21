const baseStyle = `font-family: 'Helvetica Neue', Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 24px;`
const card = `max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);`
const header = `background: #2C6E49; padding: 36px 32px; text-align: center;`
const body = `padding: 36px 32px;`
const footer = `background: #f9fafb; padding: 24px 32px; border-top: 1px solid #e5e7eb; text-align: center;`
const table = `width: 100%; border-collapse: collapse; margin: 24px 0;`
const tdLabel = `padding: 10px 14px; background: #f0faf5; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #2C6E49; letter-spacing: 0.05em; border: 1px solid #d1fae5; width: 140px;`
const tdValue = `padding: 10px 14px; font-size: 14px; color: #374151; border: 1px solid #e5e7eb;`

function row(label: string, value: string) {
  return `<tr><td style="${tdLabel}">${label}</td><td style="${tdValue}">${value || '—'}</td></tr>`
}

export function bookingUserEmail({
  name, checkIn, checkOut, roomType, guests, email,
}: {
  name: string; checkIn: string; checkOut: string; roomType: string; guests?: string; email?: string;
}) {
  return `<!DOCTYPE html><html><body style="${baseStyle}">
  <div style="${card}">
    <div style="${header}">
      <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:700;">Shiva Grand Residency</h1>
      <p style="color:rgba(255,255,255,0.75);margin:6px 0 0;font-size:13px;">Coimbatore, Tamil Nadu</p>
    </div>
    <div style="${body}">
      <h2 style="color:#2C6E49;margin-top:0;font-size:20px;">Booking Inquiry Received!</h2>
      <p style="color:#374151;font-size:15px;">Dear <strong>${name}</strong>,</p>
      <p style="color:#6b7280;font-size:14px;line-height:1.6;">Thank you for your interest in staying with us. Our team will contact you within <strong style="color:#2C6E49;">30 minutes</strong> to confirm your reservation.</p>
      <table style="${table}">
        ${row('Room Type', roomType)}
        ${row('Check-in', checkIn)}
        ${row('Check-out', checkOut)}
        ${guests ? row('Guests', guests) : ''}
        ${email ? row('Email', email) : ''}
      </table>
      <p style="color:#6b7280;font-size:13px;">If you have any urgent queries, call us directly at <strong>090477 57777</strong>.</p>
    </div>
    <div style="${footer}">
      <p style="color:#9ca3af;font-size:12px;margin:0;">54, Old Post Office Rd, Near Collector Office, Gopalapuram, Coimbatore, Tamil Nadu 641018</p>
      <p style="color:#9ca3af;font-size:12px;margin:6px 0 0;">Phone: 090477 57777</p>
    </div>
  </div>
</body></html>`
}

export function bookingAdminEmail({
  name, phone, email, checkIn, checkOut, roomType, guests, notes, source,
}: {
  name: string; phone: string; email?: string; checkIn: string; checkOut: string;
  roomType: string; guests?: string; notes?: string; source?: string;
}) {
  return `<!DOCTYPE html><html><body style="${baseStyle}">
  <div style="${card}">
    <div style="${header}">
      <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:700;">New Booking Inquiry</h1>
      <p style="color:rgba(255,255,255,0.75);margin:6px 0 0;font-size:13px;">Via ${source === 'rooms' ? 'Rooms Page' : 'Home Page'}</p>
    </div>
    <div style="${body}">
      <h2 style="color:#2C6E49;margin-top:0;font-size:18px;">Guest Details</h2>
      <table style="${table}">
        ${row('Name', name)}
        ${row('Phone', phone)}
        ${email ? row('Email', email) : ''}
        ${row('Room Type', roomType)}
        ${row('Check-in', checkIn)}
        ${row('Check-out', checkOut)}
        ${guests ? row('Guests', guests) : ''}
        ${notes ? row('Notes', notes) : ''}
        ${row('Submitted', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }))}
      </table>
    </div>
    <div style="${footer}">
      <p style="color:#9ca3af;font-size:12px;margin:0;">Shiva Grand Residency — Admin Notification</p>
    </div>
  </div>
</body></html>`
}

export function contactUserEmail({ name, message }: { name: string; message: string }) {
  return `<!DOCTYPE html><html><body style="${baseStyle}">
  <div style="${card}">
    <div style="${header}">
      <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:700;">Shiva Grand Residency</h1>
      <p style="color:rgba(255,255,255,0.75);margin:6px 0 0;font-size:13px;">Coimbatore, Tamil Nadu</p>
    </div>
    <div style="${body}">
      <h2 style="color:#2C6E49;margin-top:0;font-size:20px;">We Got Your Message!</h2>
      <p style="color:#374151;font-size:15px;">Dear <strong>${name}</strong>,</p>
      <p style="color:#6b7280;font-size:14px;line-height:1.6;">Thank you for reaching out. We've received your message and will respond within <strong style="color:#2C6E49;">24 hours</strong>.</p>
      <div style="background:#f0faf5;border-left:4px solid #2C6E49;padding:16px 20px;border-radius:4px;margin:24px 0;">
        <p style="color:#374151;font-size:13px;margin:0;font-style:italic;">"${message}"</p>
      </div>
      <p style="color:#6b7280;font-size:13px;">Need immediate help? Call us at <strong>090477 57777</strong>.</p>
    </div>
    <div style="${footer}">
      <p style="color:#9ca3af;font-size:12px;margin:0;">54, Old Post Office Rd, Near Collector Office, Gopalapuram, Coimbatore, Tamil Nadu 641018</p>
      <p style="color:#9ca3af;font-size:12px;margin:6px 0 0;">Phone: 090477 57777</p>
    </div>
  </div>
</body></html>`
}

export function contactAdminEmail({
  name, email, phone, message,
}: {
  name: string; email: string; phone: string; message: string;
}) {
  return `<!DOCTYPE html><html><body style="${baseStyle}">
  <div style="${card}">
    <div style="${header}">
      <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:700;">New Contact Form Submission</h1>
    </div>
    <div style="${body}">
      <table style="${table}">
        ${row('Name', name)}
        ${row('Email', email)}
        ${row('Phone', phone)}
        ${row('Message', message)}
        ${row('Submitted', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }))}
      </table>
    </div>
    <div style="${footer}">
      <p style="color:#9ca3af;font-size:12px;margin:0;">Shiva Grand Residency — Admin Notification</p>
    </div>
  </div>
</body></html>`
}
