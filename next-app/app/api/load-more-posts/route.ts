import { client } from "@/lib/sanity";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const blogId = searchParams.get("blogId");
  const start = Number(searchParams.get("start") || 0);
  const limit = Number(searchParams.get("limit") || 6);

  if (!blogId) {
    return NextResponse.json([], { status: 400 });
  }

  const query = `
    *[
      _type == "post" &&
      selectBlog._ref == $blogId
    ]
    | order(_createdAt desc)
    [$start...$end]{
      _id,
      title,
      slug,
      coverImage,
      _createdAt,
      description,
      author->{
        _id,
        name,
        image
      },
      categories[]->{
        _id,
        title,
        slug
      }
    }
  `;

  const posts = await client.fetch(query, {
    blogId,
    start,
    end: start + limit,
  });

  return NextResponse.json(posts);
}
