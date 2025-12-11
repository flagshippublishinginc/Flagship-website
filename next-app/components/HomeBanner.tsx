import Image from "next/image";
import { HeroBannerProps } from "@/lib/types";
import AnimatedLink from "./AnimatedLink";
import { urlFor } from "@/lib/sanity";

const HomeBanner: React.FC<HeroBannerProps> = async ({
  _id,
  title,
  seo,
  modules,
}) => {
  return (
    <section className="home-banner w-full">
      <div className="banner-container">
        <div className="grid items-center grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[3fr_2fr] gap-5 lg:gap-10">
          <div className="banner-image h-full w-full">
            <Image
              src={urlFor(modules[0].image).url()}
              alt={modules[0].title}
              width={600}
              height={870}
              className="w-full max-h-[870px] h-full object-cover"
              priority
            />
          </div>
          <div className="banner-content w-full flex">
            <div className="banner-content-inner px-4 pt-10 group">
              <h1 className="md:mb-10 mb-5">
                <a
                  href="#"
                  className="transition-colors group-hover:text-tertiary duration-300">
                  {modules[0].title}
                </a>
              </h1>
              <p className="banner-description md:mb-6 mb-3">
                {modules[0].description}
              </p>
              <p className="text-secondary text-[12px]">
                By{" "}
                <span className=" font-medium transition-colors group-hover:text-tertiary duration-300">
                  {modules[0].author}
                </span>
              </p>
              <div className="mt-25 pb-10">
                <AnimatedLink
                  text={modules[0].buttonLabel}
                  href={modules[0].buttonLink}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
