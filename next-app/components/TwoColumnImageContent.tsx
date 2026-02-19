import { urlForImage } from "@/lib/sanity";
import { TwoColumnImageContentModule } from "@/types/componentsTypes";
import Image from "next/image";
import { stegaClean } from "@sanity/client/stega";
import AnimatedLink from "./AnimatedLink";
import * as motion from "motion/react-client";
import {
  contentFromRightVarient,
  imageFadeInVarient,
  parentContainerVarient,
  textFromLeftSpringVarient,
  textFromRightSpringVarient,
} from "@/lib/animation";

const TwoColumnImageContent: React.FC<TwoColumnImageContentModule> = ({
  featuredTitle,
  featuredDescription,
  featuredButtonLink,
  featuredButtonText,
  featuredImage,
  headingHighlight,
  headingText,
  secondaryImage,
}) => {
  return (
    <section className="section-spacing overflow-hidden">
      <div className="container">
        <div className="section_inner block lg:grid lg:grid-cols-12 gap-8 lg:gap-6">
          <motion.div
            variants={parentContainerVarient}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-8">
            <motion.div
              variants={textFromLeftSpringVarient}
              className="column_heading lg:px-0 block lg:hidden pb-4">
              <h3 className="font-heading">
                {stegaClean(headingText)}
                <span className="text-tertiary">
                  {" "}
                  {stegaClean(headingHighlight)}
                </span>
              </h3>
            </motion.div>
            <motion.div
              variants={imageFadeInVarient}
              className="overflow-hidden">
              <Image
                src={urlForImage(featuredImage)!.url()}
                alt={stegaClean(featuredTitle)}
                width={962}
                height={762}
                className="w-full h-auto lg:h-full object-cover transform transition-transform duration-300 lg:hover:scale-110"
              />
            </motion.div>
          </motion.div>
          <motion.div
            variants={parentContainerVarient}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="col-span-12 mt-8 lg:mt-0 lg:col-span-4 flex flex-col justify-between gap-4">
            <div className="column_heading lg:px-0 py-6 border-t border-b border-background-gray hidden lg:block">
              <motion.h3
                variants={textFromRightSpringVarient}
                className="font-heading">
                {stegaClean(headingText)}
                <span className="text-tertiary">
                  {" "}
                  {stegaClean(headingHighlight)}
                </span>
              </motion.h3>
            </div>
            <div className="bottom-content">
              <div className="text-content lg:px-0">
                <motion.h2
                  variants={contentFromRightVarient}
                  className="font-heading mb-3 lg:mb-10">
                  {stegaClean(featuredTitle)}
                </motion.h2>
                <motion.p
                  variants={contentFromRightVarient}
                  className="text-secondary text-[14px]">
                  {stegaClean(featuredDescription)}
                </motion.p>
                <motion.div
                  variants={contentFromRightVarient}
                  className="mt-4 lg:mt-6">
                  <AnimatedLink
                    text={featuredButtonText}
                    href={featuredButtonLink}
                  />
                </motion.div>
              </div>
              <motion.div
                variants={imageFadeInVarient}
                className="bottom_image mt-8 lg:mt-14 overflow-hidden">
                <Image
                  src={urlForImage(secondaryImage)!.url()}
                  alt={stegaClean(featuredTitle)}
                  width={962}
                  height={762}
                  className="w-full h-auto object-cover transform transition-transform duration-300 lg:hover:scale-110"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TwoColumnImageContent;
