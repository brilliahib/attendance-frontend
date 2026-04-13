import localFont from "next/font/local";

export const haskoy = localFont({
  src: "../assets/fonts/haskoy.woff2",
  variable: "--font-haskoy",
  display: "swap",
  weight: "100 900",
  style: "normal",
  preload: true,
});
