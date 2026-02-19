import Image from "next/image";
import { urlForImage } from "@/lib/sanity";
import { HomeBannerModule } from "@/types/componentsTypes";
import AnimatedLink from "./AnimatedLink";
import { stegaClean } from "next-sanity";
import * as motion from "motion/react-client";
import {
  imageFadeInVarient,
  parentContainerVarient,
  textFromRightVarient,
} from "@/lib/animation";

const HomeBanner: React.FC<HomeBannerModule> = async ({
  image,
  title,
  description,
  author,
  buttonLabel,
  buttonLink,
}) => {
  return (
    <section className="home-banner w-full pt-3 overflow-hidden">
      <div className="container">
        <div className="grid items-center grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[3fr_2fr] gap-0 md:gap-5 lg:gap-10">
          <motion.div
            variants={parentContainerVarient}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}>
            <motion.div
              variants={imageFadeInVarient}
              className="banner-image h-full w-full overflow-hidden">
              <Image
                src={urlForImage(image)?.url() || ""}
                alt={stegaClean(title)}
                width={600}
                height={870}
                className="w-full max-h-[870px] h-full object-cover transform transition-transform duration-300 lg:hover:scale-110"
                priority
              />
            </motion.div>
          </motion.div>
          <div className="banner-content w-full flex">
            <motion.div
              variants={parentContainerVarient}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="banner-content-inner pt-5 md:pt-10 group">
              <motion.h1
                variants={textFromRightVarient}
                className="md:mb-10 mb-5 font-heading">
                <a
                  href="/"
                  className="transition-colors group-hover:text-tertiary duration-300">
                  {title}
                </a>
              </motion.h1>
              <motion.p
                variants={textFromRightVarient}
                className="banner-description md:mb-6 mb-3">
                {description}
              </motion.p>
              <motion.p
                variants={textFromRightVarient}
                className="text-secondary text-[12px]">
                By{" "}
                <span className=" font-medium transition-colors group-hover:text-tertiary duration-300">
                  {author}
                </span>
              </motion.p>
              <motion.div
                variants={textFromRightVarient}
                className="mt-10 md:mt-25 pb-10">
                <AnimatedLink text={buttonLabel} href={buttonLink} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
