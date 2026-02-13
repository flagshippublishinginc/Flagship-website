import Link from "next/link";
import { PortableTextComponents } from "@portabletext/react";

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    h1: ({ children }) => <h1 className="mb-6 leading-relaxed">{children}</h1>,
    h2: ({ children }) => <h2 className="mb-6 leading-relaxed">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-6 leading-relaxed">{children}</h3>,
    h4: ({ children }) => <h4 className="mb-6 leading-relaxed">{children}</h4>,
    h5: ({ children }) => <h5 className="mb-6 leading-relaxed">{children}</h5>,
    h6: ({ children }) => <h6 className="mb-6 leading-relaxed">{children}</h6>,
    blockquote: ({ children }) => (
      <blockquote className="mb-6 leading-relaxed">{children}</blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 leading-relaxed">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 leading-relaxed">{children}</ol>
    ),
  },

  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,

    link: ({ value, children }) => {
      const target = value?.blank ? "_blank" : undefined;
      const rel = target === "_blank" ? "noopener noreferrer" : undefined;

      if (value?.href?.startsWith("/") || value?.href?.startsWith("#")) {
        return (
          <Link
            href={value.href}
            target={target}
            rel={rel}
            className="text-tertiary hover:underline">
            {children}
          </Link>
        );
      }

      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-tertiary hover:underline">
          {children}
        </a>
      );
    },

    textColor: ({ children, value }) => (
      <span style={{ color: value?.color }}>{children}</span>
    ),

    alignment: ({ value, children }) => {
      const align = value?.align || "left";
      return <span className={`block w-full text-${align}`}>{children}</span>;
    },
  },
};
