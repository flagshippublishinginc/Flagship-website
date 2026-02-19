import { ContactUsModule } from "@/types/componentsTypes";
import { PortableText, stegaClean } from "next-sanity";
import { portableTextComponents } from "@/lib/portableTextComponents";
import DynamicCustomForm from "./DynamicCustomForm";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity";

const ContactUsComponent = ({
  leftColumnContent,
  rightColumnContent,
}: ContactUsModule) => {
  const formData = rightColumnContent?.[0];
  const leftColumnContentData = leftColumnContent[0];
  return (
    <section className="py-15 md:pt-0 md:pb-30">
      <div className="container">
        <div className="flex flex-wrap gap-10 items-start">
          <div className="md:w-[calc(45%-20px)] lg:w-[calc(37%-20px)] w-full md:border-r border-background-gray md:pr-6 md:pt-20">
            <div className="border-b border-background-gray">
              <PortableText
                value={leftColumnContentData?.topContent?.content}
                components={portableTextComponents}
              />
            </div>
            <div className="mt-10 md:mt-20 lg:mt-26">
              <PortableText
                value={leftColumnContentData?.bottomContent?.content}
                components={portableTextComponents}
              />
            </div>
            {leftColumnContentData.socialLinks.length > 0 && (
              <div className="border-t border-background-gray mt-6 flex gap-6 lg:gap-9 pt-6 pb-6 lg:pb-12">
                {leftColumnContentData.socialLinks.map((item) => {
                  return (
                    <div key={item._key} className="group">
                      <Link href={item.link}>
                        <Image
                          src={urlForImage(item.icon)!.url()}
                          alt={stegaClean(item.altText)}
                          width={20}
                          height={20}
                          className="group-hover:scale-110 transition-all duration-300"
                        />
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="md:w-[calc(55%-20px)] lg:w-[calc(63%-20px)] w-full md:pt-20">
            <div className="border border-background-gray py-6 px-5 md:py-6 md:px-10">
              <DynamicCustomForm
                rows={formData.formFields.rowLayout}
                formTitle={formData.formTitle}
                formDescription={formData.formDescription}
                formButtonText={formData.formButtonText}
              />
            </div>
            {formData.bottomContent[0].contentItems.length > 0 && (
              <div className="pt-10 lg:pt-14 grid grid-cols-1 gap-8 lg:gap-14">
                {formData.bottomContent[0].contentItems.map((contentItem) => {
                  return (
                    <div key={contentItem._key} className="group">
                      {contentItem.title && (
                        <div className="flex items-center gap-2 pb-4 border-b border-background-gray">
                          {contentItem.iconImage && (
                            <Image
                              src={urlForImage(contentItem.iconImage)!.url()}
                              alt={stegaClean(contentItem.title)}
                              width={20}
                              height={20}
                            />
                          )}
                          <h3 className="font-body font-semibold text-[20px] text-tertiary m-0">
                            {contentItem.title}
                          </h3>
                        </div>
                      )}
                      {contentItem.rowContent.length > 0 && (
                        <div className="flex flex-wrap gap-4 justify-between pt-3">
                          {contentItem.rowContent.map((rowContent) => {
                            return (
                              <div key={rowContent._key} className="group">
                                {rowContent.contentType === "text" && (
                                  <div className="">
                                    {rowContent.label && (
                                      <span className="font-body text-[14px] m-0">
                                        {rowContent.label}
                                      </span>
                                    )}
                                    {rowContent.text && (
                                      <p className="font-body font-semibold text-[18px]  m-0">
                                        {rowContent.text}
                                      </p>
                                    )}
                                  </div>
                                )}
                                {rowContent.contentType === "image" && (
                                  <div className="">
                                    {rowContent.image && (
                                      <Image
                                        src={urlForImage(
                                          rowContent.image,
                                        )!.url()}
                                        alt={stegaClean(
                                          rowContent.imageAltText || "Image",
                                        )}
                                        width={72}
                                        height={72}
                                      />
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsComponent;
