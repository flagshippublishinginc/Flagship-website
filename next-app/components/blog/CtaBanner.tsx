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
    <section className="section-spacing bg-background-category px-6 py-6 lg:py-14 lg:px-10 grid grid-cols-1 lg:grid-cols-2 items-start gap-6">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
        <AnimatedButton text={buttonText} href={buttonLink} />
      </div>
      <div>
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
