import { urlForImage } from "@/lib/sanity";
import { TwoColumnTextWithImageModule } from "@/types/blogModules";
import { PortableText, stegaClean } from "next-sanity";
import Image from "next/image";
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

const TwoColumnTextWithImage = ({
  textColumn,
  image,
  imageAltText,
}: TwoColumnTextWithImageModule) => {
  if (!textColumn || !image || !imageAltText) return null;
  return (
    <div className="flex flex-wrap items-center gap-6 lg:gap-8 py-2 lg:py-4">
      <div className="w-full md:w-[calc(75%-16px)] order-2 md:order-1 prose prose-p:mb-2 prose-p:text-[14px]">
        <PortableText value={textColumn} components={components} />
      </div>
      <div className="w-full md:w-[calc(25%-16px)] order-1 md:order-2">
        <Image
          src={urlForImage(image)!.url()}
          alt={stegaClean(imageAltText)}
          width={195}
          height={202}
        />
      </div>
    </div>
  );
};

export default TwoColumnTextWithImage;
