import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./lib/providers";
import AppbarClient from "../components/AppbarClient";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "PayMate - Digital Payments Made Simple",
  description: "Secure, fast, and reliable digital payments platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <Providers>
        <body
          className={`${geistSans.variable} ${geistMono.variable} gradient-bg`}
        >
          <AppbarClient></AppbarClient>
          {children}
        </body>
      </Providers>
    </html>
  );
}
