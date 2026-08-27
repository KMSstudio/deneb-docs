// @/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/css/global.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "snu cs&e wiki",
  description: "Wiki for Seoul Nat'l Univ. - Computer Science and Engineering major",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <header className="navbar" />
        <main className="layout">{children}</main>
      </body>
    </html>
  );
}
