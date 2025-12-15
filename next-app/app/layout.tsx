import type { Metadata } from "next";
import { Source_Sans_3, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components";
import { getSanityData } from "@/lib/helpingFunctions";

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

const homePageQuery = `*[_type == "homePage"][0]{ title, seo { metaTitle, metaDescription } }`;
const homePageData = await getSanityData(homePageQuery);

export const metadata: Metadata = {
  title: homePageData.seo.metaTitle,
  description: homePageData.seo.metaDescription,
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
