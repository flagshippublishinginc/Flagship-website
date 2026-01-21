import { TravelGuidesModule } from "@/types/homeModules";
import AnimatedButton from "./AnimatedButton";
import { getSanityData } from "@/lib/helpingFunctions";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity";
import { stegaClean } from "next-sanity";

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
      <div className="container">
        <div className="section_title pb-3 mx-[-12px] lg:mx-0 border-b border-background-gray">
          <h2 className="font-heading px-3">
            {headingText}{" "}
            <span className="text-tertiary">{headingHighlight}</span>
          </h2>
        </div>
        <div className="flex flex-wrap border-b border-background-gray">
          {leftSidePosts.length > 0 && (
            <div className="w-full h-full lg:w-[21.5%] order-2 lg:order-1">
              <div className="">
                {leftSidePosts?.map(async (post, index) => {
                  const leftSidePostQuery = `*[_type == "post" && _id == "${post._ref}"][0]`;
                  const leftSidePostData =
                    await getSanityData(leftSidePostQuery);
                  return (
                    <div
                      key={index}
                      className={`grid grid-cols-[4fr_6fr] md:grid-cols-[3fr_7fr] lg:grid-cols-1 gap-4 items-center leftPost_items py-3 md:p-6 ${index != 0 ? "border-t border-background-gray" : ""}`}>
                      <div className="leftPost_Img overflow-hidden">
                        <Image
                          src={
                            urlForImage(leftSidePostData.coverImage)?.url() ||
                            ""
                          }
                          alt={leftSidePostData.title}
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
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {featuredPostData && (
            <div className="w-full lg:w-[57%] order-1 lg:order-2 border-b lg:border-t-0 lg:border-b-0 md:border-l md:border-r border-background-gray">
              <div className="py-3 md:p-6">
                <div className="featured-img overflow-hidden">
                  <Image
                    src={urlForImage(featuredPostData.coverImage)?.url() || ""}
                    alt={featuredPostData.title}
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
              </div>
            </div>
          )}

          {rightSidePosts.length > 0 && (
            <div className="w-full h-full order-3 lg:w-[21.5%]">
              <div className="">
                {rightSidePosts?.map(async (post, index) => {
                  const rightSidePostQuery = `*[_type == "post" && _id == "${post._ref}"][0]`;
                  const rightSidePostData =
                    await getSanityData(rightSidePostQuery);

                  return (
                    <div
                      className={`grid grid-cols-[4fr_6fr] md:grid-cols-[3fr_7fr] lg:grid-cols-1 gap-4 items-center leftPost_items py-3 md:p-6 border-background-gray ${index != 0 ? "border-t " : ""} ${index === 0 ? "border-t lg:border-t-0" : ""}`}
                      key={index}>
                      <div className="leftPost_Img overflow-hidden">
                        <Image
                          src={
                            urlForImage(rightSidePostData.coverImage)?.url() ||
                            ""
                          }
                          alt={rightSidePostData.title}
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
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        {buttonText && buttonLink && (
          <div className="mt-6 md:mt-14 flex justify-center">
            <AnimatedButton text={buttonText || ""} href={buttonLink || ""} />
          </div>
        )}
      </div>
    </section>
  );
};

export default TravelGuides;
