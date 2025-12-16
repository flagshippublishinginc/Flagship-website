import type { Metadata } from "next";
import { Source_Sans_3, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components";
import { getSanityData, getTheme } from "@/lib/helpingFunctions";

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

// getting seo meta data from sanity
const homePageQuery = `*[_type == "homePage"][0]{ title, seo { metaTitle, metaDescription } }`;
const homePageData = await getSanityData(homePageQuery);

export const metadata: Metadata = {
  title: homePageData.seo.metaTitle,
  description: homePageData.seo.metaDescription,
};

// getting theme data from sanity
const themeData: any = await getTheme();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSans3.variable} ${playfairDisplay.variable}`}>
      <head>
        {themeData.useGoogleFont && themeData.googleFontUrl && (
          <link rel="stylesheet" href={themeData.googleFontUrl} />
        )}
      </head>
      <body className={` antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
