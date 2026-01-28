"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const POSTS_PER_PAGE = 6;

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage: any;
};

export default function PostsListing({
  blogId,
  blogSlug,
}: {
  blogId: string;
  blogSlug: string;
}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadMorePosts();
  }, []);

  const loadMorePosts = async () => {
    if (loading) return;

    setLoading(true);

    const res = await fetch(
      `/api/load-more-posts?blogId=${blogId}&start=${posts.length}&limit=${POSTS_PER_PAGE}`,
    );

    const newPosts: Post[] = await res.json();

    console.log("newPosts ", newPosts);

    setPosts((prev) => [...prev, ...newPosts]);
    setHasMore(newPosts.length === POSTS_PER_PAGE);
    setLoading(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 border-t border-b border-gray pt-6">
        <div className="col-span-8 space-y-6">
          {posts.map((post, index) => (
            <article key={index}>
              <Link href={`/${blogSlug}/${post.slug.current}`}>
                <h3>{post.title}</h3>
              </Link>
            </article>
          ))}
        </div>

        <div className="col-span-4">Right Column</div>
      </div>

      {hasMore && (
        <div className="mt-10 text-center">
          <button onClick={loadMorePosts} disabled={loading}>
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </>
  );
}
