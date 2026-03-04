import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aadugaadu — AI, Full Stack, Flutter & OTT Development",
  description:
    "Aadugaadu is a software development company specializing in AI, Full Stack, Flutter, Android, and OTT platform development.",
  keywords: ["AI development", "Full Stack", "Flutter", "OTT Platform", "Android", "Software Company India"],
  authors: [{ name: "Aadugaadu" }],
  openGraph: {
    title: "Aadugaadu — Engineering the Future of Digital Products",
    description: "We build intelligent, scalable digital products from idea to launch.",
    url: "https://aadugaadu.com",
    siteName: "Aadugaadu",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
