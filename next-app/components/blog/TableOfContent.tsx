"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import slugify from "slugify";

export type TocItem = {
  id: string;
  text: string;
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

    const items = headings.map((heading) => {
      let id = heading.id;
      if (!id) {
        id = slugify(heading.textContent || "", {
          lower: true,
          strict: true,
        });
        heading.id = id;
      }
      return { id, text: heading.textContent || "" };
    });

    setToc(items);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (!toc.length) return;

    const headings = toc
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-40px 0px -70% 0px",
        threshold: 0,
      },
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [toc]);

  if (!toc.length) return null;

  return (
    <nav className={`toc ${classNames}`}>
      <button
        type="button"
        onClick={() => isMobile && setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between text-[14px] text-tertiary cursor-pointer">
        <span className="font-semibold">IN THIS ARTICLE</span>

        {isMobile && (
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              {" "}
              <g strokeWidth="0" />{" "}
              <g strokeLinecap="round" strokeLinejoin="round" />{" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.707 14.707a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 1.414-1.414L12 12.586l4.293-4.293a1 1 0 1 1 1.414 1.414z"
                fill="currentColor"
                className="text-tertiary"
              />{" "}
            </svg>
          </motion.span>
        )}
      </button>

      <AnimatePresence initial={false}>
        {(!isMobile || isOpen) && (
          <motion.ul
            key="toc"
            layout
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3 },
              opacity: { duration: 0.2 },
            }}
            className="overflow-hidden pt-4">
            {toc.map((item) => (
              <li
                key={item.id}
                className="py-4 last:pb-0 border-t border-background-gray">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();

                    const el = document.getElementById(item.id);
                    if (!el) return;

                    if (isMobile) {
                      setIsOpen(false);
                    }
                    setTimeout(() => {
                      el.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                      setActiveId(item.id);
                    }, 150);
                  }}
                  className={`toc-link font-heading ${
                    activeId === item.id ? "text-tertiary" : ""
                  }`}>
                  {item.text}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default TableOfContents;
