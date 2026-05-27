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

export const HOTEL_PRICE_RANGE = "₹1,500–₹2,000";
