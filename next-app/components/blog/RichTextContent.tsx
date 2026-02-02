import { PortableText } from "next-sanity";
import { RichTextModule } from "@/types/componentsTypes";
import slugify from "slugify";

const components = {
  block: {
    h2: ({ children }: any) => {
      const text = children?.toString?.() || "";
      const id = slugify(text, { lower: true, strict: true });
      return <h2 id={id}>{text}</h2>;
    },
  },
  marks: {
    textColor: ({ children, value }: any) => {
      return <span style={{ color: value?.color }}>{children}</span>;
    },
  },
};

const RichTextContent = ({ content }: { content: RichTextModule }) => {
  return (
    <div className="rich-text py-2 lg:py-4">
      <div className="">
        <div className="richText_wrapper w-full max-w-full prose prose-p:mb-2 prose-p:text-[14px]">
          <PortableText value={content} components={components} />
        </div>
      </div>
    </div>
  );
};

export default RichTextContent;
