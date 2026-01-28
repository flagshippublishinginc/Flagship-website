import { PostListing } from "@/components";
import { getSanityData } from "@/lib/helpingFunctions";
import { notFound } from "next/navigation";

type Params = {
  blogSlug: string;
};

export default async function BlogPage({ params }: { params: Params }) {
  const { blogSlug } = await params;
  console.log("blogSlug ", blogSlug);
  const blogQuery = `*[_type == "blogListingPage" && slug.current == "${blogSlug}"][0]{_id,title, titleHighlight, description, seo{metaTitle, metaDescription}}`;
  const blogData = await getSanityData(blogQuery);
  console.log("blogData ", blogData);

  if (!blogData) {
    return notFound();
  }
  return (
    <main>
      <section className="blog-banner-wrapper">
        <div className="container">
          <h1 className="text-center">
            {blogData.title}{" "}
            {blogData.titleHighlight && (
              <span className="text-tertiary">{blogData.titleHighlight}</span>
            )}
          </h1>
          {blogData.description && (
            <p className="text-center mt-6 lg:mt-10">{blogData.description}</p>
          )}
        </div>
      </section>
      <section className="section-spacing">
        <div className="container">
          <div className="title-section">
            <h2>
              {blogData.title}{" "}
              {blogData.titleHighlight && (
                <span className="text-tertiary">{blogData.titleHighlight}</span>
              )}
            </h2>
          </div>
          <div className="content-section pt-3">
            <PostListing blogId={blogData._id} blogSlug={blogSlug} />
          </div>
        </div>
      </section>
    </main>
  );
}
