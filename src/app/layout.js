import "./global.css";
import { Open_Sans } from "next/font/google";

export const metadata = {
  title: "Survey",
};

const open_sans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: "500",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={open_sans.className + " bg-slate-200"}>{children}</body>
    </html>
  );
}
