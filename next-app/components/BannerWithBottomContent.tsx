import { BannerWithBottomContentModule } from "@/types/componentsTypes";
import { PortableText, stegaClean } from "next-sanity";
import AnimatedButton from "./AnimatedButton";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity";
import { portableTextComponents } from "@/lib/portableTextComponents";
import * as motion from "motion/react-client";
import {
  bannerWithBottomContentHeroTextContainerVariants,
  bannerWithBottomContentHeroTextVariants,
  bannerWithBottomContentImageVariants,
  bannerWithBottomContentTextVariants,
} from "@/lib/animation";

const BannerWithBottomContent: React.FC<BannerWithBottomContentModule> = ({
  addBottomContent,
  addButton,
  buttonText,
  buttonLink,
  buttonAlignment,
  topTextContent,
  textContent,
  image,
  imageAlt,
  textBackgroundColor,
  textColor,
  contentMaxWidth,
}) => {
  return (
    <motion.section
      className="section-spacing overflow-hidden"
      variants={bannerWithBottomContentHeroTextContainerVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}>
      <div className="container">
        <motion.div
          variants={bannerWithBottomContentHeroTextVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}>
          <PortableText
            value={topTextContent.content}
            components={portableTextComponents}
          />
          {addButton && (
            <div
              className={`flex justify-center mt-5 ${buttonAlignment === "left" ? "justify-start" : buttonAlignment === "right" ? "justify-end" : "justify-center"}`}>
              <AnimatedButton href={buttonLink} text={buttonText} />
            </div>
          )}
        </motion.div>
        {addBottomContent && (
          <div className="mt-8 md:mt-14 lg:mt-20 relative px-6 py-15 md:py-[100px] lg:py-[162px] flex justify-center items-center">
            <motion.div
              variants={bannerWithBottomContentTextVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className={`py-8 md:py-10 lg:py-14 px-6 md:px-12 lg:px-12 italic relative z-10`}
              style={{
                maxWidth: `${stegaClean(contentMaxWidth)}px`,
                backgroundColor: stegaClean(textBackgroundColor),
                color: stegaClean(textColor),
              }}>
              <p className="text-center">{textContent}</p>
            </motion.div>
            {image && (
              <motion.div
                className="absolute inset-0 w-full h-full object-cover z-0"
                variants={bannerWithBottomContentImageVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}>
                <Image
                  src={urlForImage(image)!.url()}
                  alt={stegaClean(imageAlt)}
                  width={1000}
                  height={1000}
                  priority
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default BannerWithBottomContent;
