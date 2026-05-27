"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rate-limit";
import { createServerSupabase } from "@/lib/supabase";
import { validateHomeInquiry } from "@/lib/validations";

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function splitList(value) {
  if (!value) return undefined;
  const parts = value.split(",").map((s) => s.trim()).filter(Boolean);
  return parts.length > 0 ? parts : undefined;
}

function formatDate(iso) {
  if (!iso) return iso;
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export async function sendHomeInquiry(_prevState, formData) {
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown";

  const rl = rateLimit(`home:${ip}`);
  if (!rl.allowed) {
    const seconds = Math.ceil(rl.retryAfterMs / 1000);
    return {
      ok: false,
      error: `Too many submissions. Try again in ${seconds}s.`,
    };
  }

  const { fieldErrors, valid, data } = validateHomeInquiry({
    name: formData.get("name"),
    phone: formData.get("phone"),
    checkIn: formData.get("checkIn"),
    checkOut: formData.get("checkOut"),
    roomType: formData.get("roomType"),
    notes: formData.get("notes"),
  });
  if (!valid) return { ok: false, fieldErrors };

  try {
    const supabase = createServerSupabase();
    const { error: dbError } = await supabase.from("booking_inquiries").insert({
      name: data.name,
      phone: data.phone,
      email: null,
      check_in: data.checkIn,
      check_out: data.checkOut,
      guests: null,
      room_type: data.roomType,
      notes: data.notes || null,
      source: "home",
    });
    if (dbError) console.error("Supabase insert failed:", dbError.message);
  } catch (err) {
    console.error("Supabase error:", err);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const adminTo = process.env.ADMIN_EMAIL;

  if (!apiKey || !from || !adminTo) {
    console.error("Email config missing");
    return { ok: false, error: "Email is not configured on the server." };
  }

  const resend = new Resend(apiKey);
  const cc = splitList(process.env.EMAIL_CC);
  const bcc = splitList(process.env.EMAIL_BCC);

  const safe = {
    name: escapeHtml(data.name),
    phone: escapeHtml(data.phone),
    checkIn: escapeHtml(formatDate(data.checkIn)),
    checkOut: escapeHtml(formatDate(data.checkOut)),
    roomType: escapeHtml(data.roomType),
    notes: data.notes
      ? escapeHtml(data.notes).replace(/\n/g, "<br/>")
      : "—",
  };

  const adminHtml = `
    <div style="font-family:Manrope,Arial,sans-serif;max-width:560px;margin:auto;color:#191c1b;">
      <h2 style="color:#0d5533;margin:0 0 16px;">New home-page booking inquiry</h2>
      <p style="color:#707971;font-size:12px;margin:0 0 16px;">Source: home</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;color:#404942;width:140px;">Guest</td><td style="padding:6px 0;"><strong>${safe.name}</strong></td></tr>
        <tr><td style="padding:6px 0;color:#404942;">Phone</td><td style="padding:6px 0;"><a href="tel:${safe.phone}">${safe.phone}</a></td></tr>
        <tr><td style="padding:6px 0;color:#404942;">Check-in</td><td style="padding:6px 0;"><strong>${safe.checkIn}</strong></td></tr>
        <tr><td style="padding:6px 0;color:#404942;">Check-out</td><td style="padding:6px 0;"><strong>${safe.checkOut}</strong></td></tr>
        <tr><td style="padding:6px 0;color:#404942;">Stay type</td><td style="padding:6px 0;">${safe.roomType}</td></tr>
        <tr><td style="padding:6px 0;color:#404942;vertical-align:top;">Notes</td><td style="padding:6px 0;">${safe.notes}</td></tr>
      </table>
      <p style="color:#404942;font-size:13px;margin-top:24px;">
        No email was collected on this form. Reach the guest via the phone number above.
      </p>
    </div>
  `.trim();

  try {
    const { error: adminError } = await resend.emails.send({
      from,
      to: adminTo,
      cc,
      bcc,
      subject: `New home-page inquiry — ${data.name} (${data.checkIn} → ${data.checkOut})`,
      html: adminHtml,
    });

    if (adminError) {
      console.error("Resend send error:", JSON.stringify(adminError));
      return { ok: false, error: "Could not send email. Please try again." };
    }

    return { ok: true };
  } catch (err) {
    console.error("Send error:", err);
    return { ok: false, error: "Could not send email. Please try again." };
  }
}
