import { createClient, type SanityClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

import { getFileAsset } from "@sanity/asset-utils";

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-14",
  useCdn: true,
  stega: {
    enabled: process.env.NODE_ENV !== "production",
    studioUrl:
      process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333",
  },
} as const;

export const client: SanityClient = createClient({
  ...config,
  perspective: "published",
});

const imageBuilder = createImageUrlBuilder(client);

export const urlForImage = (source: any) =>
  source ? imageBuilder.image(source).auto("format").fit("max") : null;

export function urlForFile(source: any): string | null {
  if (!source?.asset?._ref) return null;

  try {
    const asset = getFileAsset(source, {
      projectId: config.projectId,
      dataset: config.dataset,
    });
    return asset.url ?? null;
  } catch {
    return null;
  }
}
