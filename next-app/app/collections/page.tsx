import { ModuleRenderer, RichText } from "@/components";
import { getSanityData } from "@/lib/helpingFunctions";
import { stegaClean } from "next-sanity";

export async function generateMetadata() {
  const pageQuery = `*[_type == "collections"][0]{seo}`;
  const pageData: any = await getSanityData(pageQuery);

  return {
    title: pageData?.seo?.metaTitle,
    description: pageData?.seo?.metaDescription,
    openGraph: {
      title: pageData?.seo?.metaTitle,
      description: pageData?.seo?.metaDescription,
    },
    twitter: {
      title: pageData?.seo?.metaTitle,
      description: pageData?.seo?.metaDescription,
    },
  };
}

export default async function Collections() {
  const query = `*[_type == "collections"][0] {
  title,
  titleHighlight,
  description,
  contentAlignment,
    modules[]{
      ...,
      _key
    }
  }`;

  const collectionData: any = await getSanityData(query);

  console.log("AllData", collectionData);
  return (
    <div className="md:min-h-screen pb-10 lg:pb-20">
      <div
        className={`section-spacing ${stegaClean(collectionData.contentAlignment) === "center" ? "text-center" : stegaClean(collectionData.contentAlignment) === "right" ? "text-right" : "text-left"}`}>
        <div className="container">
          <div className="w-full max-w-[950px] mx-auto">
            <h1 className="text-4xl font-bold">
              {stegaClean(collectionData.title)}{" "}
              {collectionData.titleHighlight && (
                <span className="text-tertiary">
                  {stegaClean(collectionData.titleHighlight)}
                </span>
              )}
            </h1>
            {collectionData.description && (
              <div className="mt-4">
                <RichText content={collectionData.description.content} />
              </div>
            )}
          </div>
        </div>
      </div>
      <main>
        <ModuleRenderer modules={collectionData.modules} />
      </main>
    </div>
  );
}
