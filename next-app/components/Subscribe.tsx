import * as motion from "motion/react-client";
import Image from "next/image";
import AnimatedButton from "./AnimatedButton";
import { SubscribeTextVariants } from "@/lib/animation";
import { SubscribeModule } from "@/types/homeModules";
import { stegaClean } from "@sanity/client/stega";
import { urlForImage } from "@/lib/sanity";
const images = [
  {
    rotateDegree: 6,
    initialY: -120,
    animateY: -160,
  },
  {
    rotateDegree: -6,
    initialY: 60,
    animateY: 20,
  },
  {
    rotateDegree: 6,
    initialY: 220,
    animateY: 160,
  },
];

const Subscribe: React.FC<SubscribeModule> = ({
  headingHighlight,
  headingText,
  buttonText,
  buttonLink,
  description,
  imageLayout,
  tripleImages,
  singleImage,
}) => {
  const layout = stegaClean(imageLayout);

  return (
    <section
      className={`overflow-hidden  ${layout === "single" ? "" : "pt-40 lg:pt-0"}`}>
      <div className="container">
        <div
          className={`w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center section-spacing  ${
            layout === "single" ? "" : "min-h-screen"
          }`}>
          <div className="image_column w-full grid place-items-center items-center overflow-visible h-full">
            {layout === "single" ? (
              <>
                <motion.div
                  className="col-start-1 row-start-1 w-full flex justify-center"
                  variants={SubscribeTextVariants}
                  initial="initial"
                  whileInView="animate"
                  transition={{ delay: layout === "single" ? 0 : 2 }}
                  style={{ zIndex: 2 }}>
                  <div className="image_inner w-full">
                    <Image
                      src={urlForImage(singleImage)?.url() || ""}
                      alt="MAUI magazine"
                      width={625}
                      height={405}
                      className="w-full"
                    />
                  </div>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  className="col-start-1 row-start-1 w-full flex justify-center"
                  initial={{ y: images[0].initialY, opacity: 0 }}
                  whileInView={{ y: images[0].animateY, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: 0.2,
                  }}
                  style={{ zIndex: 1 }}>
                  <div className="image_inner relative right-[-30px] sm:right-[-60px] lg:right-[-70px] xl:right-[-90px]">
                    <Image
                      src={urlForImage(tripleImages?.image1)?.url() || ""}
                      alt="MAUI magazine"
                      width={296}
                      height={380}
                      className="shadow-[0px_4px_80px_-12px_#00000080] max-h-[300px] w-auto sm:w-none sm:max-h-[380px]"
                      style={{
                        transform: `rotate(${images[0].rotateDegree}deg)`,
                      }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="col-start-1 row-start-1 w-full flex justify-center"
                  initial={{ y: images[1].initialY, opacity: 0 }}
                  whileInView={{ y: images[1].animateY, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: 0.4,
                  }}
                  style={{ zIndex: 2 }}>
                  <div className="image_inner relative left-[-50px] sm:left-[-100px] lg:left-[-70px] xl:left-[-90px]">
                    <Image
                      src={urlForImage(tripleImages?.image2)?.url() || ""}
                      alt="MAUI magazine"
                      width={296}
                      height={380}
                      className="shadow-[0px_4px_80px_-12px_#00000080] max-h-[300px] w-auto sm:max-h-[380px]"
                      style={{
                        transform: `rotate(${images[1].rotateDegree}deg)`,
                      }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="col-start-1 row-start-1 w-full flex justify-center"
                  initial={{ y: images[2].initialY, opacity: 0 }}
                  whileInView={{ y: images[2].animateY, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: 0.6,
                  }}
                  style={{ zIndex: 3 }}>
                  <div className="image_inner relative right-[-40px] sm:right-[-110px] lg:right-[-90px] xl:right-[-130px]">
                    <Image
                      src={urlForImage(tripleImages?.image3)?.url() || ""}
                      alt="MAUI magazine"
                      width={296}
                      height={380}
                      className="shadow-[0px_4px_80px_-12px_#00000080] max-h-[300px] w-auto sm:max-h-[380px]"
                      style={{
                        transform: `rotate(${images[2].rotateDegree}deg)`,
                      }}
                    />
                  </div>
                </motion.div>
              </>
            )}
          </div>

          <div
            className={`w-full ${layout === "single" ? "" : "mt-10 lg:mt-0 pt-40"}`}>
            <motion.div
              variants={SubscribeTextVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: layout === "single" ? 0 : 2 }}>
              <h2 className="text-4xl font-serif text-[#c94a2c]">
                {headingText} <br className="hidden lg:block" />{" "}
                {headingHighlight}
              </h2>
              <p className=" mt-4 lg:mt-10">{description}</p>
              {buttonText && buttonLink && (
                <div className="flex mt-4 lg:mt-14">
                  <AnimatedButton text={buttonText} href={buttonLink} />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
