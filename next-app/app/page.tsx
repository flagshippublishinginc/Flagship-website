import {
  HomeBanner,
  RichText,
  ReaderFavourites,
  ActivitiesModule,
} from "@/components";
import { getSanityData } from "@/lib/helpingFunctions";

export default async function Home() {
  const query = `*[_type == "homePage"][0] { modules }`;
  const allData: any = await getSanityData(query);
  return (
    <div className="md:min-h-screen">
      <main>
        <div className="grid grid-cols-1 ">
          {allData.modules.map((module: any, index: number) => {
            if (module._type === "homeBannerModule") {
              return <HomeBanner key={index} modules={module} />;
            }
            if (module._type === "richTextModule") {
              return <RichText key={index} richText={module.content} />;
            }
            if (module._type === "readerFavourites") {
              return (
                <ReaderFavourites
                  key={index}
                  articles={module.articles}
                  headingText={module.headingText}
                  headingHighlight={module.headingHighlight}
                />
              );
            }
            if (module._type === "activitiesModule") {
              return (
                <ActivitiesModule
                  key={index}
                  leadArticle={module.leadArticle}
                  sidebarArticles={module.sidebarArticles}
                  headingText={module.headingText}
                  headingHighlight={module.headingHighlight}
                />
              );
            }
            return null;
          })}
        </div>
      </main>
    </div>
  );
}
