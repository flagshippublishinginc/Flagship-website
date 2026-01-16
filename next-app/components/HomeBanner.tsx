import Image from "next/image";
import { urlForImage } from "@/lib/sanity";
import { HomeBannerModule } from "@/types/homeModules";
import AnimatedLink from "./AnimatedLink";

const HomeBanner = async ({ modules }: { modules: HomeBannerModule }) => {
  return (
    <section className="home-banner w-full">
      <div className="banner-container">
        <div className="grid items-center grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[3fr_2fr] gap-5 lg:gap-10">
          <div className="banner-image h-full w-full">
            <Image
              src={urlForImage(modules.image)?.url() || ""}
              alt={modules.title}
              width={600}
              height={870}
              className="w-full max-h-[870px] h-full object-cover"
              priority
            />
          </div>
          <div className="banner-content w-full flex">
            <div className="banner-content-inner px-4 pt-10 group">
              <h1 className="md:mb-10 mb-5 font-heading">
                <a
                  href="https://www.mauimagazine.net/"
                  className="transition-colors group-hover:text-tertiary duration-300">
                  {modules.title}
                </a>
              </h1>
              <p className="banner-description md:mb-6 mb-3">
                {modules.description}
              </p>
              <p className="text-secondary text-[12px]">
                By{" "}
                <span className=" font-medium transition-colors group-hover:text-tertiary duration-300">
                  {modules.author}
                </span>
              </p>
              <div className="mt-10 md:mt-25 pb-10">
                <AnimatedLink
                  text={modules.buttonLabel}
                  href={modules.buttonLink}
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
