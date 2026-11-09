import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { portfolioContent } from "../lib/portfolio-content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${portfolioContent.profile.name} | Portfolio`,
  description: portfolioContent.profile.bio,
  icons: {
    icon: "/favicon-32x32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geistSans.variable}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        {children}
      </body>
    </html>
  );
}
