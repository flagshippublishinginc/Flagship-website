import { urlForImage } from "@/lib/sanity";
import Image from "next/image";
import AnimatedLink from "./AnimatedLink";
import { CurrentIssueModule } from "@/types/homeModules";

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
}) => {
  return (
    <section className="section-spacing bg-background-light">
      <div className="container">
        <div className="section_title pb-6">
          <h2 className="font-heading text-primary">
            Current <span className="text-tertiary">Issue</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Magazine Cover & Details */}
          <div className="flex flex-col items-center lg:items-start">
            {badge && (
              <div className="mb-4">
                <span className="inline-block px-4 py-1 bg-tertiary text-white text-sm font-semibold tracking-wider">
                  {badge}
                </span>
              </div>
            )}

            {issueDate && (
              <h3 className="text-2xl font-heading text-primary mb-6">
                {issueDate}
              </h3>
            )}

            {coverImage && (
              <div className="mb-6 w-full max-w-[300px] shadow-2xl">
                <Image
                  src={urlForImage(coverImage)!.url()}
                  alt={`${issueDate} Magazine Cover`}
                  width={400}
                  height={550}
                  className="w-full h-auto"
                />
              </div>
            )}

            {volumeInfo && (
              <p className="text-xs text-gray-500 tracking-wider mb-6">
                {volumeInfo}
              </p>
            )}

            {featuredTitle && (
              <p className="text-sm font-semibold text-gray-600 tracking-wider mb-2">
                {featuredTitle}
              </p>
            )}

            {mainFeature && (
              <h4 className="text-4xl font-heading text-primary mb-4">
                {mainFeature}
              </h4>
            )}

            {features && features.length > 0 && (
              <ul className="space-y-2 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="text-secondary text-sm">
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            {buttonText && buttonLink && (
              <div className="mt-4">
                <AnimatedLink text={buttonText} href={buttonLink} />
              </div>
            )}
          </div>

          {/* Right Side - Hero Image */}
          <div className="relative h-[400px] lg:h-[600px] overflow-hidden rounded-lg shadow-2xl">
            {heroImage && (
              <Image
                src={urlForImage(heroImage)!.url()}
                alt="Current Issue Hero"
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentIssue;
