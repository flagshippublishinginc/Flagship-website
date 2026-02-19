import { PortableText } from "next-sanity";
import { RichTextModule } from "@/types/componentsTypes";
import Link from "next/link";

const components = {
  block: {
    normal: ({ children }: any) => {
      return <p className="mb-4 leading-relaxed">{children}</p>;
    },
    h1: ({ children }: any) => {
      return <h1 className="mb-6 leading-relaxed text-tertiary">{children}</h1>;
    },
    h2: ({ children }: any) => {
      return <h2 className="mb-6 leading-relaxed text-tertiary">{children}</h2>;
    },
    h3: ({ children }: any) => {
      return <h3 className="mb-6 leading-relaxed text-tertiary">{children}</h3>;
    },
    h4: ({ children }: any) => {
      return <h4 className="mb-6 leading-relaxed text-tertiary">{children}</h4>;
    },
    h5: ({ children }: any) => {
      return <h5 className="mb-6 leading-relaxed text-tertiary">{children}</h5>;
    },
    h6: ({ children }: any) => {
      return <h6 className="mb-6 leading-relaxed text-tertiary">{children}</h6>;
    },
    blockquote: ({ children }: any) => {
      return (
        <blockquote className="mb-6 leading-relaxed text-tertiary">
          {children}
        </blockquote>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => {
      return <ul className="mb-6 leading-relaxed">{children}</ul>;
    },
    number: ({ children }: any) => {
      return <ol className="mb-6 leading-relaxed">{children}</ol>;
    },
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    underline: ({ children }: any) => (
      <span className="underline">{children}</span>
    ),

    link: ({ value, children }: any) => {
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
    textColor: ({ children, value }: any) => {
      return <span style={{ color: value?.color }}>{children}</span>;
    },
    alignment: ({ value, children }: any) => {
      const align = value?.align || "left";
      return <span className={`block w-full text-${align}`}>{children}</span>;
    },
  },
};

const RichText: React.FC<RichTextModule> = ({ content, className }: any) => {
  return (
    <section className={`section-spacing ${className}`}>
      <div className="container">
        <div className="richText_wrapper w-full max-w-full">
          <PortableText value={content} components={components} />
        </div>
      </div>
    </section>
  );
};

export default RichText;
