import { client } from "./sanity";

// const query = `*[_type == "homePage"][0]{ "homeBanner": modules[_type == "homeBannerModule"][0]{ _key, _type, title, description, authorPrefix, author, buttonLabel, buttonLink, image, } }`;

export async function getDataAllData(query: string) {
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
