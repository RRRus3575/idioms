import localFont from "next/font/local";
import "./globals.css";

const openSans = localFont({
  src: [
    { path: "./fonts/OpenSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/OpenSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/OpenSans-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/OpenSans-Italic.ttf", weight: "400", style: "italic" },
  ],
  variable: "--font-open-sans",
  display: "swap",
});

const openSansCondensed = localFont({
  src: [
    { path: "./fonts/OpenSans_Condensed-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/OpenSans_Condensed-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--font-open-sans-condensed",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="uk" className={`${openSans.variable} ${openSansCondensed.variable}`}>
      <body>{children}</body>
    </html>
  );
}
