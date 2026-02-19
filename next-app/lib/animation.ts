import type { Variants } from "motion/react";

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
