import { urlForImage } from "@/lib/sanity";
import { SingleImageModule } from "@/types/blogModules";
import { stegaClean } from "next-sanity";
import Image from "next/image";

const SingleImage = ({ image, caption, title }: SingleImageModule) => {
  if (!image || !title || !caption) return null;
  return (
    <div className="py-2 lg:py-4">
      <div className="inner_content">
        {title && (
          <h2 className="text-tertiary mb-0! pb-6 lg:pb-8">
            {stegaClean(title)}
          </h2>
        )}
        <Image
          src={urlForImage(image)!.url()}
          alt={stegaClean(title)}
          width={879}
          height={496}
          className="mt-0"
        />
        {caption && (
          <p className="pr-2 mb-0 mt-[6px] text-secondary text-[14px] text-right">
            {stegaClean(caption)}
          </p>
        )}
      </div>
    </div>
  );
};

export default SingleImage;
