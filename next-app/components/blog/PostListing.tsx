"use client";

import { urlForImage } from "@/lib/sanity";
import { Post } from "@/types/blogModules";
import { stegaClean } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const POSTS_PER_PAGE = 6;

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

export default function PostsListing({
  blogId,
  blogName,
}: {
  blogId: string;
  blogName: string;
}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const hasLoadedOnce = useRef(false);

  useEffect(() => {
    if (hasLoadedOnce.current) return;
    hasLoadedOnce.current = true;

    loadMorePosts();
  }, []);

  const loadMorePosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    const res = await fetch(
      `/api/load-more-posts?blogId=${blogId}&start=${offset}&limit=${POSTS_PER_PAGE}`,
    );

    const newPosts: Post[] = await res.json();

    setPosts((prev) => [...prev, ...newPosts]);
    setOffset((prev) => prev + newPosts.length);
    setHasMore(newPosts.length === POSTS_PER_PAGE);
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 border-t border-b md:py-6 border-background-gray">
      <div className="col-span-12 md:col-span-9 space-y-6">
        {posts.map((post, index) => (
          <article
            className={`m-0 py-6 ${index === 0 ? "" : "border-t border-background-gray"}`}
            key={post._id}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10">
              <div className="col-span-12 md:col-span-8 order-1 md:order-0">
                <div className="mb-4 lg:mb-6 flex gap-4 items-center">
                  {post.categories.length > 0 && (
                    <div className="flex gap-2 ">
                      {post.categories.map((category) => {
                        const highlight =
                          stegaClean(category.title) === "Sponsored"
                            ? true
                            : false;
                        return (
                          <span
                            className={`py-2 px-2 md:px-4 text-[12px] ${highlight === true ? "bg-[#4B4B4B] text-white" : "bg-gray-100"}`}
                            key={category._id}>
                            {category.title}
                          </span>
                        );
                      })}
                    </div>
                  )}
                  <div className="border-l border-[#DDD8D1] pl-4 text-[14px]">
                    {formatDate(post!._createdAt)}
                  </div>
                </div>
                <h3 className="font-heading text-primary font-semibold">
                  <Link
                    href={`/explore-maui/${blogName}/${post.slug.current}`}
                    className="text-primary hover:text-tertiary">
                    {stegaClean(post.title)}
                  </Link>
                </h3>
                {post.description && (
                  <p className="mt-4 text-secondary line-clamp-2">
                    {stegaClean(post.description)}
                  </p>
                )}

                {post.author && (
                  <p className=" mt-5 text-[12px] text-gray-light">
                    By {stegaClean(post.author.name)}
                  </p>
                )}
              </div>
              <div className="col-span-12 md:col-span-4 order-0 md:order-1">
                <Link
                  href={`/explore-maui/${blogName}/${post.slug.current}`}
                  className="text-primary">
                  <Image
                    src={urlForImage(post.coverImage)!.url()}
                    alt={stegaClean(post.title)}
                    width={334}
                    height={205}
                    className="w-full h-auto"
                  />
                </Link>
              </div>
            </div>
          </article>
        ))}

        {hasMore && (
          <div className="mt-10 text-center">
            <button
              onClick={loadMorePosts}
              disabled={loading}
              className="px-6 py-2 border rounded">
              {loading ? "Loading..." : "Load more"}
            </button>
          </div>
        )}
      </div>

      <div className="md:col-span-3 col-span-12 border-t md:border-t-0 border-background-gray">
        Right Column
      </div>
    </div>
  );
}
