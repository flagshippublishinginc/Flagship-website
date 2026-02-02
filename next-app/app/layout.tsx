import type { Metadata } from "next";
import { Source_Sans_3, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Footer, Header, EnvironmentBadge } from "@/components";
import { getSanityData } from "@/lib/helpingFunctions";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { stegaClean } from "@sanity/client/stega";
import { urlForImage } from "@/lib/sanity";

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
export async function generateMetadata(): Promise<Metadata> {
  const homePageQuery = `*[_type == "homePage"][0]{ title, seo { metaTitle, metaDescription } }`;
  const favIconQuery = `*[_type == "settings"][0]{favicon}`;

  const [homePageData, favIconData] = await Promise.all([
    getSanityData(homePageQuery),
    getSanityData(favIconQuery),
  ]);

  return {
    title: homePageData?.seo?.metaTitle || "Flagship",
    description: homePageData?.seo?.metaDescription || "",
    icons: {
      icon: urlForImage(favIconData?.favicon)?.url() || "",
    },
    openGraph: {
      title: homePageData?.seo?.metaTitle || "Flagship",
      description: homePageData?.seo?.metaDescription || "",
    },
    twitter: {
      title: homePageData?.seo?.metaTitle || "Flagship",
      description: homePageData?.seo?.metaDescription || "",
    },
  };
}

// getting header data from sanity
const headerQuery = `*[_type == "settings"][0]{
  header {
    logo,
    navLinks[]{
      label,
      link {
        type,
        external,
        internal->{ 
          "slug": slug.current, 
          _type 
        }
      },
      icon,
      image,
      children[]{
        label,
        link {
          type,
          external,
          internal->{ 
            "slug": slug.current, 
            _type 
          }
        },
        icon,
        image
      }
    }
  }
}`;

const footerQuery = `*[_type == "settings"][0]{footer}`;

const themeSettingQuery = `*[_type == "themeSettings" && title == "MAUI NŌ KA ʻOI Theme"][0]`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetching data inside the component to ensure it's dynamic
  const [headerData, themeSettingData, footerData] = await Promise.all([
    getSanityData(headerQuery),
    getSanityData(themeSettingQuery),
    getSanityData(footerQuery),
  ]);

  console.log("themeSettingData ", themeSettingData);

  return (
    <html
      lang="en"
      className={`${sourceSans3.variable} ${playfairDisplay.variable}`}>
      <head>
        <style>
          {`
            :root {
              --background: #ffffff;
              --foreground: ${stegaClean(themeSettingData?.textSection?.primaryColor) || "#1a1a1a"};
              --color-primary: ${stegaClean(themeSettingData?.textSection?.primaryColor) || "#1a1a1a"};
              --color-secondary: ${stegaClean(themeSettingData?.textSection?.secondaryColor) || "#4b4b4b"};
              --color-tertiary: ${stegaClean(themeSettingData?.accentSection?.primaryAccentColor) || "#c63c22"};
              --color-accent: ${stegaClean(themeSettingData?.accentSection?.hoverAccentColor) || "#8b2a17"};
              --color-background-gray: ${stegaClean(themeSettingData?.backgroundSection?.midColor) || "#ddd8d1"};
              --color-background-category: ${stegaClean(themeSettingData?.backgroundSection?.lightColor) || "#fbfaf9"};
              --color-gray: ${stegaClean(themeSettingData?.borderColor) || "#ddd8d1"};
              --font-body: ${stegaClean(themeSettingData?.bodyFont) || "var(--font-source-sans-3)"};
              --font-heading: ${stegaClean(themeSettingData?.headingFont) || "var(--font-playfair-display)"};
            }
          `}
        </style>
        {themeSettingData?.headingFont && themeSettingData?.headingFontUrl && (
          <link rel="stylesheet" href={themeSettingData.headingFontUrl} />
        )}
        {themeSettingData?.bodyFont && themeSettingData?.bodyFontUrl && (
          <link rel="stylesheet" href={themeSettingData.bodyFontUrl} />
        )}
      </head>
      <body className={` antialiased`}>
        {(await draftMode()).isEnabled && <VisualEditing />}
        <EnvironmentBadge />
        <Header data={headerData?.header} />
        {children}
        <Footer data={footerData?.footer} />
      </body>
    </html>
  );
}
