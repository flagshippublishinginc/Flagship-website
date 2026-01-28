import { urlForImage, urlForFile } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import AnimatedButton from "./AnimatedButton";
import { ActivitiesModule as ActivitiesModuleProps } from "@/types/componentsTypes";
import { stegaClean } from "@sanity/client/stega";

const ActivitiesModule: React.FC<ActivitiesModuleProps> = ({
  leadArticle,
  sidebarArticles,
  headingHighlight,
  headingText,
  buttonText,
  ButtonUrl,
}) => {
  return (
    <section className="section-spacing">
      <div className="container">
        <div className="section_title pb-3 mx-[-12px] lg:mx-0 border-b border-background-gray">
          <h2 className="font-heading px-3">
            {headingText}
            <span className="text-tertiary"> {headingHighlight}</span>
          </h2>
        </div>
        <div className="flex flex-wrap border-b border-background-gray">
          <div className="leadArticle-item w-full lg:w-[60%] border-b lg:border-b-0 md:border-r border-background-gray">
            <div className="py-3 md:p-6">
              {leadArticle && (
                <div className="imageContent mb-4">
                  {leadArticle.mediaType === "image" && (
                    <Link
                      href={leadArticle.readLink}
                      className="block overflow-hidden">
                      <Image
                        src={urlForImage(leadArticle.image)!.url()}
                        alt={stegaClean(leadArticle.title)}
                        width={820}
                        height={800}
                        style={{ width: "100%", height: "auto" }}
                        className="w-full h-auto object-cover transform transition-transform duration-300 lg:hover:scale-110"
                      />
                    </Link>
                  )}
                  {leadArticle.mediaType === "video" && (
                    <video
                      src={urlForFile(leadArticle.video) || ""}
                      width={820}
                      height={800}
                      autoPlay={true}
                      playsInline={true}
                      muted={true}
                      loop={true}
                      style={{ width: "100%", height: "auto" }}
                    />
                  )}
                </div>
              )}
              <div className="textContent">
                {leadArticle.title && (
                  <h2 className="font-heading mb-4">
                    <Link href={leadArticle.readLink}>{leadArticle.title}</Link>
                  </h2>
                )}
                {leadArticle.description && (
                  <p className="text-secondary mb-0 line-clamp-2">
                    {leadArticle.description}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="sidebarArticles-item w-full lg:w-[40%]">
            {sidebarArticles.map((article, index) => {
              return (
                <div
                  key={index}
                  className="py-3 md:p-6 grid grid-cols-[4fr_6fr] md:grid-cols-[3fr_7fr] items-center md:items-start lg:grid-cols-2 gap-4 not-first:border-t border-background-gray">
                  {article.image && (
                    <div className="imageContent w-full ">
                      <Link
                        className="group block overflow-hidden"
                        href={article.readLink}>
                        <Image
                          src={urlForImage(article.image)?.url() || ""}
                          alt={stegaClean(article.title)}
                          width={820}
                          height={800}
                          className="w-full h-auto md:h-auto object-cover transform transition-transform duration-300 lg:group-hover:scale-110"
                        />
                      </Link>
                    </div>
                  )}
                  <div className="textContent flex flex-col justify-center  md:pl-0 ">
                    {article.title && (
                      <h5 className="font-heading mb-2 md:mb-4 text-sm md:text-base leading-tight">
                        <Link
                          href={article.readLink}
                          className="hover:underline">
                          {article.title}
                        </Link>
                      </h5>
                    )}
                    {article.description && (
                      <p className="text-secondary text-[13px] md:text-[14px] m-0 leading-relaxed line-clamp-2">
                        {stegaClean(article.description)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {buttonText && ButtonUrl && (
          <div className="flex justify-center mt-8 md:mt-14">
            <Link href={ButtonUrl}>
              <AnimatedButton text={buttonText} href={ButtonUrl} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ActivitiesModule;
