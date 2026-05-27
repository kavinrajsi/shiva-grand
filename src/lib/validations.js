const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_ALLOWED_RE = /^[+\d\s\-()]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export const CONTACT_LIMITS = {
  name: 200,
  email: 200,
  phone: 50,
  message: 5000,
};

export const BOOKING_LIMITS = {
  name: 200,
  email: 200,
  phone: 50,
  requests: 2000,
};

export const BOOKING_GUESTS = ["1 Guest", "2 Guests", "3 Guests", "4+ Guests"];
export const BOOKING_ROOM_TYPES = [
  "Standard Double",
  "Deluxe AC",
  "Premium Family",
];

export const HOME_INQUIRY_ROOM_TYPES = [
  "Standard Double (₹1,500)",
  "Deluxe AC (₹1,850)",
  "Family Room (₹2,000)",
];

function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function validatePhone(phone) {
  if (!phone) return null; // optional
  if (phone.length > CONTACT_LIMITS.phone)
    return `Keep it under ${CONTACT_LIMITS.phone} characters.`;
  if (!PHONE_ALLOWED_RE.test(phone))
    return "Use digits, spaces, +, - or () only.";

  const digits = phone.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15)
    return "Enter a valid phone number (7–15 digits).";

  // Indian-style 10-digit (no country code) must start with 6-9.
  if (digits.length === 10 && !/^[6-9]/.test(digits))
    return "Indian mobile numbers must start with 6, 7, 8, or 9.";

  return null;
}

export function validateContact(values) {
  const fieldErrors = {};
  const name = (values.name || "").toString().trim();
  const email = (values.email || "").toString().trim();
  const phone = (values.phone || "").toString().trim();
  const message = (values.message || "").toString().trim();

  if (!name) fieldErrors.name = "Please enter your name.";
  else if (name.length > CONTACT_LIMITS.name)
    fieldErrors.name = `Keep it under ${CONTACT_LIMITS.name} characters.`;

  if (!email) fieldErrors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email))
    fieldErrors.email = "Enter a valid email address.";
  else if (email.length > CONTACT_LIMITS.email)
    fieldErrors.email = `Keep it under ${CONTACT_LIMITS.email} characters.`;

  const phoneError = validatePhone(phone);
  if (phoneError) fieldErrors.phone = phoneError;

  if (!message) fieldErrors.message = "Please write a message.";
  else if (message.length > CONTACT_LIMITS.message)
    fieldErrors.message = `Keep it under ${CONTACT_LIMITS.message} characters.`;

  return {
    fieldErrors,
    valid: Object.keys(fieldErrors).length === 0,
    data: { name, email, phone, message },
  };
}

function validateBookingPhone(phone) {
  if (!phone) return "Please enter your phone number.";
  return validatePhone(phone);
}

export function validateBookingInquiry(values) {
  const fieldErrors = {};
  const name = (values.name || "").toString().trim();
  const email = (values.email || "").toString().trim();
  const phone = (values.phone || "").toString().trim();
  const checkIn = (values.checkIn || "").toString().trim();
  const checkOut = (values.checkOut || "").toString().trim();
  const guests = (values.guests || "").toString().trim();
  const roomType = (values.roomType || "").toString().trim();
  const requests = (values.requests || "").toString().trim();

  if (!name) fieldErrors.name = "Please enter your full name.";
  else if (name.length > BOOKING_LIMITS.name)
    fieldErrors.name = `Keep it under ${BOOKING_LIMITS.name} characters.`;

  if (!email) fieldErrors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email))
    fieldErrors.email = "Enter a valid email address.";
  else if (email.length > BOOKING_LIMITS.email)
    fieldErrors.email = `Keep it under ${BOOKING_LIMITS.email} characters.`;

  const phoneError = validateBookingPhone(phone);
  if (phoneError) fieldErrors.phone = phoneError;

  const today = todayISO();
  if (!checkIn) fieldErrors.checkIn = "Pick a check-in date.";
  else if (!DATE_RE.test(checkIn)) fieldErrors.checkIn = "Invalid date.";
  else if (checkIn < today)
    fieldErrors.checkIn = "Check-in cannot be in the past.";

  if (!checkOut) fieldErrors.checkOut = "Pick a check-out date.";
  else if (!DATE_RE.test(checkOut)) fieldErrors.checkOut = "Invalid date.";
  else if (checkIn && DATE_RE.test(checkIn) && checkOut <= checkIn)
    fieldErrors.checkOut = "Check-out must be after check-in.";

  if (!guests) fieldErrors.guests = "Select the number of guests.";
  else if (!BOOKING_GUESTS.includes(guests))
    fieldErrors.guests = "Pick a valid option.";

  if (!roomType) fieldErrors.roomType = "Select a room type.";
  else if (!BOOKING_ROOM_TYPES.includes(roomType))
    fieldErrors.roomType = "Pick a valid room type.";

  if (requests && requests.length > BOOKING_LIMITS.requests)
    fieldErrors.requests = `Keep it under ${BOOKING_LIMITS.requests} characters.`;

  return {
    fieldErrors,
    valid: Object.keys(fieldErrors).length === 0,
    data: {
      name,
      email,
      phone,
      checkIn,
      checkOut,
      guests,
      roomType,
      requests,
    },
  };
}

export function validateHomeInquiry(values) {
  const fieldErrors = {};
  const name = (values.name || "").toString().trim();
  const email = (values.email || "").toString().trim();
  const phone = (values.phone || "").toString().trim();
  const checkIn = (values.checkIn || "").toString().trim();
  const checkOut = (values.checkOut || "").toString().trim();
  const roomType = (values.roomType || "").toString().trim();
  const notes = (values.notes || "").toString().trim();

  if (!name) fieldErrors.name = "Please enter your name.";
  else if (name.length > BOOKING_LIMITS.name)
    fieldErrors.name = `Keep it under ${BOOKING_LIMITS.name} characters.`;

  if (!email) fieldErrors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email))
    fieldErrors.email = "Enter a valid email address.";
  else if (email.length > BOOKING_LIMITS.email)
    fieldErrors.email = `Keep it under ${BOOKING_LIMITS.email} characters.`;

  const phoneError = validateBookingPhone(phone);
  if (phoneError) fieldErrors.phone = phoneError;

  const today = todayISO();
  if (!checkIn) fieldErrors.checkIn = "Pick a check-in date.";
  else if (!DATE_RE.test(checkIn)) fieldErrors.checkIn = "Invalid date.";
  else if (checkIn < today)
    fieldErrors.checkIn = "Check-in cannot be in the past.";

  if (!checkOut) fieldErrors.checkOut = "Pick a check-out date.";
  else if (!DATE_RE.test(checkOut)) fieldErrors.checkOut = "Invalid date.";
  else if (checkIn && DATE_RE.test(checkIn) && checkOut <= checkIn)
    fieldErrors.checkOut = "Check-out must be after check-in.";

  if (!roomType) fieldErrors.roomType = "Pick a room type.";
  else if (!HOME_INQUIRY_ROOM_TYPES.includes(roomType))
    fieldErrors.roomType = "Pick a valid room type.";

  if (notes && notes.length > BOOKING_LIMITS.requests)
    fieldErrors.notes = `Keep it under ${BOOKING_LIMITS.requests} characters.`;

  return {
    fieldErrors,
    valid: Object.keys(fieldErrors).length === 0,
    data: { name, email, phone, checkIn, checkOut, roomType, notes },
  };
}
