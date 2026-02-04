import { ModuleRenderer } from "@/components";
import { getSanityData } from "@/lib/helpingFunctions";
import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

type Params = {
  page: string;
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { page } = await params;
  const headerList = await headers();
  const host = headerList.get("host");
  const pageQuery = `*[_type == "page" && slug.current == "${page}" && references(*[_type == "site" && domain == "http://${host}"]._id)][0]{seo{metaTitle, metaDescription}}`;
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

const page = async ({ params }: { params: Params }) => {
  const { page } = await params;
  const headerList = await headers();
  const host = headerList.get("host");
  const pageQuery = `*[_type == "page" && slug.current == "${page}" && references(*[_type == "site" && domain == "http://${host}"]._id)][0]{modules[]}`;
  const pageData: any = await getSanityData(pageQuery);

  if (!pageData) {
    return notFound();
  }

  return (
    <main>
      <ModuleRenderer modules={pageData?.modules} />
    </main>
  );
};

export default page;
