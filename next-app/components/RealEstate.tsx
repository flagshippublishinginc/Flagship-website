"use client";

import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { RealEstateModule as RealEstateModuleProps } from "@/types/componentsTypes";
import { urlForImage } from "@/lib/sanity";
import { stegaClean } from "@sanity/client/stega";
import { motion } from "motion/react";
import {
  contentFromLeftVarient,
  contentFromRightVarient,
  parentContainerVarient,
  textFromLeftSpringVarient,
} from "@/lib/animation";

const RealEstateModule: React.FC<RealEstateModuleProps> = ({
  headingHighlight,
  headingText,
  featuredDescription,
  featuredImage,
  featuredTitle,
  sidebarArticles,
  propertySlides,
}) => {
  const options = {
    type: "loop" as const,
    drag: true,
    clones: 3,
    cloneStatus: true,
    easing: "easeInOut",
    arrows: false,
    pagination: false,
    gap: "4px",
    perPage: 3,
    perMove: 1,
    autoScroll: {
      speed: 1,
      pauseOnHover: true,
    },
    breakpoints: {
      1200: { perPage: 2 },
      768: { perPage: 1 },
    },
  } as any;
  return (
    <section className="section-spacing">
      <div className="container overflow-hidden">
        <motion.div
          variants={parentContainerVarient}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="section_title pb-3 mx-[-12px] lg:mx-0  border-b border-background-gray">
          <motion.h2
            variants={textFromLeftSpringVarient}
            className="font-heading px-3">
            {headingText}{" "}
            <span className="text-tertiary">{headingHighlight}</span>
          </motion.h2>
        </motion.div>
        <div className="flex flex-wrap border-b border-background-gray">
          <div className="leadArticle-item w-full lg:w-[60%] border-b lg:border-b-0 md:border-r border-background-gray">
            <motion.div
              variants={parentContainerVarient}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="py-3 md:p-6">
              <motion.div
                variants={contentFromLeftVarient}
                className="featured_img overflow-hidden">
                <Image
                  src={urlForImage(featuredImage)!.url()}
                  alt={stegaClean(featuredTitle)}
                  width={850}
                  height={316}
                  className="h-full w-full object-cover transform transition-transform duration-300 lg:hover:scale-110"
                />
              </motion.div>
              <motion.div
                variants={contentFromLeftVarient}
                className="featured_title pt-3">
                <h2 className="font-heading mb-4">{featuredTitle}</h2>
                <p className="text-secondary mb-0">{featuredDescription}</p>
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            variants={parentContainerVarient}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="sidebarArticles-item w-full lg:w-[40%] ">
            {sidebarArticles?.map((item, index) => {
              return (
                <motion.div
                  variants={contentFromRightVarient}
                  key={index}
                  className={`grid grid-cols-[4fr_6fr] lg:grid-cols-[6fr_4fr] items-center lg:items-start gap-4 py-3 md:p-6 ${index === sidebarArticles.length - 1 ? "not-first:border-t border-background-gray" : ""}`}>
                  <div className="image_content overflow-hidden">
                    <Image
                      src={urlForImage(item.image)!.url()}
                      alt={stegaClean(item.title)}
                      width={334}
                      height={184}
                      className="h-full w-full object-cover transform transition-transform duration-300 lg:hover:scale-110"
                    />
                  </div>
                  <div className="text_content">
                    <h5 className="font-heading mb-2 lg:mb-4">{item.title}</h5>
                    <p className="line-clamp-2 lg:text-[16px] text-[14px] text-secondary">
                      {stegaClean(item.description)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
      <div className="slider-wrapper pt-6 overflow-hidden">
        <Splide options={options} extensions={{ AutoScroll }}>
          {propertySlides.map((item, index) => (
            <SplideSlide key={index}>
              <div className=" bg-white h-full flex items-center justify-center text-lg font-bold text-primary relative">
                <Image
                  src={urlForImage(item.image)!.url()}
                  alt={stegaClean(item.title)}
                  width={850}
                  height={538}
                  className="h-full "
                />
                <div className="textContent px-4 py-5  absolute bottom-0 w-full left-0 z-10 bg-[linear-gradient(245.94deg,rgba(0,0,0,0.01)_37.19%,rgba(0,0,0,0.1)_90%)] backdrop-blur-[3px]">
                  <h5 className="text-white">{item.title}</h5>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default RealEstateModule;
