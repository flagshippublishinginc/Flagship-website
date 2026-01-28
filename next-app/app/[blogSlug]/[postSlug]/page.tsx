import { getSanityData } from "@/lib/helpingFunctions";

type Params = {
    blogSlug: string;
    postSlug: string;
};

export default async function PostPage({ params }: { params: Params }) {
    const { blogSlug, postSlug } = await params;

    // Fetch post where type is post, slug matches, AND it belongs to a blogListingPage with the matching blogSlug
    const postQuery = `*[_type == "post" && slug.current == "${postSlug}" && selectBlog->slug.current == "${blogSlug}"][0]{
    _id,
    title,
    description,
    content,
    coverImage,
    _createdAt,
    author->{name},
    seo{metaTitle, metaDescription}
  }`;

    const postData = await getSanityData(postQuery);

    if (!postData) {
        return (
            <div className="container section-spacing text-center">
                <h1>Post Not Found</h1>
                <p>The post you are looking for does not exist or has been moved.</p>
            </div>
        );
    }

    return (
        <main className="container section-spacing">
            <div className="max-w-4xl mx-auto">
                <header className="mb-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-heading mb-4">{postData.title}</h1>
                    <div className="flex items-center justify-center gap-4 text-secondary">
                        {postData.author && <span>By {postData.author.name}</span>}
                        {postData._createdAt && (
                            <span>{new Date(postData._createdAt).toLocaleDateString()}</span>
                        )}
                    </div>
                </header>

                {postData.description && (
                    <p className="text-xl text-secondary mb-8 leading-relaxed italic border-l-4 border-tertiary pl-4">
                        {postData.description}
                    </p>
                )}

                {/* Content rendering would go here */}
                <div className="prose prose-lg max-w-none">
                    <p>
                        This post belongs to the <strong>{blogSlug}</strong> blog.
                    </p>
                    <p>
                        Detailed content rendering using PortableText should be implemented here.
                    </p>
                </div>
            </div>
        </main>
    );
}
