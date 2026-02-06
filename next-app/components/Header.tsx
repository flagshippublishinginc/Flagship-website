"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { urlForImage } from "@/lib/sanity";
import { stegaClean } from "next-sanity";
import { motion, AnimatePresence } from "motion/react";
import {
  childMenuVariants,
  headerMenuBgVariants,
  menuLabelVariants,
} from "@/lib/animation";
import { CgClose } from "react-icons/cg";

interface NavItem {
  _key: string;
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
  hoverIcon?: any;
  image?: any;
  children?: NavItem[];
}

interface HeaderProps {
  data?: {
    logo?: any;
    navLinks?: NavItem[];
  };
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeParentId, setActiveParentId] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleParentToggle = useCallback((id: string) => {
    setActiveParentId((prev) => (prev === id ? null : id));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderLink = (item: NavItem, className = "") => {
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
            alt={stegaClean(item.label)}
            width={20}
            height={20}
            className="inline-block mr-2"
          />
        )}
        <span>{stegaClean(item.label)}</span>
      </Link>
    );
  };

  return (
    <header className={`relative z-40 border-b border-gray text-primary pt-5`}>
      <div className="header-container flex items-center justify-between">
        {/* Logo */}
        <div className="logo">
          <Link href="/">
            <Image
              src={
                data?.logo
                  ? urlForImage(data.logo)?.url() || ""
                  : "/maui-logo.svg"
              }
              alt="MAUI"
              width={153}
              height={48}
              priority
            />
          </Link>
          <p className="text-[10px] uppercase font-bold mt-1 tracking-wider opacity-70">
            Maui's Magazine Since 1996
          </p>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden lg:flex gap-6">
            {data?.navLinks?.map((item) => (
              <div key={item._key} className="relative group">
                {renderLink(
                  item,
                  "text-[14px] font-bold uppercase tracking-widest py-4 flex items-center hover:text-tertiary",
                )}

                {item.children?.length && (
                  <div className="absolute left-0 top-full hidden group-hover:block min-w-[200px] shadow-lg">
                    <div className="bg-tertiary text-white p-4 flex flex-col gap-3">
                      {item.children.map((child) => (
                        <Link
                          key={child._key}
                          href={
                            child.link?.type === "external"
                              ? child.link.external || "#"
                              : child.link?.internal?.slug
                                ? `/${child.link.internal.slug}`
                                : "#"
                          }
                          className="text-[13px] font-bold uppercase tracking-wider hover:underline">
                          {stegaClean(child.label)}
                        </Link>
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
              {" "}
              1{" "}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence initial={false}>
        {isMobile && (
          <div
            ref={mobileMenuRef}
            className="fixed bottom-0 left-0 w-full bg-primary/30  z-50">
            <nav className="p-6 relative z-50 bg-white shadow-[0px_-8px_11px_0px_#3C3C3C12]">
              <ul className="flex justify-between">
                {data?.navLinks?.map((item) => {
                  const isActive = activeParentId === item._key;

                  return (
                    <li
                      key={item._key}
                      onClick={() => handleParentToggle(item._key)}
                      className="cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Image
                          src={
                            urlForImage(
                              isActive ? item.hoverIcon : item.icon,
                            )?.url() || ""
                          }
                          alt={stegaClean(item.label)}
                          width={24}
                          height={24}
                        />

                        {isActive && (
                          <motion.span
                            variants={menuLabelVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="text-tertiary font-medium">
                            {stegaClean(item.label)}
                          </motion.span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <AnimatePresence>
              {activeParentId &&
                (() => {
                  const activeItem = data?.navLinks?.find(
                    (item) => item._key === activeParentId,
                  );
                  if (!activeItem?.children?.length) return null;

                  return (
                    <motion.div
                      key={`child-menu-${activeParentId}`}
                      variants={childMenuVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="fixed left-0 w-full z-40">
                      <div className="flex justify-end pb-4 pr-4">
                        <button
                          className="p-[18px] bg-primary/12 rounded-[8px] cursor-pointer backdrop-blur-sm"
                          onClick={() => setActiveParentId(null)}>
                          <CgClose width={24} height={24} color="#ffffff" />
                        </button>
                      </div>
                      <ul className="py-10 px-4 bg-white">
                        {activeItem.children.map((child) => (
                          <li
                            key={child._key}
                            className="not-last:pb-6 not-last:border-b border-background-gray not-first:pt-6">
                            <Link
                              href={
                                child.link?.type === "external"
                                  ? child.link.external!
                                  : `/${child.link?.internal?.slug || ""}`
                              }
                              className="block text-primary font-bold uppercase"
                              onClick={() => setActiveParentId(null)}>
                              {stegaClean(child.label)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })()}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {activeParentId && (
          <motion.div
            variants={headerMenuBgVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={() => setActiveParentId(null)}
            className="fixed inset-0 bg-primary/30 z-40"
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default React.memo(Header);
