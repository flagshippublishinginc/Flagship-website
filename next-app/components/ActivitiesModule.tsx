import { ActivitiesModuleInterface } from "@/lib/interfaces";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";

const ActivitiesModule: React.FC<ActivitiesModuleInterface> = ({
  leadArticle,
  sidebarArticles,
  headingHighlight,
  headingText,
}) => {
  return (
    <section className="section-spacing">
      <div className="container">
        <div className="section_title pb-3">
          <h2 className="font-heading">
            {headingText}
            <span className="text-tertiary"> {headingHighlight}</span>
          </h2>
        </div>
        <div className="flex flex-wrap mx-[-16px] lg:mx-[-32px]  border-b border-t border-background-gray">
          <div className="leadArticle-item w-full  lg:w-[60%] border-b lg:border-b-0 md:border-r border-background-gray">
            <div className="p-4 md:p-6">
              {leadArticle.image && (
                <div className="imageContent mb-4">
                  <Image
                    src={urlFor(leadArticle.image).url()}
                    alt={leadArticle.title}
                    width={820}
                    height={800}
                  />
                </div>
              )}
              <div className="textContent">
                {leadArticle.title && (
                  <h2 className="font-heading mb-4">{leadArticle.title}</h2>
                )}
                {leadArticle.description && (
                  <p className="text-secondary mb-6">
                    {leadArticle.description}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="sidebarArticles-item w-full  lg:w-[40%]">
            {sidebarArticles.map((article, index) => {
              const updatedDescription =
                article.description.slice(0, 75) + "...";
              return (
                <div
                  key={index}
                  className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-4 not-first:border-t border-background-gray">
                  {article.image && (
                    <div className="imageContent">
                      <Image
                        src={urlFor(article.image).url()}
                        alt={article.title}
                        width={820}
                        height={800}
                      />
                    </div>
                  )}
                  <div className="textContent">
                    {article.title && (
                      <h5 className="font-heading mb-4">{article.title}</h5>
                    )}
                    {article.description && (
                      <p className="text-secondary text-[14px]">
                        {updatedDescription}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesModule;
