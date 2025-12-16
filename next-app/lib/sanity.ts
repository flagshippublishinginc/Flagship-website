import { createImageUrlBuilder } from "@sanity/image-url";
import { createClient } from "next-sanity";

const mode = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const isPreview = mode === "preview";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-12-10",
  useCdn: !isPreview, // Disable CDN in preview to see latest changes
  perspective: isPreview ? "previewDrafts" : "published",
  token: isPreview ? process.env.NEXT_PUBLIC_SANITY_TOKEN : undefined,
  ignoreBrowserTokenWarning: true,
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
