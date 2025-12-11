import { HomeBanner } from "@/components";
import RichText from "@/components/RichText";
import { client } from "@/lib/sanity";
// async function getData() {
//   const query = `*[_type == "homePage"][0]{ "homeBanner": modules[_type == "homeBannerModule"][0]{ _key, _type, title, description, authorPrefix, author, buttonLabel, buttonLink, image, } }`;
//   const data: any = await client.fetch(query);
//   return data;
// }

async function getDataAllData() {
  const query = `*[_type == "homePage"][0] { modules }`;
  const data: any = await client.fetch(query);
  return data;
}

export default async function Home() {
  const allData: any = await getDataAllData();
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
          })}
        </div>
      </main>
    </div>
  );
}
