import { createImageUrlBuilder } from "@sanity/image-url";
import { createClient } from "next-sanity";
import { draftMode } from "next/headers";

const mode = process.env.NEXT_PUBLIC_SANITY_MODE || 'production';
const isPreview = mode === 'preview';

console.log('Using Sanity Config:', {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  mode,
  isPreview
});

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-12-10",
  useCdn: !isPreview, // Disable CDN in preview to see latest changes
  perspective: isPreview ? 'previewDrafts' : 'published',
  token: isPreview ? process.env.NEXT_PUBLIC_SANITY_TOKEN : undefined,
  ignoreBrowserTokenWarning: true,
  stega: {
    enabled: true,
    studioUrl: 'http://localhost:3333',
  }
});

const builder = createImageUrlBuilder(client);


export const urlFor = (source: any) => builder.image(source);

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string
  params?: any
  tags?: string[]
}) {
  const isDraftMode = (await draftMode()).isEnabled
  if (isDraftMode && !process.env.NEXT_PUBLIC_SANITY_TOKEN) {
    throw new Error('Missing NEXT_PUBLIC_SANITY_TOKEN')
  }

  const perspective = isDraftMode ? 'previewDrafts' : 'published'

  return client.fetch<QueryResponse>(query, params, {
    token: isDraftMode ? process.env.NEXT_PUBLIC_SANITY_TOKEN : undefined,
    perspective,
    useCdn: !isDraftMode,
    next: {
      revalidate: isDraftMode ? 0 : 60,
      tags,
    },
  })
}
