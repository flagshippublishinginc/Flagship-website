import type { Variants } from "motion/react";
import { animate } from "motion/react-client";

export const containerVariants: Variants = {
  initial: {},
  hover: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

export const hoverVariants: Variants = {
  initial: {
    y: 0,
    opacity: 1,
  },
  hover: {
    y: -25,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const wordVariants: Variants = {
  initial: {
    y: 25,
    opacity: 0,
  },
  hover: {
    y: -25,
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const SubscribeTextVariants: Variants = {
  initial: {
    y: -100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const accordionVariants = {
  closed: { height: 0, opacity: 0 },
  open: { height: "auto", opacity: 1 },
  transition: {
    duration: 0.4,
    ease: [0.4, 0, 0.2, 1],
  },
};

export const headerMenuBgVariants: Variants = {
  closed: {
    opacity: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  open: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

export const menuLabelVariants: Variants = {
  initial: {
    opacity: 0,
    x: -24,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 24,
      mass: 0.9,
    },
  },
  exit: {
    opacity: 0,
    x: -24,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 24,
      mass: 0.9,
    },
  },
};

export const childMenuVariants: Variants = {
  initial: {
    opacity: 0,
    bottom: 0,
    visibility: "hidden",
    transition: { duration: 0.25, ease: "easeOut" },
  },
  animate: {
    opacity: 1,
    bottom: 72,
    visibility: "visible",
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

export const listVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

export const listItemVariants: Variants = {
  initial: {
    opacity: 0,
    y: -30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const headerListVariants: Variants = {
  initial: {
    scale: 0.2,
    opacity: 0,
    y: 12,
  },
  animate: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 360,
      damping: 16,
      bounce: 0.55,
      delay: 0.3,
    },
  },
};

export const introWithImagesTextVariants: Variants = {
  initial: {
    opacity: 0,
    x: -50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.3,
    },
  },
};

export const introWithImagesImageContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.3,
      staggerDirection: -1,
      delayChildren: 0.3,
    },
  },
};

export const introWithImagesImageVariants: Variants = {
  initial: {
    opacity: 0,
    x: 50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 360,
      damping: 16,
      bounce: 0.55,
    },
  },
};

export const bannerWithBottomContentHeroTextContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.3,
    },
  },
};

export const bannerWithBottomContentHeroTextVariants: Variants = {
  initial: {
    y: -100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const bannerWithBottomContentImageVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.5,
    },
  },
};

export const bannerWithBottomContentTextVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.5,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 14,
      bounce: 0.4,
      delay: 1.3,
    },
  },
};

export const miniGalleryContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.3,
    },
  },
};

export const miniGalleryHeadingVariants: Variants = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const miniGalleryImageVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.4,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.5,
    },
  },
};

export const teamMembersContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

export const fadeInTitle: Variants = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const teamMembersCardVariants: Variants = {
  initial: {
    opacity: 0,
    y: 40,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 0.4,
    },
  },
};

export const ctaCardSectionVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.3,
    },
  },
};

export const ctaCardVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.5,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 0.4,
    },
  },
};

export const parentContainerVarient: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.3,
    },
  },
};

export const imageFadeInVarient: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const textFromRightVarient: Variants = {
  initial: {
    opacity: 0,
    x: 50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const textFromLeftSpringVarient: Variants = {
  initial: {
    opacity: 0,
    x: -50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 12,
      mass: 0.8,
    },
  },
};

export const textFromRightSpringVarient: Variants = {
  initial: {
    opacity: 0,
    x: 50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 12,
      mass: 0.8,
    },
  },
};

export const contentFromTopVarient: Variants = {
  initial: {
    opacity: 0,
    y: -50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const contentFromBottomVarient: Variants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const contentFromLeftVarient: Variants = {
  initial: {
    opacity: 0,
    x: -50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const contentFromRightVarient: Variants = {
  initial: {
    opacity: 0,
    x: 50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const contentScaleUpVarient: Variants = {
  initial: {
    opacity: 0,
    scale: 0.5,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};
