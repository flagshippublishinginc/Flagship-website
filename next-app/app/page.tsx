import {
  HomeBanner,
  RichText,
  ReaderFavourites,
  ActivitiesModule,
  Subscribe,
  RealEstate,
  TravelGuides,
  Gallery,
  TwoColumnImageContent,
  CurrentIssue,
} from "@/components";
import { getSanityData } from "@/lib/helpingFunctions";

export default async function Home() {
  const query = `*[_type == "homePage"][0] {
    modules[]{
      ...,
      _key
    }
  }`;

  const allData: any = await getSanityData(query);
  console.log("AllData", allData);
  return (
    <div className="md:min-h-screen pb-10 lg:pb-20">
      <main>
        <div>
          {allData.modules.map((module: any, index: number) => {
            switch (module._type) {
              case "homeBannerModule":
                return <HomeBanner key={index} modules={module} />;
              case "richTextModule":
                return <RichText key={index} richText={module} />;
              case "readerFavourites":
                return <ReaderFavourites key={index} {...module} />;
              case "activitiesModule":
                return <ActivitiesModule key={index} {...module} />;
              case "categoryHighlightModule":
                return <TravelGuides key={index} {...module} />;
              case "subscriptionBannerModule":
                return <Subscribe key={index} {...module} />;
              case "realEstateModule":
                return <RealEstate key={index} {...module} />;
              case "classicsModule":
                return <TwoColumnImageContent key={index} {...module} />;
              case "galleryModule":
                return <Gallery key={index} {...module} />;
              case "currentIssueModule":
                return <CurrentIssue key={index} {...module} />;
              default:
                break;
            }
          })}
        </div>
      </main>
    </div>
  );
}
