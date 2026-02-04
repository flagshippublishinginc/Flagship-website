import { ModuleRenderer } from "@/components";
import { getSanityData } from "@/lib/helpingFunctions";

export default async function Home() {
  const query = `*[_type == "homePage"][0] {
    modules[]{
      ...,
      _key
    }
  }`;

  const allData: any = await getSanityData(query);
  // console.log("AllData", allData);
  return (
    <div className="md:min-h-screen pb-10 lg:pb-20">
      <main>
        <ModuleRenderer modules={allData.modules} />
      </main>
    </div>
  );
}
