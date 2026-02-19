import { formatPublishDate } from "@/lib/helpingFunctions";
import { urlForImage } from "@/lib/sanity";
import Image from "next/image";
import AnimatedLink from "./AnimatedLink";
import { ReaderFavouritesModule } from "@/types/componentsTypes";
import { stegaClean } from "@sanity/client/stega";
import * as motion from "motion/react-client";
import {
  contentFromBottomVarient,
  parentContainerVarient,
  textFromLeftSpringVarient,
} from "@/lib/animation";

const ReaderFavourites: React.FC<ReaderFavouritesModule> = ({
  articles,
  headingText,
  headingHighlight,
}) => {
  return (
    <section className="section-spacing">
      <div className="container overflow-hidden">
        <motion.div
          variants={parentContainerVarient}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="section_title pb-3 mx-[-12px] lg:mx-0 border-b border-background-gray">
          <motion.h2
            variants={textFromLeftSpringVarient}
            className="font-heading px-3">
            {headingText}
            <span className="text-tertiary"> {headingHighlight}</span>
          </motion.h2>
        </motion.div>
        <motion.div
          variants={parentContainerVarient}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex flex-wrap border-b border-background-gray">
          {articles.map((article, index) => {
            return (
              <motion.div
                key={index}
                variants={contentFromBottomVarient}
                className={`group py-6 md:px-4 lg:px-8 w-full md:w-[calc(100%/2)] lg:w-[calc(100%/3)] bg-white border-background-gray md:odd:border-r lg:not-[&:hover]:odd:border-r-0 lg:not-[&:hover]:not-first:border-l md:hover:scale-103 transition-all duration-300 md:hover:border ${index === 0 ? "" : "border-t lg:border-t-0"}`}>
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
                      src={urlForImage(article.image)!.url()}
                      alt={stegaClean(article.title)}
                      width={700}
                      height={700}
                    />
                  </div>
                </div>
                <div className="article_text">
                  {article.title && (
                    <h4 className="font-heading text-primary mb-4">
                      {article.title}
                    </h4>
                  )}

                  {article.description && (
                    <p className="text-secondary mb-6 line-clamp-2">
                      {stegaClean(article.description)}
                    </p>
                  )}

                  {article.author && (
                    <p className="text-gray-light text-[12px] group-hover:text-tertiary transition-all duration-300">
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
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ReaderFavourites;
