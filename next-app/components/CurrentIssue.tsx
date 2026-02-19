import { urlForImage } from "@/lib/sanity";
import Image from "next/image";
import AnimatedLink from "./AnimatedLink";
import { CurrentIssueModule } from "@/types/componentsTypes";
import { stegaClean } from "next-sanity";
import * as motion from "motion/react-client";
import {
  contentFromBottomVarient,
  contentFromTopVarient,
  imageFadeInVarient,
  parentContainerVarient,
  textFromLeftSpringVarient,
  textFromRightSpringVarient,
} from "@/lib/animation";

const CurrentIssue: React.FC<CurrentIssueModule> = ({
  badge,
  issueDate,
  coverImage,
  volumeInfo,
  featuredTitle,
  mainFeature,
  features,
  heroImage,
  buttonText,
  buttonLink,
  headingHighlight,
  headingText,
}) => {
  return (
    <section className="section-spacing bg-background-light">
      <div className="container">
        <motion.div
          variants={parentContainerVarient}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="section_title mx-[-12px] lg:mx-0 pb-3 border-b border-background-gray">
          <motion.h2
            variants={textFromLeftSpringVarient}
            className="font-heading text-primary px-3">
            {headingText}{" "}
            <span className="text-tertiary">{headingHighlight}</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 pt-3">
          {/* Left Side - Magazine Cover & Details */}
          <motion.div
            variants={parentContainerVarient}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="col-span-12 md:col-span-6 lg:col-span-4 bg-[#F8F6F3] px-10 py-8 lg:p-10 order-1 md:order-0">
            <motion.div className="flex flex-col items-center lg:items-start ">
              <div className="top_content w-full pb-6 md:pb-8">
                {badge && (
                  <motion.div
                    variants={contentFromBottomVarient}
                    className="mb-2 text-center w-full">
                    <span className="text-tertiar text-sm font-semibold tracking-wider">
                      {badge}
                    </span>
                  </motion.div>
                )}

                {issueDate && (
                  <motion.h3
                    variants={contentFromBottomVarient}
                    className="w-full text-center text-[20px] font-heading text-primary mb-2">
                    {issueDate}
                  </motion.h3>
                )}

                {coverImage && (
                  <motion.div
                    variants={imageFadeInVarient}
                    className="mb-3 w-full shadow-2xl overflow-hidden">
                    <Image
                      src={urlForImage(coverImage)!.url()}
                      alt={`${stegaClean(mainFeature)} Magazine Cover`}
                      width={400}
                      height={550}
                      className="w-full h-auto transform transition-transform duration-300 lg:hover:scale-110"
                    />
                  </motion.div>
                )}

                {volumeInfo && (
                  <motion.p
                    variants={contentFromTopVarient}
                    className="w-full text-xs text-center text-gray-500 tracking-wider">
                    {volumeInfo}
                  </motion.p>
                )}
              </div>

              <div className="bottom_content w-full text-center">
                <motion.div variants={contentFromTopVarient}>
                  {featuredTitle && (
                    <p className="text-[12px] font-semibold text-gray-600 tracking-wider mb-2">
                      {stegaClean(featuredTitle)}
                    </p>
                  )}

                  {mainFeature && (
                    <h4 className="text-[24px] font-heading text-primary mb-4 ">
                      {mainFeature}
                    </h4>
                  )}
                </motion.div>

                {features && features.length > 0 && (
                  <ul className="space-y-2 mb-8">
                    {features.map((feature, index) => (
                      <motion.li
                        key={index}
                        variants={textFromRightSpringVarient}
                        className="text-secondary text-[14px] md:text-[16px] py-4 border-t last:border-b border-background-gray">
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                )}

                {buttonText && buttonLink && (
                  <motion.div
                    variants={contentFromBottomVarient}
                    className="mt-6 md:mt-8 flex justify-center">
                    <AnimatedLink text={buttonText} href={buttonLink} />
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Hero Image */}
          <motion.div
            variants={parentContainerVarient}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="col-span-12 md:col-span-6 lg:col-span-8 relative order-0 md:order-1 overflow-hidden">
            {heroImage && (
              <motion.div
                variants={imageFadeInVarient}
                className="h-full w-full">
                <Image
                  src={urlForImage(heroImage)!.url()}
                  alt="Current Issue Hero"
                  width={860}
                  height={790}
                  className="object-cover w-full h-full transform transition-transform duration-300 lg:hover:scale-110"
                />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CurrentIssue;
