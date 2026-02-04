import { cache } from "react";
import { getSanityData } from "@/lib/helpingFunctions";
import { headers } from "next/headers";

export const getBlogListingData = cache(async (blogName: string) => {
  const headerList = await headers();
  const host = headerList.get("host");

  const query = `*[_type == "blogListingPage" && slug.current == $blogName && references(*[_type == "site" && domain == "http://${host}"]._id)][0]{
    _id,
    title,
    titleHighlight,
    description,
    seo {
      metaTitle,
      metaDescription
    },
    modules[]
  }`;

  return getSanityData(query, { blogName });
});
