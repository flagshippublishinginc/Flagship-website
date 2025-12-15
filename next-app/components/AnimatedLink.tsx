import * as motion from "motion/react-client";
import {
  containerVariants,
  hoverVariants,
  wordVariants,
} from "../lib/animation";

const AnimatedLink = ({ text, href }: { text: string; href: string }) => {
  const words = text.split(" ");
  return (
    <div className="flex">
      <motion.a
        href={href}
        variants={containerVariants}
        initial="initial"
        whileHover="animate"
        className="grid grid-cols-1 h-[30px] overflow-hidden font-medium hover:text-tertiary border-b-2 hover:border-tertiary transition duration-300">
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

export default AnimatedLink;
