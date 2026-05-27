"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rate-limit";
import { createServerSupabase } from "@/lib/supabase";
import { validateHomeInquiry } from "@/lib/validations";
import { HOTEL_ADDRESS, HOTEL_PHONE_DISPLAY } from "@/lib/address";

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
    email: formData.get("email"),
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
      email: data.email,
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
    email: escapeHtml(data.email),
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
        <tr><td style="padding:6px 0;color:#404942;">Email</td><td style="padding:6px 0;"><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
        <tr><td style="padding:6px 0;color:#404942;">Phone</td><td style="padding:6px 0;"><a href="tel:${safe.phone}">${safe.phone}</a></td></tr>
        <tr><td style="padding:6px 0;color:#404942;">Check-in</td><td style="padding:6px 0;"><strong>${safe.checkIn}</strong></td></tr>
        <tr><td style="padding:6px 0;color:#404942;">Check-out</td><td style="padding:6px 0;"><strong>${safe.checkOut}</strong></td></tr>
        <tr><td style="padding:6px 0;color:#404942;">Stay type</td><td style="padding:6px 0;">${safe.roomType}</td></tr>
        <tr><td style="padding:6px 0;color:#404942;vertical-align:top;">Notes</td><td style="padding:6px 0;">${safe.notes}</td></tr>
      </table>
    </div>
  `.trim();

  const userHtml = `
    <div style="font-family:Manrope,Arial,sans-serif;max-width:560px;margin:auto;color:#191c1b;">
      <h2 style="color:#0d5533;margin:0 0 16px;">Thanks, ${safe.name} — we got your booking inquiry.</h2>
      <p style="line-height:1.6;color:#404942;">
        Your reservation is <strong>not yet confirmed</strong>. Our team will call you within 30 minutes to verify availability and finalize the details.
      </p>
      <div style="background:#f2f4f2;padding:16px;border-radius:12px;font-size:14px;color:#191c1b;">
        <p style="margin:0 0 6px;color:#707971;text-transform:uppercase;letter-spacing:0.08em;font-size:11px;">Your request</p>
        <p style="margin:4px 0;"><strong>Check-in:</strong> ${safe.checkIn}</p>
        <p style="margin:4px 0;"><strong>Check-out:</strong> ${safe.checkOut}</p>
        <p style="margin:4px 0;"><strong>Stay type:</strong> ${safe.roomType}</p>
      </div>
      <p style="line-height:1.6;color:#404942;margin-top:24px;">
        For anything urgent, call us on <strong>${HOTEL_PHONE_DISPLAY}</strong>.
      </p>
      <p style="color:#707971;font-size:12px;margin-top:32px;">
        Shiva Grand Residency · ${HOTEL_ADDRESS}
      </p>
    </div>
  `.trim();

  try {
    const [adminResult, userResult] = await Promise.all([
      resend.emails.send({
        from,
        to: adminTo,
        cc,
        bcc,
        replyTo: data.email,
        subject: `New home-page inquiry — ${data.name} (${data.checkIn} → ${data.checkOut})`,
        html: adminHtml,
      }),
      resend.emails.send({
        from,
        to: data.email,
        subject: "Your booking inquiry is being processed — Shiva Grand",
        html: userHtml,
      }),
    ]);

    if (adminResult.error || userResult.error) {
      console.error("Resend send error:", {
        admin: JSON.stringify(adminResult.error),
        user: JSON.stringify(userResult.error),
      });
      return { ok: false, error: "Could not send email. Please try again." };
    }

    return { ok: true };
  } catch (err) {
    console.error("Send error:", err);
    return { ok: false, error: "Could not send email. Please try again." };
  }
}
