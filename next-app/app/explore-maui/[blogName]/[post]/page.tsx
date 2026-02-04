import {
  AnimatedLink,
  CTABanner,
  LoadMorePostData,
  RichTextContent,
  SingleImage,
  SocialShare,
  TableOfContents,
  TwoColumnTextWithImage,
} from "@/components";
import {
  formatDateLong,
  formatPublishDate,
  getSanityData,
} from "@/lib/helpingFunctions";
import { urlForImage } from "@/lib/sanity";
import { Metadata } from "next";
import { stegaClean } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: {
    blogName: string;
    post: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { post } = await params;

  const blogPostQuery = `
    *[
      _type == "post" &&
      slug.current == $slug
    ][0]{
      seo
    }
  `;

  const blogPostData = await getSanityData(blogPostQuery, {
    slug: post,
  });

  if (!blogPostData) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: blogPostData?.seo?.metaTitle || blogPostData.title,
    description: blogPostData?.seo?.metaDescription || blogPostData.description,
    openGraph: {
      title: blogPostData?.seo?.metaTitle || blogPostData.title,
      description:
        blogPostData?.seo?.metaDescription || blogPostData.description,
    },
    twitter: {
      title: blogPostData?.seo?.metaTitle || blogPostData.title,
      description:
        blogPostData?.seo?.metaDescription || blogPostData.description,
    },
  };
}

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
      content,
      loadMoreContent,
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
        "url":  slug.current,
        "ctaModules": modules[_type == "ctaBannerModule"][0]
      },
      seo
    }
  `;

const relatedBlogQuery = `*[
  _type == "post" &&
  _id != $currentPostId &&
  selectBlog._ref == $blogId &&
  references($categoryIds)
]
| order(_createdAt desc)[0...3]{
  _id,
  title,
  description,
  slug,
  coverImage,
  _createdAt,
  categories[]->{
    _id,
    title,
    slug
  },
  selectBlog->{
  slug,
  "url":  slug.current },
  author->{
    _id,
    name,
  },
}`;

export default async function PostPage({ params }: Props) {
  const { post } = await params;

  const blogPostData = await getSanityData(blogPostQuery, {
    slug: post,
  });

  console.log("blogPostData", blogPostData);

  const relatedBlogData = await getSanityData(relatedBlogQuery, {
    currentPostId: blogPostData._id,
    blogId: blogPostData.selectBlog._id,
    categoryIds: blogPostData.categories.map((category: any) => category._id),
  });

  if (!blogPostData) {
    return null;
  }
  return (
    <>
      <section className="section-spacing py-6!">
        <div className="container">
          <div className="flex flex-wrap gap-[16px] lg:gap-[24px]">
            <div className="w-full md:w-[calc(50%-8px)] lg:w-[calc(35%-12px)]">
              <div className="flex items-center text-[#666666] mb-10 lg:mb-16">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  transform="rotate(90)">
                  <g strokeWidth="0" />
                  <g strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.707 14.707a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 1.414-1.414L12 12.586l4.293-4.293a1 1 0 1 1 1.414 1.414z"
                    fill="#666666"
                  />
                </svg>{" "}
                <Link
                  className="px-2 text-[#DDD8D1] hover:text-tertiary transition-colors duration-300 font-semibold"
                  href={`/`}>
                  HOME
                </Link>
                {"/"}
                <Link
                  className="px-2 text-primary hover:text-tertiary transition-colors duration-300 font-semibold"
                  href={`/explore-maui/${blogPostData.selectBlog.url}`}>
                  BLOGS
                </Link>
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
            <div className="w-full md:w-[calc(50%-8px)] lg:w-[calc(65%-12px)]">
              <Image
                src={urlForImage(blogPostData.coverImage)!.url()}
                alt={stegaClean(blogPostData.title)}
                width={845}
                height={657}
                priority
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      <main className="blog-content-wrapper section-spacing">
        <div className="container">
          <div className="flex flex-wrap gap-4 lg:gap-[56px]">
            <div className="w-full md:w-[calc(70%-12px)] lg:w-[calc(70%-28px)] order-2 md:order-1 flex flex-col">
              {blogPostData.content.length > 0 && (
                <div className="blog-heading-content prose-h2:text-tertiary prose-h2:m-0 prose-h2:mb-2 prose-h2:text-[20px] prose-h2:lg:text-[32px]">
                  {blogPostData.content.map((module: any, index: number) => {
                    switch (module._type) {
                      case "richTextModule":
                        return <RichTextContent key={index} {...module} />;
                      case "singleImageModule":
                        return <SingleImage key={index} {...module} />;
                      case "twoColumnTextWithImage":
                        return (
                          <TwoColumnTextWithImage key={index} {...module} />
                        );
                    }
                  })}
                </div>
              )}
              {blogPostData.loadMoreContent && (
                <LoadMorePostData content={blogPostData.loadMoreContent} />
              )}
            </div>
            <div className="w-full md:w-[calc(30%-12px)] lg:w-[calc(30%-28px)] order-1 md:order-2 pt-0 lg:pt-4">
              <div className="sticky top-[30px]">
                <TableOfContents
                  elementClassName="blog-heading-content"
                  classNames={`w-full`}
                />
                <SocialShare
                  url={`${blogPostData.selectBlog.url}/${blogPostData.slug.current}`}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      {relatedBlogData.length > 0 && (
        <section className="section-spacing">
          <div className="container">
            <div className="section_title pb-3 lg:mx-0 border-b border-background-gray">
              <h2 className="font-heading">
                <span className="text-tertiary">Related</span> Articles
              </h2>
            </div>
            <div className="flex flex-wrap border-b border-background-gray">
              {relatedBlogData.map((blogPostData: any, index: number) => {
                return (
                  <div
                    key={index}
                    className={`group py-6 md:px-4 lg:px-8 w-full md:w-[calc(100%/2)] lg:w-[calc(100%/3)] bg-white border-background-gray md:odd:border-r lg:not-[&:hover]:odd:border-r-0 lg:not-[&:hover]:not-first:border-l md:hover:scale-103 transition-all duration-300 md:hover:border ${index === 0 ? "" : "border-t lg:border-t-0"}`}>
                    <div className="article-top mb-6">
                      <div className="image-top flex justify-between items-center gap-2 mb-3 text-[14px]">
                        {blogPostData._createdAt && (
                          <span>
                            {formatPublishDate(blogPostData._createdAt)}
                          </span>
                        )}
                        {blogPostData.categories.length > 0 && (
                          <span className="inline-block py-2 px-4 bg-background-category text-primary text-[12px]">
                            {blogPostData.categories[0].title}
                          </span>
                        )}
                      </div>
                      <div className="article-image">
                        <Link
                          href={`/explore-maui/${blogPostData.selectBlog.url}/${blogPostData.slug.current}`}>
                          <Image
                            src={urlForImage(blogPostData.coverImage)!.url()}
                            alt={stegaClean(blogPostData.title)}
                            width={416}
                            height={232}
                            className="w-full md:max-h-[235px] object-cover"
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="article_text">
                      {blogPostData.title && (
                        <h4 className="font-heading text-primary mb-4 group-hover:text-tertiary transition-all duration-300">
                          {stegaClean(blogPostData.title)}
                        </h4>
                      )}

                      {blogPostData.description && (
                        <p className="text-secondary mb-6 line-clamp-2">
                          {stegaClean(blogPostData.description)}
                        </p>
                      )}

                      {blogPostData.author.name && (
                        <p className="text-gray-light text-[12px] group-hover:text-tertiary transition-all duration-300">
                          By {stegaClean(blogPostData.author.name)}
                        </p>
                      )}

                      <div className="mt-10">
                        <AnimatedLink
                          text={`Read Story`}
                          href={`/explore-maui/${blogPostData.selectBlog.url}/${blogPostData.slug.current}`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
      {blogPostData.selectBlog.ctaModules && (
        <section className="section-spacing">
          <CTABanner {...blogPostData.selectBlog.ctaModules} />
        </section>
      )}
    </>
  );
}
