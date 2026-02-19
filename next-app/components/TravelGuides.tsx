import { TravelGuidesModule } from "@/types/componentsTypes";
import AnimatedButton from "./AnimatedButton";
import { getSanityData } from "@/lib/helpingFunctions";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity";
import { stegaClean } from "next-sanity";
import * as motion from "motion/react-client";
import {
  contentFromBottomVarient,
  contentFromLeftVarient,
  contentFromRightVarient,
  parentContainerVarient,
  textFromLeftSpringVarient,
} from "@/lib/animation";

const TravelGuides: React.FC<TravelGuidesModule> = async ({
  rightSidePosts,
  leftSidePosts,
  featuredPost,
  headingHighlight,
  headingText,
  buttonText,
  buttonLink,
}) => {
  const featuredQuery = `*[_type == "post" && _id == "${featuredPost._ref}"][0]`;
  const featuredPostData = await getSanityData(featuredQuery);
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
            {headingText}{" "}
            <span className="text-tertiary">{headingHighlight}</span>
          </motion.h2>
        </motion.div>
        <div className="flex flex-wrap border-b border-background-gray">
          {leftSidePosts.length > 0 && (
            <motion.div
              variants={parentContainerVarient}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="w-full h-full lg:w-[21.5%] order-2 lg:order-1">
              <div className="">
                {leftSidePosts?.map(async (post, index) => {
                  const leftSidePostQuery = `*[_type == "post" && _id == "${post._ref}"][0]`;
                  const leftSidePostData =
                    await getSanityData(leftSidePostQuery);
                  return (
                    <motion.div
                      key={index}
                      variants={contentFromLeftVarient}
                      className={`grid grid-cols-[4fr_6fr] md:grid-cols-[3fr_7fr] lg:grid-cols-1 gap-4 items-center leftPost_items py-3 md:p-6 ${index != 0 ? "border-t border-background-gray" : ""}`}>
                      <div className="leftPost_Img overflow-hidden">
                        <Image
                          src={urlForImage(leftSidePostData.coverImage)!.url()}
                          alt={stegaClean(leftSidePostData.title)}
                          width={774}
                          height={496}
                          className="w-full h-full object-cover transform transition-transform duration-300 lg:hover:scale-110"
                        />
                      </div>
                      {leftSidePostData.title && (
                        <div className="leftPost_Text">
                          <h5 className="font-heading md:text-[18px]">
                            {leftSidePostData.title}
                          </h5>
                          {leftSidePostData?.description && (
                            <div className="featured_text mt-2">
                              <p className="text-secondary text-[14px] line-clamp-2">
                                {stegaClean(leftSidePostData?.description)}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {featuredPostData && (
            <motion.div
              variants={parentContainerVarient}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="w-full lg:w-[57%] order-1 lg:order-2 border-b lg:border-t-0 lg:border-b-0 md:border-l md:border-r border-background-gray">
              <motion.div
                variants={contentFromBottomVarient}
                className="py-3 md:p-6">
                <div className="featured-img overflow-hidden">
                  <Image
                    src={urlForImage(featuredPostData.coverImage)?.url() || ""}
                    alt={stegaClean(featuredPostData.title)}
                    width={774}
                    height={496}
                    className="w-full h-full object-cover transform transition-transform duration-300 lg:hover:scale-110"
                  />
                </div>

                {featuredPostData?.title && (
                  <div className="featured_text mt-3">
                    <h2>{featuredPostData.title}</h2>
                  </div>
                )}
                {featuredPostData?.description && (
                  <div className="featured_text mt-2">
                    <p className="text-secondary text-[14px] line-clamp-2">
                      {stegaClean(featuredPostData?.description)}
                    </p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}

          {rightSidePosts.length > 0 && (
            <motion.div
              variants={parentContainerVarient}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="w-full h-full order-3 lg:w-[21.5%]">
              <div className="">
                {rightSidePosts?.map(async (post, index) => {
                  const rightSidePostQuery = `*[_type == "post" && _id == "${post._ref}"][0]`;
                  const rightSidePostData =
                    await getSanityData(rightSidePostQuery);

                  return (
                    <motion.div
                      variants={contentFromRightVarient}
                      className={`grid grid-cols-[4fr_6fr] md:grid-cols-[3fr_7fr] lg:grid-cols-1 gap-4 items-center leftPost_items py-3 md:p-6 border-background-gray ${index != 0 ? "border-t " : ""} ${index === 0 ? "border-t lg:border-t-0" : ""}`}
                      key={index}>
                      <div className="leftPost_Img overflow-hidden">
                        <Image
                          src={urlForImage(rightSidePostData.coverImage)!.url()}
                          alt={stegaClean(rightSidePostData.title)}
                          width={244}
                          height={189}
                          className="w-full h-full object-cover transform transition-transform duration-300 lg:hover:scale-110"
                        />
                      </div>
                      {rightSidePostData.title && (
                        <div className="rightPost_Text">
                          <h5 className="font-heading md:text-[18px]">
                            {rightSidePostData.title}
                          </h5>
                          {rightSidePostData?.description && (
                            <div className="featured_text mt-2">
                              <p className="text-secondary text-[14px] line-clamp-2">
                                {stegaClean(rightSidePostData?.description)}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
        {buttonText && buttonLink && (
          <motion.div
            variants={parentContainerVarient}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mt-6 md:mt-14 flex justify-center">
            <motion.div variants={contentFromBottomVarient}>
              <AnimatedButton text={buttonText || ""} href={buttonLink || ""} />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TravelGuides;
