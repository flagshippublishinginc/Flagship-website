import { cache } from "react";
import { getSanityData } from "@/lib/helpingFunctions";

export const getBlogListingData = cache(async (blogName: string) => {
  const query = `*[_type == "blogListingPage" && slug.current == $blogName][0]{
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
