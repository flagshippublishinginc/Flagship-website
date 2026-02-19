import { getSanityData } from "@/lib/helpingFunctions";
import { CtaCardSectionModule } from "@/types/componentsTypes";
import { stegaClean } from "next-sanity";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import * as motion from "motion/react-client";
import { ctaCardSectionVariants, ctaCardVariants } from "@/lib/animation";

const CtaCardSection = async ({
  title,
  highlightedText,
  titleTextAlignment,
  ctaCards,
}: CtaCardSectionModule) => {
  return (
    <section className="section-spacing overflow-hidden">
      <div className="container">
        {title && (
          <div>
            <h2
              style={{
                textAlign: `${stegaClean(titleTextAlignment)}` as any,
              }}>
              {title}{" "}
              {highlightedText && (
                <span className="text-tertiary">{highlightedText}</span>
              )}
            </h2>
          </div>
        )}
        {ctaCards && ctaCards.length > 0 && (
          <motion.div
            variants={ctaCardSectionVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex gap-2 flex-wrap justify-center pt-10">
            {ctaCards.map(async (ctaCard) => {
              let link = "";
              let cardLinkType = stegaClean(ctaCard.link.type);
              if (cardLinkType === "internal") {
                const refLinkId = stegaClean(ctaCard.link.internal._ref);
                const pageDataQuery = `*[_id == "${refLinkId}"][0]{ "slug": slug.current, _type, "selectedBlog": select( _type == "post" => selectBlog->{ "slug": slug.current }, null ) }`;
                const pageData = await getSanityData(pageDataQuery);
                const isBlog = pageData._type === "post" ? true : false;
                if (isBlog) {
                  link = `/explore-maui/${pageData.selectedBlog.slug}/${pageData.slug}`;
                } else {
                  link = `/${pageData.slug}`;
                }
              } else {
                link = ctaCard.link.external;
              }

              return (
                <motion.div
                  variants={ctaCardVariants}
                  key={ctaCard._key}
                  className="py-17 px-10 border border-background-gray max-w-[257px] w-full">
                  <div className="text-center">
                    <Link
                      href={link}
                      className="flex items-center justify-center gap-2 text-[20px] text-tertiary font-heading font-bold">
                      {stegaClean(ctaCard.link.label)}
                      <FiArrowUpRight />
                    </Link>
                    <p className="text-secondary mt-4">
                      {stegaClean(ctaCard.description)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CtaCardSection;
