import { HomeBanner } from "@/components";
import { client } from "@/lib/sanity";
import { HeroBannerProps } from "@/lib/types";

async function getData() {
  const query = `*[_type == "homePage"] { _id, modules, seo, title }`;
  const data: any = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: HeroBannerProps[] = await getData();
  const refineData = data[0];
  console.log("Banner data ", refineData);
  return (
    <div className="md:min-h-screen">
      <main>
        <HomeBanner {...refineData} />
      </main>
    </div>
  );
}
