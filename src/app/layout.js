import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import {
  hotelSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/schema";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const materialSymbols = localFont({
  src: "../../node_modules/material-symbols/material-symbols-outlined.woff2",
  variable: "--font-material-symbols",
  display: "block",
  weight: "100 700",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shivagrand.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Shiva Grand Residency — Hotel in Coimbatore",
    template: "%s — Shiva Grand Residency",
  },
  description:
    "A clean, comfortable hotel in the heart of Coimbatore. 5 minutes from the railway station, walking distance to the Collectorate, with rooms from ₹1,500.",
  keywords: [
    "Shiva Grand Residency",
    "hotel Coimbatore",
    "Coimbatore railway station hotel",
    "budget hotel Coimbatore",
    "Gopalapuram hotel",
    "rooms in Coimbatore",
  ],
  applicationName: "Shiva Grand Residency",
  authors: [{ name: "Shiva Grand Residency" }],
  creator: "Shiva Grand Residency",
  publisher: "Shiva Grand Residency",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Shiva Grand Residency",
    title: "Shiva Grand Residency — Hotel in Coimbatore",
    description:
      "A clean, comfortable hotel in the heart of Coimbatore. 5 minutes from the railway station, walking distance to the Collectorate, with rooms from ₹1,500.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shiva Grand Residency — Hotel in Coimbatore",
    description:
      "A clean, comfortable hotel in the heart of Coimbatore. Rooms from ₹1,500.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${materialSymbols.variable} scroll-smooth`}
    >
      <body
        className="bg-surface font-body text-on-surface"
        data-mode="connect"
      >
        <JsonLd data={[organizationSchema(), websiteSchema(), hotelSchema()]} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
