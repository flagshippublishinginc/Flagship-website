# Multi-Blog URL Restructuring Plan

Restructure the routing and CMS schemas so that each blog uses the cleaner URL pattern `domain/blog-name/post-name` instead of the current `domain/blog/blog-name/post-name`.

## User Review Required

> [!IMPORTANT]
> This change moves the blog landing page to the root level (`domain/blog-name`). If you have other pages with slugs that might conflict with blog names (e.g., a page named `contact`), they will need to be handled carefully. Currently, the project appears to only use the root level for the homepage and these dynamic blogs.

> [!NOTE]
> We will also implement the individual post page which was previously missing or not fully integrated.

## Proposed Changes

### Next.js Routing
---
#### [MOVE] [blogName] -> [blogSlug](file:///c:/Users/user/OneDrive/Desktop/Flagship_publication/next-app/app/[blogSlug])
Move the existing blog listing page from `app/blog/[blogName]` to `app/[blogSlug]` to remove the `/blog/` prefix from the URL.

#### [NEW] [postSlug]/page.tsx(file:///c:/Users/user/OneDrive/Desktop/Flagship_publication/next-app/app/[blogSlug]/[postSlug]/page.tsx)
Create a new page component to handle individual blog posts.

#### [MODIFY] [PostListing.tsx](file:///c:/Users/user/OneDrive/Desktop/Flagship_publication/next-app/components/blog/PostListing.tsx)
Update the component to:
- Accept `blogSlug` as a prop.
- Wrap post titles in a `<Link>` component pointing to `/${blogSlug}/${post.slug.current}`.

### Sanity CMS Schemas
---
#### [MODIFY] [post.ts](file:///c:/Users/user/OneDrive/Desktop/Flagship_publication/sanity/schemaTypes/documents/post.ts)
- Add validation to ensure `selectBlog` is required.
- (Optional) Enhance the preview to show the intended URL.

## Verification Plan

### Automated Tests
- I will verify the routing by checking that both `/[blogSlug]` and `/[blogSlug]/[postSlug]` correctly fetch and display data.
- I will verify that `PostListing` generates the correct URL segments.

### Manual Verification
- Navigate to a blog landing page (e.g., `/my-travel-blog`).
- Click on a post and verify it navigates to `/my-travel-blog/post-title`.
- Refresh the page to ensure dynamic routing works on deep links.
