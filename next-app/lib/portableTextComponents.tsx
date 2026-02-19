import Link from "next/link";
import { PortableTextComponents } from "@portabletext/react";
import { stegaClean } from "@sanity/client/stega";

const clean = (value: any): any => {
  if (typeof value === "string") {
    return stegaClean(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => clean(item));
  }

  return value;
};

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 leading-normal">{clean(children)}</p>
    ),
    h1: ({ children }) => (
      <h1 className="mb-6 leading-relaxed">{clean(children)}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-6 leading-relaxed">{clean(children)}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-6 leading-relaxed">{clean(children)}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-6 leading-relaxed">{clean(children)}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="mb-6 leading-relaxed">{clean(children)}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="mb-6 leading-relaxed">{clean(children)}</h6>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mb-6 leading-relaxed">
        {clean(children)}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 leading-relaxed">{clean(children)}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 leading-relaxed">{clean(children)}</ol>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-bold">{clean(children)}</strong>
    ),
    em: ({ children }) => <em className="italic">{clean(children)}</em>,
    underline: ({ children }) => (
      <span className="underline">{clean(children)}</span>
    ),

    link: ({ value, children }) => {
      const target = value?.blank ? "_blank" : undefined;
      const rel = target === "_blank" ? "noopener noreferrer" : undefined;
      const cleanedChildren = clean(children);

      if (value?.href?.startsWith("/") || value?.href?.startsWith("#")) {
        return (
          <Link
            href={value.href}
            target={target}
            rel={rel}
            className="text-tertiary hover:underline">
            {cleanedChildren}
          </Link>
        );
      }

      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-tertiary hover:underline">
          {cleanedChildren}
        </a>
      );
    },

    textColor: ({ children, value }) => (
      <span style={{ color: value?.color }}>{clean(children)}</span>
    ),

    alignment: ({ value, children }) => {
      const align = value?.align || "left";

      const alignClass =
        align === "center"
          ? "text-center"
          : align === "right"
            ? "text-right"
            : "text-left";

      return (
        <span className={`block w-full ${alignClass}`}>{clean(children)}</span>
      );
    },
  },
};
