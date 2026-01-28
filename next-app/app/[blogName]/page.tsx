import { CTABanner, PostListing } from "@/components";
import { getSanityData } from "@/lib/helpingFunctions";

type Params = {
  blogName: string;
};

export default async function BlogPage({ params }: { params: Params }) {
  const { blogName } = await params;
  const blogQuery = `*[_type == "blogListingPage" && slug.current == "${blogName}"][0]{_id,title, titleHighlight, description, seo{metaTitle, metaDescription},modules[]}`;
  const blogData: any = await getSanityData(blogQuery);
  console.log("blogData ", blogData);
  return (
    <main>
      <section className="blog-banner-wrapper">
        <div className="container">
          <div className="max-w-[555px] mx-auto">
            <h1 className="text-center">
              {blogData.title}{" "}
              {blogData.titleHighlight && (
                <span className="text-tertiary">{blogData.titleHighlight}</span>
              )}
            </h1>
            {blogData.description && (
              <p className="text-center mt-6 lg:mt-10 text-secondary text-[14px]">
                {blogData.description}
              </p>
            )}
          </div>
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
            <PostListing blogId={blogData._id} blogName={blogName} />
          </div>
          {blogData.modules && blogData.modules.length > 0 && (
            <div className="modules pt-10">
              {blogData.modules.map((module: any, index: number) => {
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
