"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import slugify from "slugify";
import type { Variants } from "motion/react";

export type TocItem = {
  id: string;
  text: string;
};

const dropdownVariants: Variants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.25, ease: "easeInOut" },
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

function TableOfContents({
  elementClassName,
  classNames,
}: {
  elementClassName?: string;
  classNames?: string;
}) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll(`.${elementClassName} h2`),
    ) as HTMLHeadingElement[];
    const items: TocItem[] = headings.map((heading) => {
      let id = heading.id;
      if (!id) {
        id = slugify(heading.textContent || "", { lower: true, strict: true });
        heading.id = id;
      }
      return { id, text: heading.textContent || "" };
    });
    setToc(items);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (toc.length < 1) return null;

  return (
    <nav className={`toc ${classNames}`}>
      <button
        type="button"
        onClick={() => isMobile && setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between text-[14px] text-tertiary ${
          isMobile ? "cursor-pointer" : "cursor-default"
        }`}>
        <span>Table of Contents</span>

        {isMobile && (
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g strokeWidth="0" />
              <g strokeLinecap="round" strokeLinejoin="round" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.707 14.707a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 1.414-1.414L12 12.586l4.293-4.293a1 1 0 1 1 1.414 1.414z"
                fill="currentColor"
                className="text-tertiary"
              />
            </svg>
          </motion.span>
        )}
      </button>

      {(!isMobile || isOpen) && (
        <AnimatePresence initial={false}>
          <motion.ul
            className="pt-4 overflow-hidden"
            key="toc-list"
            variants={dropdownVariants}
            initial="closed"
            animate="open"
            exit="closed">
            {toc.map((item) => (
              <li
                key={item.id}
                className="py-4 last:pb-0 border-t border-background-gray">
                <a
                  href={`#${item.id}`}
                  onClick={() => {
                    setActiveId(item.id);
                    if (isMobile) setIsOpen(false);
                  }}
                  className={`toc-link ${
                    activeId === item.id ? "text-tertiary" : ""
                  }`}>
                  {item.text}
                </a>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      )}
    </nav>
  );
}

export default TableOfContents;
