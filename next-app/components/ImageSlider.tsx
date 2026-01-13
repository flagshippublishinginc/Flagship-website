"use client";

import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
const images = [
  {
    src: "/Frame 111.webp",
    altText: "Frame 111",
  },
  {
    src: "/Frame 110.webp",
    altText: "Frame 110",
  },
  {
    src: "/Frame 109.webp",
    altText: "Frame 109",
  },
];

const ImageSlider = () => {
  const options = {
    type: "loop" as const,
    drag: true,
    clones: 3,
    cloneStatus: true,
    easing: "easeInOut",
    arrows: false,
    pagination: false,
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
            Maui <span className="text-tertiary">Island Homes</span>
          </h2>
        </div>
        <div className="flex flex-wrap mx-[-16px] lg:mx-[-32px] border-b border-t border-background-gray">
          <div className="w-full lg:w-[56.5%] md:border-r border-background-gray">
            <div className="p-4 md:p-6">Left Side</div>
          </div>
          <div className="w-full lg:w-[43.5%] border-t lg:border-t-0 border-background-gray">
            <div className="p-4 md:p-6">Right Side</div>
          </div>
        </div>
      </div>
      <div className="slider-wrapper pt-6">
        <Splide options={options} extensions={{ AutoScroll }}>
          {images.map((item, index) => (
            <SplideSlide key={index}>
              <div className=" bg-white h-full flex items-center justify-center text-lg font-bold text-gray-800">
                <Image
                  src={item.src}
                  alt={item.altText}
                  width={850}
                  height={538}
                  className="h-full"
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default ImageSlider;
