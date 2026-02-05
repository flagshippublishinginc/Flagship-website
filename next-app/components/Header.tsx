"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import { urlForImage } from "@/lib/sanity";
import { stegaClean } from "next-sanity";
import { motion, AnimatePresence } from "motion/react";
import { accordionVariants, headerMenuBgVariants } from "@/lib/animation";

interface NavItem {
  label: string;
  link?: {
    type: "internal" | "external";
    external?: string;
    internal?: {
      slug: string;
      _type: string;
    };
  };
  icon?: any;
  image?: any;
  children?: NavItem[];
}

interface HeaderProps {
  data?: {
    logo?: any;
    navLinks?: NavItem[];
  };
}

const Header = ({ data }: HeaderProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState<string | null>(null);
  const [isChildOpen, setIsChildOpen] = useState<string | null>(null);

  const handleMenuOpen = useCallback((id: string) => {
    setIsMenuOpen((prev) => (prev === id ? null : id));
    setIsChildOpen(null);
  }, []);

  const handleChildOpen = useCallback((id: string) => {
    setIsChildOpen((prev) => (prev === id ? null : id));
    setIsMenuOpen(null);
  }, []);

  console.log("data ", data);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderLink = (item: NavItem, className: string = "") => {
    const href =
      item.link?.type === "external"
        ? item.link.external
        : item.link?.internal?.slug
          ? `/${item.link.internal.slug}`
          : "#";

    return (
      <Link href={href || "#"} className={className}>
        {item.icon && (
          <Image
            src={urlForImage(item.icon)?.url() || ""}
            alt={stegaClean(item.label) || "Icon"}
            width={20}
            height={20}
            className="inline-block mr-2"
          />
        )}
        <span>{stegaClean(item.label)}</span>
        {item.children && item.children.length > 0 && (
          <svg
            className="inline-block ml-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </Link>
    );
  };

  return (
    <header className="header text-primary relative z-50 border-gray border-b">
      <div className="header-container">
        <div className="logo">
          <Link href="/">
            {data?.logo ? (
              <Image
                src={urlForImage(data.logo)?.url() || ""}
                alt="Logo"
                width={153}
                height={48}
                priority
              />
            ) : (
              <Image
                src="/maui-logo.svg"
                alt="MAUI"
                width={153}
                height={48}
                priority
              />
            )}
          </Link>
          <p className="text-[10px] uppercase font-bold mt-1 tracking-wider opacity-70">
            Maui's Magazine Since 1996
          </p>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden lg:flex items-center gap-4 lg:gap-6 xl:gap-8">
            {data?.navLinks?.map((item, index) => (
              <div key={index} className="relative group">
                {renderLink(
                  item,
                  "text-[14px] font-bold uppercase tracking-widest flex items-center hover:text-tertiary py-4",
                )}

                {item.children && item.children.length > 0 && (
                  <div className="absolute left-0 top-full hidden group-hover:block pt-0 w-max min-w-[200px] shadow-lg">
                    <div className="bg-tertiary text-white p-4 flex flex-col gap-3">
                      {item.children.map((child, childIndex) => (
                        <div
                          key={childIndex}
                          className="flex items-center gap-3">
                          {child.image && (
                            <div className="w-12 h-12 relative overflow-hidden shrink-0">
                              <Image
                                src={urlForImage(child.image)?.url() || ""}
                                alt={child.label || `Image for ${child.label}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <Link
                            href={
                              child.link?.type === "external"
                                ? child.link.external || "#"
                                : child.link?.internal?.slug
                                  ? `/${child.link.internal.slug}`
                                  : "#"
                            }
                            className="text-[13px] font-bold uppercase tracking-wider hover:underline whitespace-nowrap hover:text-white">
                            {stegaClean(child.label)}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        )}

        <div className="header-right flex items-center gap-6 font-medium text-[14px] uppercase tracking-widest">
          <div className="header-search flex items-center gap-2 cursor-pointer hover:text-tertiary">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="hidden sm:inline font-bold">Search</span>
          </div>
          <div className="header-cart flex items-center gap-2 cursor-pointer hover:text-tertiary relative">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="absolute -top-1 -right-1 bg-tertiary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              1
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            variants={headerMenuBgVariants}
            initial="close"
            animate="open"
            exit="close"
            className="fixed inset-0 w-full bg-primary/32">
            <div className="flex align-bottom h-full">
              <nav className="p-6 mt-auto w-full bg-white">
                <ul className="m-0 p-0 list-none flex justify-between gap-1">
                  {data?.navLinks?.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => handleMenuOpen(`menu-${index}`)}
                      className="cursor-pointer">
                      <Image
                        src={urlForImage(item.icon)?.url() || ""}
                        alt={stegaClean(item.label) || "Icon"}
                        width={24}
                        height={24}
                        className="inline-block"
                      />
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default React.memo(Header);
