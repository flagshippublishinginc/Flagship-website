import * as motion from "motion/react-client";
import Image from "next/image";
import AnimatedButton from "./AnimatedButton";
const images = [
  {
    src: "/Frame 111.webp",
    rotateDegree: 6,
    initialY: -120,
    animateY: -160,
  },
  {
    src: "/Frame 110.webp",
    rotateDegree: -6,
    initialY: 60,
    animateY: 20,
  },
  {
    src: "/Frame 109.webp",
    rotateDegree: 6,
    initialY: 220,
    animateY: 160,
  },
];
const listItems = [
  { text: "Dive into Maui life 6 times a year in print and digital" },
  { text: "Stunning immersive photography celebrating Maui's" },
  { text: "Share the aloha spirit! It makes an unforgettable gift" },
];
const Subscribe = () => {
  return (
    <section className="overflow-hidden pt-50 lg:pt-0">
      <div className="container">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center section-spacing min-h-screen ">
          <div className="image_column w-full grid place-items-center items-center overflow-visible h-full">
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
                  src={images[0].src}
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
                  src={images[1].src}
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
                  src={images[2].src}
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
          </div>

          <div className="w-full mt-10 lg:mt-0 pt-40 ">
            <h2 className="text-4xl font-serif text-[#c94a2c]">
              Subscribe & Get <br className="hidden sm:block" /> Print + Digital
              Access
            </h2>
            <ul className="list-disc list-inside pl-5 mt-10 space-y-3">
              {listItems.map((item, index) => (
                <li key={index}>{item.text}</li>
              ))}
            </ul>
            <div className="mt-10">
              <AnimatedButton text="Subscribe Now" href="/subscribe" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
