import { PortableText } from "next-sanity";

const RichText: React.FC<{ richText: any }> = ({ richText }) => {
  return (
    <section className="rich-text section-spacing">
      <div className="container">
        <div className="richText_wrapper w-full max-w-full prose prose-p:mb-2">
          <PortableText value={richText} />
        </div>
      </div>
    </section>
  );
};

export default RichText;
