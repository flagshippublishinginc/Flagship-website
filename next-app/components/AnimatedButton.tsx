import * as motion from "motion/react-client";
import {
  containerVariants,
  hoverVariants,
  wordVariants,
} from "../lib/animation";

const AnimatedButton = ({ text, href }: { text: string; href: string }) => {
  const words = text.split(" ");
  return (
    <div className="flex">
      <motion.a
        href={href}
        variants={containerVariants}
        initial="initial"
        whileHover="hover"
        className="grid grid-cols-1 overflow-hidden font-medium hover:text-tertiary border-2 pb-5 pt-2.5 px-6 md:px-16 h-[45px] hover:border-tertiary transition duration-300 bg-inherit">
        <span className=" inline-flex">
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={hoverVariants}
              className="block ">
              {word}
              {index < words.length - 1 && "\u00A0"}
            </motion.span>
          ))}
        </span>
        <span className=" inline-flex">
          {words.map((word, index) => (
            <motion.span key={index} variants={wordVariants} className="block">
              {word}
              {index < words.length - 1 && "\u00A0"}
            </motion.span>
          ))}
        </span>
      </motion.a>
    </div>
  );
};

export default AnimatedButton;
