import { client } from "./sanity";

// const query = `*[_type == "homePage"][0]{ "homeBanner": modules[_type == "homeBannerModule"][0]{ _key, _type, title, description, authorPrefix, author, buttonLabel, buttonLink, image, } }`;

export async function getSanityData(query: string) {
  const data: any = await client.fetch(query);
  return data;
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
