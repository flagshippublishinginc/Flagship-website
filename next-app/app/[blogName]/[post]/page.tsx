import { formatDateLong, getSanityData } from "@/lib/helpingFunctions";
import { urlForImage } from "@/lib/sanity";
import { stegaClean } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: {
    blogName: string;
    post: string;
  };
};

export default async function PostPage({ params }: Props) {
  const { blogName, post } = await params;

  const blogPostQuery = `
    *[
      _type == "post" &&
      slug.current == $slug
    ][0]{
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
      },
      selectBlog->{
        _id,
        title,
        titleHighlight,
        slug,
        "url": "/" + slug.current
      }
    }
  `;

  const blogPostData = await getSanityData(blogPostQuery, {
    slug: post,
  });

  if (!blogPostData) {
    return null;
  }
  console.log("blogPostData ", blogPostData);
  return (
    <>
      <section className="section-spacing py-6!">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <div>
                {"<"} <Link href={`/`}>Home</Link>
                {"/"}
                <Link href={blogPostData.selectBlog.url}>Blog</Link>{" "}
              </div>
              <div>
                {blogPostData.title && (
                  <h1>{stegaClean(blogPostData.title)}</h1>
                )}
                {blogPostData.description && (
                  <p className="mt-4 text-secondary text-[14px]">
                    {stegaClean(blogPostData.description)}
                  </p>
                )}
                <div className="blog_banner_bottom mt-8 lg:mt-14 flex items-center gap-4">
                  {blogPostData.author.name && (
                    <div className="author-data text-[14px]">
                      By{" "}
                      <span className="text-tertiary">
                        {stegaClean(blogPostData.author.name)}
                      </span>
                    </div>
                  )}
                  <div className="text-[14px] text-tertiary pl-4 border-l border-background-gray leading-4">
                    {formatDateLong(blogPostData._createdAt)}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-8">
              <Image
                src={urlForImage(blogPostData.coverImage)!.url()}
                alt={stegaClean(blogPostData.title)}
                width={334}
                height={205}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
