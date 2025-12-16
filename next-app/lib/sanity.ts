import { createImageUrlBuilder } from "@sanity/image-url";
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: "production",
  apiVersion: "2025-12-10",
  useCdn: false,
  // perspective: "published",
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
