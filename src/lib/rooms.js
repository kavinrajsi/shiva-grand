import { sanityClient } from "@/sanity/client";
import { ROOMS_QUERY } from "@/sanity/queries";
import { BOOKING_ROOM_TYPES, HOME_INQUIRY_ROOM_TYPES } from "@/lib/validations";

function priceLabel(price) {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

// Room-type option lists for the booking + home-inquiry dropdowns, derived from
// Sanity rooms. Falls back to the static lists when no rooms are published or
// Sanity is unreachable, so submissions keep validating either way.
export async function getRoomOptions() {
  let rooms = [];
  try {
    rooms = await sanityClient.fetch(ROOMS_QUERY);
  } catch {
    rooms = [];
  }
  if (!rooms || rooms.length === 0) {
    return { booking: BOOKING_ROOM_TYPES, homeInquiry: HOME_INQUIRY_ROOM_TYPES };
  }
  return {
    booking: rooms.map((r) => r.title),
    homeInquiry: rooms.map((r) => `${r.title} (${priceLabel(r.price)})`),
  };
}
