"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rate-limit";
import { createServerSupabase } from "@/lib/supabase";
import { validateContact } from "@/lib/validations";
import { HOTEL_ADDRESS, HOTEL_PHONE_DISPLAY_FULL } from "@/lib/address";

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

export async function sendContactMessage(_prevState, formData) {
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown";
  const userAgent = h.get("user-agent") || "";

  const rl = rateLimit(`contact:${ip}`);
  if (!rl.allowed) {
    const seconds = Math.ceil(rl.retryAfterMs / 1000);
    return {
      ok: false,
      error: `Too many submissions. Try again in ${seconds}s.`,
    };
  }

  const { fieldErrors, valid, data } = validateContact({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });
  if (!valid) return { ok: false, fieldErrors };

  try {
    const supabase = createServerSupabase();
    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message,
        ip,
        user_agent: userAgent,
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
    phone: data.phone ? escapeHtml(data.phone) : "—",
    message: escapeHtml(data.message).replace(/\n/g, "<br/>"),
  };

  const adminHtml = `
    <div style="font-family:Manrope,Arial,sans-serif;max-width:560px;margin:auto;color:#191c1b;">
      <h2 style="color:#0d5533;margin:0 0 16px;">New contact form submission</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;color:#404942;width:120px;">Name</td><td style="padding:6px 0;"><strong>${safe.name}</strong></td></tr>
        <tr><td style="padding:6px 0;color:#404942;">Email</td><td style="padding:6px 0;"><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
        <tr><td style="padding:6px 0;color:#404942;">Phone</td><td style="padding:6px 0;">${safe.phone}</td></tr>
        <tr><td style="padding:6px 0;color:#404942;vertical-align:top;">Message</td><td style="padding:6px 0;">${safe.message}</td></tr>
      </table>
    </div>
  `.trim();

  const userHtml = `
    <div style="font-family:Manrope,Arial,sans-serif;max-width:560px;margin:auto;color:#191c1b;">
      <h2 style="color:#0d5533;margin:0 0 16px;">Thanks, ${safe.name} — we got your message.</h2>
      <p style="line-height:1.6;color:#404942;">
        Our team at Shiva Grand Residency will get back to you shortly. Below is a copy of what you sent us for your records.
      </p>
      <div style="background:#f2f4f2;padding:16px;border-radius:12px;font-size:14px;color:#191c1b;white-space:pre-line;">
        ${safe.message}
      </div>
      <p style="line-height:1.6;color:#404942;margin-top:24px;">
        For anything urgent, call us on <strong>${HOTEL_PHONE_DISPLAY_FULL}</strong>.
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
        subject: `New enquiry from ${data.name}`,
        html: adminHtml,
      }),
      resend.emails.send({
        from,
        to: data.email,
        subject: "We've received your message — Shiva Grand Residency",
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
