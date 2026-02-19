import { SimpleBannerModule } from "@/types/componentsTypes";
import { stegaClean } from "next-sanity";
import AnimatedButton from "./AnimatedButton";

const SimpleBanner = ({
  title,
  titleHighlight,
  description,
  buttonText,
  buttonLink,
  contentAlignment,
}: SimpleBannerModule) => {
  return (
    <section className="section-spacing">
      <div className="container">
        <div className={`inner text-${stegaClean(contentAlignment)}`}>
          {title && (
            <h1>
              {stegaClean(title)}{" "}
              {titleHighlight && (
                <span className="text-tertiary">
                  {stegaClean(titleHighlight)}
                </span>
              )}
            </h1>
          )}
          {description && (
            <p className="mt-6 md:mt-10">{stegaClean(description)}</p>
          )}
          {buttonText && buttonLink && (
            <div
              className={`mt-6 md:mt-10 flex ${
                stegaClean(contentAlignment) === "left"
                  ? "justify-start"
                  : stegaClean(contentAlignment) === "right"
                    ? "justify-end"
                    : "justify-center"
              }`}>
              <AnimatedButton text={buttonText} href={buttonLink} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SimpleBanner;
