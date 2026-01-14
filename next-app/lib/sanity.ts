import { createClient, type SanityClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { getFileAsset } from "@sanity/asset-utils";
import { draftMode } from "next/headers";

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

const imageBuilder = imageUrlBuilder(client);

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

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: Record<string, any>;
  tags?: string[];
}): Promise<QueryResponse> {
  const draft = await draftMode();
  const isDraftMode = draft.isEnabled;

  if (isDraftMode && !process.env.SANITY_READ_TOKEN) {
    throw new Error(
      "Missing SANITY_READ_TOKEN environment variable for draft mode"
    );
  }

  return client.fetch<QueryResponse>(query, params, {
    token: isDraftMode ? process.env.SANITY_READ_TOKEN : undefined,
    perspective: isDraftMode ? "previewDrafts" : "published",
    useCdn: !isDraftMode,
    next: {
      revalidate: isDraftMode ? 0 : 30,
      tags,
    },
  });
}

export type SanityFetch = typeof sanityFetch;
