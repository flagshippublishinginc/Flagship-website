"use client";

import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { RealEstateModule as RealEstateModuleProps } from "@/types/homeModules";
import { urlForImage } from "@/lib/sanity";
import { stegaClean } from "@sanity/client/stega";

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
      <div className="container">
        <div className="section_title pb-3">
          <h2 className="font-heading">
            {headingText}{" "}
            <span className="text-tertiary">{headingHighlight}</span>
          </h2>
        </div>
        <div className="flex flex-wrap mx-[-16px] lg:mx-[-32px]  border-b border-t border-background-gray">
          <div className="leadArticle-item w-full  lg:w-[60%] border-b lg:border-b-0 md:border-r border-background-gray">
            <div className="p-4 md:p-6">
              <div className="featured_img overflow-hidden">
                <Image
                  src={urlForImage(featuredImage)?.url() || ""}
                  alt={featuredTitle}
                  width={850}
                  height={316}
                  className="h-full w-full object-cover transform transition-transform duration-300 lg:hover:scale-110"
                />
              </div>
              <div className="featured_title pt-3">
                <h2 className="font-heading mb-4">{featuredTitle}</h2>
                <p className="text-secondary mb-0">{featuredDescription}</p>
              </div>
            </div>
          </div>
          <div className="sidebarArticles-item w-full lg:w-[40%] ">
            {sidebarArticles?.map((item, index) => {
              const cleanedDescription = stegaClean(item.description);
              const updatedDescription =
                cleanedDescription.slice(0, 75) + "...";
              return (
                <div
                  key={index}
                  className={`grid grid-cols-[4fr_6fr] lg:grid-cols-[6fr_4fr] items-center lg:items-start gap-4 p-4 md:p-6 ${index === sidebarArticles.length - 1 ? "not-first:border-t border-background-gray" : ""}`}>
                  <div className="image_content overflow-hidden">
                    <Image
                      src={urlForImage(item.image)?.url() || ""}
                      alt={item.title}
                      width={334}
                      height={184}
                      className="h-full w-full object-cover transform transition-transform duration-300 lg:hover:scale-110"
                    />
                  </div>
                  <div className="text_content">
                    <h5 className="font-heading mb-4">{item.title}</h5>
                    <p>{updatedDescription}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="slider-wrapper pt-6 overflow-hidden">
        <Splide options={options} extensions={{ AutoScroll }}>
          {propertySlides.map((item, index) => (
            <SplideSlide key={index}>
              <div className=" bg-white h-full flex items-center justify-center text-lg font-bold text-primary relative">
                <Image
                  src={urlForImage(item.image)?.url() || ""}
                  alt={item.title}
                  width={850}
                  height={538}
                  className="h-full "
                />
                <div className="textContent absolute bottom-9 left-8 z-10">
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
