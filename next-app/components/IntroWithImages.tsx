import { portableTextComponents } from "@/lib/portableTextComponents";
import { urlForImage } from "@/lib/sanity";
import { IntroWithImagesModule } from "@/types/componentsTypes";
import { PortableText, stegaClean } from "next-sanity";
import Image from "next/image";
import AnimatedButton from "./AnimatedButton";
import * as motion from "motion/react-client";
import {
  introWithImagesImageContainerVariants,
  introWithImagesImageVariants,
  introWithImagesTextVariants,
} from "@/lib/animation";

const IntroWithImages = ({
  headingText,
  headingHighlight,
  textContent,
  addImages,
  addButton,
  buttonText,
  buttonLink,
}: IntroWithImagesModule) => {
  return (
    <section className="section-spacing overflow-hidden">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center">
        <motion.div
          variants={introWithImagesTextVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}>
          {headingText && headingHighlight && (
            <div>
              <h2>
                {headingText}{" "}
                {headingHighlight && (
                  <span className="text-tertiary">{headingHighlight}</span>
                )}
              </h2>
            </div>
          )}
          {textContent && (
            <div className="pt-6 lg:pt-10">
              <PortableText
                value={textContent.content}
                components={portableTextComponents}
              />
            </div>
          )}
          {addButton && (
            <div className="pt-4 lg:pt-6">
              <AnimatedButton text={buttonText} href={buttonLink} />
            </div>
          )}
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"
          variants={introWithImagesImageContainerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}>
          {addImages?.map((imageItem, index) => (
            <motion.div
              key={index}
              className="overflow-hidden"
              variants={introWithImagesImageVariants}>
              <Image
                src={urlForImage(imageItem?.image)!.url()}
                alt={stegaClean(imageItem?.alt)}
                width={217}
                height={188}
                className="h-full w-full object-cover transform transition-transform duration-300 lg:hover:scale-110"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default IntroWithImages;
