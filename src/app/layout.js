import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

export const metadata = {
  title: "Shiva Grand",
  description: "A Comfortable Stay, Every Time",
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
