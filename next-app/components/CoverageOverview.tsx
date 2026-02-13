import { urlForImage } from "@/lib/sanity";
import { CoverageOverviewModule } from "@/types/componentsTypes";
import { stegaClean } from "next-sanity";
import Image from "next/image";
import * as motion from "motion/react-client";
import {
  listVariants,
  listItemVariants,
  headerListVariants,
} from "@/lib/animation";

const CoverageOverview = ({
  heading,
  headingBackgroundColor,
  headingColor,
  title,
  titleHighlight,
  listItems,
}: CoverageOverviewModule) => {
  return (
    <section className="section-spacing overflow-hidden">
      <div className="container">
        <div className="flex flex-wrap gap-[30px] lg:gap-[56px] align-center">
          <div
            className="w-full md:w-[calc(50%-15px)] lg:w-[calc(60%-28px)] px-4 py-14 flex items-center justify-center"
            style={{
              backgroundColor: stegaClean(headingBackgroundColor),
              color: stegaClean(headingColor),
            }}>
            <motion.h3
              className="text-center max-w-[500px] italic md:text-[28px]"
              variants={headerListVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.5 }}>
              {stegaClean(heading)}
            </motion.h3>
          </div>
          <div className="w-full md:w-[calc(50%-15px)] lg:w-[calc(40%-28px)]">
            <h2>
              {stegaClean(title)}{" "}
              {titleHighlight && (
                <span className="text-tertiary">
                  {stegaClean(titleHighlight)}
                </span>
              )}
            </h2>
            <motion.ul
              className="mt-6 md:mt-10"
              variants={listVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.5 }}>
              {listItems?.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-6 px-4 py-6 md:p-6 border-t border-background-gray"
                  variants={listItemVariants}>
                  <Image
                    src={urlForImage(item.iconImage)!.url()}
                    alt={stegaClean(item.text)}
                    width={24}
                    height={24}
                  />
                  <p className="font-semibold">{item.text}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageOverview;
