import { CtaBannerModule } from "@/types/componentsTypes";
import AnimatedButton from "../AnimatedButton";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity";
import { stegaClean } from "next-sanity";

const CtaBanner: React.FC<CtaBannerModule> = ({
  buttonLink,
  buttonText,
  title,
  description,
  image,
}) => {
  return (
    <section className="section-spacing max-w-5xl bg-background-category px-6 py-6 lg:py-14 lg:px-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-6">
      <div>
        {title && <h2 className="text-tertiary">{stegaClean(title)}</h2>}
        {description && (
          <p className="text-secondary mt-6">{stegaClean(description)}</p>
        )}
        <div className="mt-6 bg-white w-fit">
          <AnimatedButton text={stegaClean(buttonText)} href={buttonLink} />
        </div>
      </div>
      <div className="flex justify-center">
        <Image
          src={urlForImage(image)!.url()}
          alt={stegaClean(title)}
          width={373}
          height={267}
        />
      </div>
    </section>
  );
};

export default CtaBanner;
