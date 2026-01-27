import { client } from "@/lib/sanity";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const blogId = searchParams.get("blogId");
  const start = Number(searchParams.get("start")) || 0;
  const end = start + Number(searchParams.get("limit")) || 0;

  const query = ` *[
    _type == "post" &&
    selectBlog._ref == $blogId
  ]
  | order(_createdAt desc)
  [$start...$end]{
    _id,
    title,
    slug,
    coverImage,
    description,
    _createdAt
  }`;

  const posts = await client.fetch(query, { blogId, start, end });

  return NextResponse.json(posts);
}
