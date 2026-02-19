import { urlForImage } from "@/lib/sanity";
import { MiniGalleryModule } from "@/types/componentsTypes";
import { stegaClean } from "next-sanity";
import Image from "next/image";
import AnimatedButton from "./AnimatedButton";
import * as motion from "motion/react-client";
import {
  miniGalleryContainerVariants,
  miniGalleryHeadingVariants,
  miniGalleryImageVariants,
} from "@/lib/animation";

const LAYOUT = [
  { col: "md:col-span-3", row: "md:row-span-3" },
  { col: "md:col-span-2", row: "md:row-span-2" },
  { col: "md:col-span-1", row: "md:row-span-1" },
  { col: "md:col-span-1", row: "md:row-span-1" },
];

const MiniGallery = ({
  heading,
  highlightedHeadingText,
  images,
  buttonText,
  buttonLink,
}: MiniGalleryModule) => {
  return (
    <motion.section
      variants={miniGalleryContainerVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.5 }}
      className="section-spacing overflow-hidden">
      <div className="container">
        {heading && (
          <motion.div
            variants={miniGalleryHeadingVariants}
            className="mb-10"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.5 }}>
            <h2 className="text-4xl font-bold">
              {heading}{" "}
              {highlightedHeadingText && (
                <span className="text-tertiary">{highlightedHeadingText}</span>
              )}
            </h2>
          </motion.div>
        )}
        <div className="grid grid-cols lg:grid-cols-5 lg:grid-row-4 gap-2 md:gap-4 lg:gap-col-5 lg:gap-row-5">
          {images?.map((image, index) => (
            <motion.div
              variants={miniGalleryImageVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.5 }}
              key={index}
              className={`${LAYOUT[index].col} ${LAYOUT[index].row} overflow-hidden`}>
              <Image
                src={urlForImage(image.image)!.url()}
                alt={stegaClean(image.altText)}
                width={790}
                height={736}
                className="w-full h-full object-cover transition-transform duration-300 lg:hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
        {buttonText && (
          <motion.div
            variants={miniGalleryHeadingVariants}
            className="mt-6 md:mt-14 flex justify-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.5 }}>
            <AnimatedButton text={buttonText} href={buttonLink} />
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default MiniGallery;
