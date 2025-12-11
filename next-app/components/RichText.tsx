import { PortableText } from "next-sanity";

const RichText = ({ richText }: { richText: any }) => {
  return (
    <section className="rich-text">
      <div className="container">
        <div className="richText_wrapper px-4 w-full max-w-full prose prose-p:mb-2">
          <PortableText value={richText} />
        </div>
      </div>
    </section>
  );
};

export default RichText;
