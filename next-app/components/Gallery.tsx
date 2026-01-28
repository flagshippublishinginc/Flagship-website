import { GalleryModule } from "@/types/componentsTypes";
import AnimatedButton from "./AnimatedButton";
import { stegaClean } from "next-sanity";
import { urlForImage } from "@/lib/sanity";

const LAYOUT = [
  { col: "md:col-span-2", row: "md:row-span-3" },
  { col: "md:col-span-2", row: "md:row-span-2" },
  { col: "md:col-span-1" },
  { col: "md:col-span-1" },
  { col: "md:col-start-4 md:col-end-6" },
  { col: "md:col-span-2", row: "md:row-span-3" },
  { col: "md:col-start-3", row: "md:row-start-3 md:row-span-3" },
  { col: "md:col-start-3", row: "md:row-start-6 md:row-span-1" },
  { col: "md:col-span-2", row: "md:row-span-3" },
];

const Gallery: React.FC<GalleryModule> = ({
  headingText,
  headingHighlight,
  galleryItems,
  buttonText,
  buttonLink,
}) => {
  return (
    <section className="section-spacing">
      <div className="container">
        {headingText || headingHighlight ? (
          <div className="section_title mx-[-12px] lg:mx-0 pb-3 border-b border-background-gray">
            <h2 className="font-heading px-3">
              {headingText}{" "}
              <span className="text-tertiary">{headingHighlight}</span>
            </h2>
          </div>
        ) : (
          ""
        )}

        <div className=" pt-3">
          <div className="grid grid-cols lg:grid-cols-5 lg:grid-row-6 gap-2 md:gap-4 lg:gap-col-6 lg:gap-row-5">
            {galleryItems?.map((item, index) => {
              const layout = LAYOUT[index] ?? {};
              return (
                <div
                  key={item._key}
                  className={`${layout.col ?? ""} ${layout.row ?? ""} ${item.itemType == "image" ? "order-1" : "order-0"}`}>
                  {item.itemType == "image" && (
                    <div className="flex items-center justify-center h-full relative group overflow-hidden ">
                      <img
                        src={urlForImage(item.image)?.url()}
                        alt={
                          stegaClean(item.title) || `Gallery Image ${index + 1}`
                        }
                        className="w-full h-full object-cover transform transition-transform duration-300 lg:group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 sm:group-hover:opacity-20 transition-opacity duration-300 ease-in-out"></div>
                      {item.title && item.location && (
                        <div className="absolute w-full -bottom-full sm:group-hover:bottom-0 transition-all duration-400 ease-in-out px-6 pb-4">
                          <div className="flex items-center flex-col gap-4 lg:gap-14 justify-center text-center w-full bg-white mx-auto py-4 lg:py-14 px-4">
                            <h3 className="text-tertiary text-[20px] lg:text-[32px]">
                              {stegaClean(item.title)}
                            </h3>
                            <div className="textContent text-[12px] lg:text-[16px]">
                              <p>{stegaClean(item.location)}</p>
                              <p className="mt-1">
                                {stegaClean(item.photoCredit)}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {item.itemType == "text" && (
                    <div className="flex items-center justify-center h-full">
                      <h3 className="text-tertiary text-[24px] lg:text-[32px] text-center">
                        {item?.textContent}
                      </h3>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {buttonText && buttonLink && (
          <div className="mt-6 md:mt-14 flex justify-center">
            <AnimatedButton text={buttonText} href={buttonLink} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
