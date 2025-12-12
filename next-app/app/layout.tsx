import type { Metadata } from "next";
import { Source_Sans_3, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components";

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAUI Magazine",
  description:
    "As stunning southern Colorado scenery passes by, a handful of men learns to operate a live steam engine on the Cumbres & Toltec Scenic Railway",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSans3.variable} ${playfairDisplay.variable}`}>
      <body className={` antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
