import { draftMode } from "next/headers";
import { client } from "./sanity";

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: any;
  tags?: string[];
}) {
  const isDraftMode = (await draftMode()).isEnabled;
  if (isDraftMode && !process.env.NEXT_PUBLIC_SANITY_TOKEN) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_TOKEN");
  }

  const perspective = isDraftMode ? "previewDrafts" : "published";

  return client.fetch<QueryResponse>(query, params, {
    token: isDraftMode ? process.env.NEXT_PUBLIC_SANITY_TOKEN : undefined,
    perspective,
    useCdn: !isDraftMode,
    next: {
      revalidate: isDraftMode ? 0 : 60,
      tags,
    },
  });
}
