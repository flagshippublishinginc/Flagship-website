import { urlForImage } from "@/lib/sanity";
import Image from "next/image";
import AnimatedLink from "./AnimatedLink";
import { CurrentIssueModule } from "@/types/componentsTypes";
import { stegaClean } from "next-sanity";

const CurrentIssue: React.FC<CurrentIssueModule> = ({
  badge,
  issueDate,
  coverImage,
  volumeInfo,
  featuredTitle,
  mainFeature,
  features,
  heroImage,
  buttonText,
  buttonLink,
  headingHighlight,
  headingText,
}) => {
  return (
    <section className="section-spacing bg-background-light">
      <div className="container">
        <div className="section_title mx-[-12px] lg:mx-0 pb-3 border-b border-background-gray">
          <h2 className="font-heading text-primary px-3">
            {headingText}{" "}
            <span className="text-tertiary">{headingHighlight}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 pt-3">
          {/* Left Side - Magazine Cover & Details */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-[#F8F6F3] px-10 py-8 lg:p-10 order-1 md:order-0">
            <div className="flex flex-col items-center lg:items-start ">
              <div className="top_content w-full pb-6 md:pb-8">
                {badge && (
                  <div className="mb-2 text-center w-full">
                    <span className="text-tertiar text-sm font-semibold tracking-wider">
                      {badge}
                    </span>
                  </div>
                )}

                {issueDate && (
                  <h3 className="w-full text-center text-[20px] font-heading text-primary mb-2">
                    {issueDate}
                  </h3>
                )}

                {coverImage && (
                  <div className="mb-3 w-full shadow-2xl overflow-hidden">
                    <Image
                      src={urlForImage(coverImage)!.url()}
                      alt={`${stegaClean(mainFeature)} Magazine Cover`}
                      width={400}
                      height={550}
                      className="w-full h-auto transform transition-transform duration-300 lg:hover:scale-110"
                    />
                  </div>
                )}

                {volumeInfo && (
                  <p className="w-full text-xs text-center text-gray-500 tracking-wider">
                    {volumeInfo}
                  </p>
                )}
              </div>

              <div className="bottom_content w-full text-center">
                {featuredTitle && (
                  <p className="text-[12px] font-semibold text-gray-600 tracking-wider mb-2">
                    {stegaClean(featuredTitle)}
                  </p>
                )}

                {mainFeature && (
                  <h4 className="text-[24px] font-heading text-primary mb-4 pb-4 border-b border-background-gray">
                    {mainFeature}
                  </h4>
                )}

                {features && features.length > 0 && (
                  <ul className="space-y-2 mb-8">
                    {features.map((feature, index) => (
                      <li
                        key={index}
                        className="text-secondary text-[14px] md:text-[16px] mb-4 pb-4 border-b border-background-gray">
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                {buttonText && buttonLink && (
                  <div className="mt-6 md:mt-8 flex justify-center">
                    <AnimatedLink text={buttonText} href={buttonLink} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Hero Image */}
          <div className="col-span-12 md:col-span-6 lg:col-span-8 relative order-0 md:order-1 overflow-hidden">
            {heroImage && (
              <Image
                src={urlForImage(heroImage)!.url()}
                alt="Current Issue Hero"
                width={860}
                height={790}
                className="object-cover w-full h-full transform transition-transform duration-300 lg:hover:scale-110"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentIssue;
