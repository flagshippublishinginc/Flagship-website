"use client";

import { NestedFaqModuleType } from "@/types/componentsTypes";
import { GoDash, GoPlus } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { accordionVariants } from "@/lib/animation";

const NestedFaqModule: React.FC<NestedFaqModuleType> = ({ faqs }) => {
  const [openParent, setOpenParent] = useState<string | null>(null);
  const [openChild, setOpenChild] = useState<string | null>(null);

  const parentHandler = useCallback((id: string) => {
    setOpenParent((prev) => (prev === id ? null : id));
    setOpenChild(null);
  }, []);

  const childHandler = useCallback((id: string) => {
    setOpenChild((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section className="section-spacing">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 lg:gap-12">
          {faqs?.map((faq) => {
            const isParentOpen = openParent === faq._key;
            return (
              <div key={faq._key} className=" ">
                <button
                  type="button"
                  onClick={() => parentHandler(faq._key!)}
                  className="group flex w-full items-center justify-between py-4 text-left transition-colors hover:text-primary focus:outline-none cursor-pointer border-tertiary border-b">
                  <h3 className="text-[20px] font-semibold">{faq.title}</h3>
                  <motion.span
                    animate={{ rotate: isParentOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl">
                    {isParentOpen ? <GoDash /> : <GoPlus />}
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isParentOpen && (
                    <motion.div
                      variants={accordionVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      transition={{
                        duration: 0.4,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="overflow-hidden"
                      layout>
                      <div className="">
                        {faq.faqs?.map((child) => {
                          const isChildOpen = openChild === child._key;

                          return (
                            <div
                              key={child._key}
                              className="border-b border-[#F3F3F3] py-6 pl-4 pr-6 last:border-b-0">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  childHandler(child._key!);
                                }}
                                className="group flex w-full items-center justify-between text-left transition-colors hover:text-primary focus:outline-none cursor-pointer">
                                <h4 className="font-body font-semibold leading-relaxed">
                                  {child.question}
                                </h4>
                                <motion.span
                                  animate={{ rotate: isChildOpen ? 180 : 0 }}
                                  transition={{ duration: 0.35 }}
                                  className="text-lg text-tertiary">
                                  <IoIosArrowDown />
                                </motion.span>
                              </button>

                              <AnimatePresence initial={false}>
                                {isChildOpen && (
                                  <motion.div
                                    variants={accordionVariants}
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                    transition={{
                                      duration: 0.4,
                                      ease: [0.4, 0, 0.2, 1],
                                    }}
                                    className="overflow-hidden"
                                    layout>
                                    <div className="pt-2">{child.answer}</div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NestedFaqModule;
