export const HOTEL_NAME = "Shiva Grand Residency";

export const HOTEL_ADDRESS =
  "54, Old Post Office Rd, Near Collector Office, Gopalapuram, Coimbatore, Tamil Nadu 641018";

export const HOTEL_ADDRESS_PARTS = {
  streetAddress: "54, Old Post Office Rd, Near Collector Office, Gopalapuram",
  addressLocality: "Coimbatore",
  addressRegion: "Tamil Nadu",
  postalCode: "641018",
  addressCountry: "IN",
};

export const HOTEL_GEO = { lat: 11.0046, lng: 76.9659 };

export const HOTEL_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  HOTEL_ADDRESS
)}`;

// Display = human-readable. Tel = E.164 for the `href` of <a href="tel:...">.
export const HOTEL_PHONE_DISPLAY = "+91 90477 57777";
export const HOTEL_PHONE_TEL = "+919047757777";

// Landline (Coimbatore STD 0422), dialed locally with the trunk 0.
export const HOTEL_LANDLINE_DISPLAY = "0422 - 4357777";
export const HOTEL_LANDLINE_TEL = "04224357777";

// Both numbers as a single human-readable string for plain-text contexts.
export const HOTEL_PHONE_DISPLAY_FULL = `${HOTEL_PHONE_DISPLAY} / ${HOTEL_LANDLINE_DISPLAY}`;

export const HOTEL_PRICE_RANGE = "₹1,500–₹2,000";
