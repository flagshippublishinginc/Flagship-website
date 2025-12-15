import { formatPublishDate } from "@/lib/helpingFunctions";
import { ReaderFavouritesInterface } from "@/lib/interfaces";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import AnimatedLink from "./AnimatedLink";

const ReaderFavourites: React.FC<ReaderFavouritesInterface> = ({
  articles,
  headingText,
  headingHighlight,
}) => {
  return (
    <section className="section-spacing">
      <div className="container">
        <div className="section_title pb-3">
          <h2 className="font-heading">
            {headingText}
            <span className="text-tertiary"> {headingHighlight}</span>
          </h2>
        </div>
        <div className="flex flex-wrap mx-[-16px] lg:mx-[-32px]  border-b border-background-gray">
          {articles.map((article, index) => {
            const updatedDescription =
              article.description.slice(0, 100) + "...";
            return (
              <div
                key={index}
                className={`py-6 px-4 lg:px-8 w-full md:w-[calc(100%/2)] lg:w-[calc(100%/3)] border-t border-background-gray md:odd:border-r  lg:odd:border-r-0 lg:not-first:border-l`}>
                <div className="article-top mb-6">
                  <div className="image-top flex justify-between items-center gap-2 mb-3 text-[14px]">
                    {article.publishDate && (
                      <span>{formatPublishDate(article.publishDate)}</span>
                    )}
                    {article.category && (
                      <span className="inline-block py-2 px-4 bg-background-category text-primary text-[12px]">
                        {article.category}
                      </span>
                    )}
                  </div>
                  <div className="article-image">
                    <Image
                      src={urlFor(article.image).url()}
                      alt={article.title}
                      width={700}
                      height={700}
                    />
                  </div>
                </div>
                <div className="article_text">
                  {article.title && (
                    <h4 className="font-heading mb-4">{article.title}</h4>
                  )}

                  {article.description && (
                    <p className="text-secondary mb-6">{updatedDescription}</p>
                  )}

                  {article.author && (
                    <p className="text-gray-light text-[12px]">
                      {article.author}
                    </p>
                  )}

                  <div className="mt-10">
                    <AnimatedLink
                      text={article.readText}
                      href={article.readLink}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ReaderFavourites;
