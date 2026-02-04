import { CTABanner, PostListing } from "@/components";
import { getBlogListingData } from "@/lib/blogListingFunc";
import { Metadata } from "next";

type Params = {
  blogName: string;
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { blogName } = await params;
  const data = await getBlogListingData(blogName);

  const seo = data?.seo;

  return {
    title: seo?.metaTitle || data?.title || "Blog",
    description: seo?.metaDescription || data?.description || "",
    openGraph: {
      title: seo?.metaTitle,
      description: seo?.metaDescription,
    },
    twitter: {
      title: seo?.metaTitle,
      description: seo?.metaDescription,
    },
  };
}

export default async function BlogPage({ params }: { params: Params }) {
  const { blogName } = await params;
  const blogData: any = await getBlogListingData(blogName);
  return (
    <main>
      <section className="blog-banner-wrapper">
        <div className="container">
          <div className="max-w-[555px] mx-auto">
            {blogData?.title && (
              <h1 className="text-center">
                {blogData?.title}{" "}
                {blogData.titleHighlight && (
                  <span className="text-tertiary">
                    {blogData.titleHighlight}
                  </span>
                )}
              </h1>
            )}

            {blogData?.description && (
              <p className="text-center mt-6 lg:mt-10 text-secondary text-[14px]">
                {blogData.description}
              </p>
            )}
          </div>
        </div>
      </section>
      <section className="section-spacing">
        <div className="container">
          {blogData?.title && (
            <div className="title-section">
              <h2>
                {blogData?.title}{" "}
                {blogData?.titleHighlight && (
                  <span className="text-tertiary">
                    {blogData?.titleHighlight}
                  </span>
                )}
              </h2>
            </div>
          )}

          <div className="content-section pt-3">
            <PostListing blogId={blogData?._id} blogName={blogName} />
          </div>
          {blogData?.modules && blogData?.modules.length > 0 && (
            <div className="modules pt-10">
              {blogData?.modules.map((module: any, index: number) => {
                switch (module._type) {
                  case "ctaBannerModule":
                    return <CTABanner key={index} {...module} />;
                }
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
