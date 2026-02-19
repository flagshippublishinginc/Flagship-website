import slugify from "slugify";
import { sanityFetch } from "./fetch";

// const query = `*[_type == "homePage"][0]{ "homeBanner": modules[_type == "homeBannerModule"][0]{ _key, _type, title, description, authorPrefix, author, buttonLabel, buttonLink, image, } }`;

export async function getSanityData(
  query: string,
  params?: Record<string, any>,
) {
  const data: any = await sanityFetch({ query, params });
  return data;
}

export function formatDateLong(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

export function formatPublishDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export async function getTheme() {
  const themeQuery = `*[_type == "themeSettings"][0]`;
  const themeData = await getSanityData(themeQuery);
  return themeData;
}

export async function getThemeSetting(query: string) {
  const themeSettingData = await getSanityData(query);
  return themeSettingData;
}

export function generateToc(content: any[]) {
  return content
    .filter((block) => block._type === "block" && ["h2"].includes(block.style))
    .map((block) => {
      const text = block.children.map((child: any) => child.text).join("");

      return {
        id: slugify(text, { lower: true, strict: true }),
        text,
        level: block.style === "h2" ? 2 : 3,
      };
    });
}
