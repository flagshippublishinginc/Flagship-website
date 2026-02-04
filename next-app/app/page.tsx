import { ModuleRenderer } from "@/components";
import { getSanityData } from "@/lib/helpingFunctions";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

const headerList = await headers();
const host = headerList.get("host");

export default async function Home() {
  const query = `*[_type == "homePage" && references(*[_type == "site" && domain == "http://${host}"]._id)][0] {
    modules[]{
      ...,
      _key
    }
  }`;

  const allData: any = await getSanityData(query);
  if (!allData) {
    return notFound();
  }
  return (
    <div className="md:min-h-screen pb-10 lg:pb-20">
      <main>
        <ModuleRenderer modules={allData?.modules} />
      </main>
    </div>
  );
}
