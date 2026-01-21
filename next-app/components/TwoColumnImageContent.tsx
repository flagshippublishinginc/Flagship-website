import { urlForImage } from "@/lib/sanity";
import { TwoColumnImageContentModule } from "@/types/homeModules";
import Image from "next/image";
import { stegaClean } from "@sanity/client/stega";
import AnimatedLink from "./AnimatedLink";

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
    <section className="section-spacing">
      <div className="container">
        <div className="section_inner grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6">
          <div className="col-span-12 lg:col-span-8">
            <div className="column_heading lg:px-0 block lg:hidden pb-4">
              <h3 className="font-heading">
                {stegaClean(headingText)}
                <span className="text-tertiary">
                  {" "}
                  {stegaClean(headingHighlight)}
                </span>
              </h3>
            </div>
            <div className="overflow-hidden">
              <Image
                src={urlForImage(featuredImage)?.url() || ""}
                alt={stegaClean(featuredTitle)}
                width={962}
                height={762}
                className="w-full h-auto lg:h-full object-cover transform transition-transform duration-300 lg:hover:scale-110"
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-between gap-4">
            <div className="column_heading lg:px-0 py-6 border-t border-b border-background-gray hidden lg:block">
              <h3 className="font-heading">
                {stegaClean(headingText)}
                <span className="text-tertiary">
                  {" "}
                  {stegaClean(headingHighlight)}
                </span>
              </h3>
            </div>
            <div className="bottom-content">
              <div className="text-content lg:px-0">
                <h2 className="font-heading mb-3 lg:mb-10">
                  {stegaClean(featuredTitle)}
                </h2>
                <p className="text-secondary text-[14px]">
                  {stegaClean(featuredDescription)}
                </p>
                <div className="mt-4 lg:mt-6">
                  <AnimatedLink
                    text={featuredButtonText}
                    href={featuredButtonLink}
                  />
                </div>
              </div>
              <div className="bottom_image mt-8 lg:mt-14 overflow-hidden">
                <Image
                  src={urlForImage(secondaryImage)?.url() || ""}
                  alt={stegaClean(featuredTitle)}
                  width={962}
                  height={762}
                  className="w-full h-auto object-cover transform transition-transform duration-300 lg:hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoColumnImageContent;
