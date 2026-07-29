import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const googleSansFlex = localFont({
  src: "../fonts/GoogleSansFlex-latin.woff2",
  weight: "400 700",
  variable: "--font-gsf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Imagine Computer",
  description: "Your tools, run for you — Imagine Computer POC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${googleSansFlex.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
