import {
  HomeBanner,
  RichText,
  ReaderFavourites,
  ActivitiesModule,
  Subscribe,
  ImageSlider,
  TravelGuides,
  Gallery,
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
  console.log("allData ", allData);
  return (
    <div className="md:min-h-screen">
      <main>
        <div className="grid grid-cols-1 ">
          {allData.modules.map((module: any, index: number) => {
            switch (module._type) {
              case "homeBannerModule":
                return <HomeBanner key={index} modules={module} />;
              case "richTextModule":
                return <RichText key={index} richText={module} />;
              case "readerFavouritesModule":
                return <ReaderFavourites key={index} {...module} />;
              case "activitiesModule":
                return <ActivitiesModule key={index} {...module} />;
              case "categoryHighlightModule":
                return <TravelGuides key={index} {...module} />;
              default:
                break;
            }
          })}
          <Subscribe />
          <ImageSlider />
          <Gallery />
        </div>
      </main>
    </div>
  );
}
